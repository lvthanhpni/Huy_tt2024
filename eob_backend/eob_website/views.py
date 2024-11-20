from django.shortcuts import render
from .models import FilePreviewImage, Folder, Occupation, Material,  OrganizationUser, CustomUser, IndividualUser
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import FolderViewSerializer, FolderCreateSerializer, MaterialUploadViewSerializer, OccupationCreateViewSerializer, UserLoginSerializer, UserRegisterSerializer, OrganizationUserSerializer, IndividualUserSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.middleware.csrf import get_token
import requests

# Authentication API
class LoginView(APIView):
  def post(self, request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
      user = serializer.validated_data
      refresh = RefreshToken.for_user(user)
      return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
      }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class get_csrf_token(APIView):
  def get(self, request):
    return Response({'csrftoken': get_token(request)})
  
class GoogleLoginView(APIView):
  def post(self, request):
    access_token = request.data.get('access_token')
    if not access_token:
      return Response({'error': 'Access token is required'}, status=status.HTTP_400_BAD_REQUEST)
    google_information = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={access_token}")
    if google_information.status_code != 200:
      return Response({'error': 'Invalid access token'}, status=status.HTTP_400_BAD_REQUEST)
    
    user_info = google_information.json()
    email = user_info.get('email')
    name = user_info.get('name')

    if not email:
      return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user, created = CustomUser.objects.get_or_create(email=email, defaults={'phone_number': '0000000000'})
    if created:
      IndividualUser.objects.create(user=user, name=name)

    refresh = RefreshToken.for_user(user)
    return Response({
      "access": str(refresh.access_token),
      "refresh": str(refresh),
    })

class RegisterView(generics.CreateAPIView):
  queryset = CustomUser.objects.all()
  serializer_class = UserRegisterSerializer

  def perform_create(self, serializer):
    print(serializer)
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    self.token_data = {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
    }
  
  def create(self, request, *args, **kwargs):
    response = super().create(request, *args, **kwargs)
    response.data.update(self.token_data)
    return response

#Folder API
class FolderViewSet(generics.ListCreateAPIView):
  queryset = Folder.objects.all()

  def get_serializer_class(self):
    if self.request.method == 'POST':
      return FolderCreateSerializer 
    return FolderViewSerializer

class FolderRetrieveView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Folder.objects.all()
  serializer_class = FolderViewSerializer

  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)

# User API
class UserRetrieveUpdateView(generics.RetrieveUpdateAPIView):
  permission_classes = [IsAuthenticated]

  def get_object(self):
    if hasattr(self.request.user, 'individualuser'):
      return self.request.user.individualuser
    elif hasattr(self.request.user, 'organizationuser'):
      return self.request.user.organizationuser
    return None

  def get_serializer_class(self):
    if hasattr(self.request.user, 'individualuser'):
      return IndividualUserSerializer
    elif hasattr(self.request.user, 'organizationuser'):
      return OrganizationUserSerializer
    return None
  
  def get(self, request):
    if hasattr(request.user, 'individualuser'):
      serializer = IndividualUserSerializer(request.user.individualuser)
      return Response(serializer.data)
    elif hasattr(request.user, 'organizationuser'):
      serializer = OrganizationUserSerializer(request.user.organizationuser)
      return Response(serializer.data)
    else:
      return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
  
  def patch(self, request):
        # Cập nhật phần thông tin người dùng
        user = request.user
        partial = True 

        if hasattr(user, 'individualuser'):
            serializer = IndividualUserSerializer(user.individualuser, data=request.data, partial=partial)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        elif hasattr(user, 'organizationuser'):
            serializer = OrganizationUserSerializer(user.organizationuser, data=request.data, partial=partial)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def put(self, request):
    user = request.user
    if hasattr(user, 'individualuser'):
      serializer = IndividualUserSerializer(user.individualuser, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    elif hasattr(user, 'organizationuser'):
      serializer = OrganizationUserSerializer(user.organizationuser, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OccupationListCreateView(generics.ListCreateAPIView):
  queryset = Occupation.objects.all()
  serializer_class = OccupationCreateViewSerializer

class MaterialListCreateView(generics.ListCreateAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialUploadViewSerializer
    permission_classes = [IsAuthenticated]