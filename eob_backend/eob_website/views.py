from django.shortcuts import render
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegisterSerializer
from rest_framework import generics

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


class TestView (generics.ListAPIView):
  queryset = CustomUser.objects.all()
  serializer_class = UserRegisterSerializer