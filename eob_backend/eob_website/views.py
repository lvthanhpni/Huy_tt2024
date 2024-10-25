from django.shortcuts import render
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserLoginSerializer, UserRegisterSerializer, UserSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.middleware.csrf import get_token
import requests

# Create your views here.
class RegisterView(generics.CreateAPIView):
  queryset = CustomUser.objects.all()
  serializer_class = UserRegisterSerializer

  def perform_create(self, serializer):
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
    
class UserProfileView(APIView):
  permission_classes = [IsAuthenticated]
  def get(self, request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

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
    email_verified = user_info.get('email_verified')

    if not email:
      return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user, created = CustomUser.objects.get_or_create(email=email, defaults={'phone_number': '0000000000', email: email, email_verified: email_verified})

    refresh = RefreshToken.for_user(user)
    return Response({
      "access": str(refresh.access_token),
      "refresh": str(refresh),
    })