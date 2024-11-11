from django.urls import path, include

from .views import UserRetrieveUpdateView, CategoryRetrieveView, CategoryViewSet, OccupationListCreateView, RegisterView, LoginView , get_csrf_token, GoogleLoginView

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
  path('register/', RegisterView.as_view(), name='register'),
  path('login/', LoginView.as_view(), name='login'),
  path('user/', UserRetrieveUpdateView.as_view(), name='user'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('csrf_token/', get_csrf_token.as_view(), name='csrf_token'),
  path('auth/google/', GoogleLoginView.as_view(), name='google_login'),
  path('categories/', CategoryViewSet.as_view(), name='categories'),
  path('categories/<int:pk>/', CategoryRetrieveView.as_view(), name='category'),
  path('occupation/', OccupationListCreateView.as_view(), name='occupation'),
]