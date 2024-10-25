from django.urls import path, include

from .views import RegisterView, LoginView, UserProfileView, get_csrf_token, GoogleLoginView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
  path('register/', RegisterView.as_view(), name='register'),
  path('login/', LoginView.as_view(), name='login'),
  path('user/', UserProfileView.as_view(), name='user'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('accounts/', include('allauth.urls')),
  path('csrf_token/', get_csrf_token.as_view(), name='csrf_token'),
  path('auth/google/', GoogleLoginView.as_view(), name='google_login'),
]