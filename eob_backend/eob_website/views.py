from django.shortcuts import render
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserLoginSerializer, UserRegisterSerializer, UserSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

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