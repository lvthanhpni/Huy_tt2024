from django.urls import path, include

from .views import MaterialRetrieveUpdateView, UserRetrieveUpdateView, MaterialListCreateView, FolderRetrieveView, FolderViewSet, OccupationListCreateView, RegisterView, LoginView , get_csrf_token, GoogleLoginView

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
  path('register/', RegisterView.as_view(), name='register'),
  path('login/', LoginView.as_view(), name='login'),
  path('user/', UserRetrieveUpdateView.as_view(), name='user'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('csrf_token/', get_csrf_token.as_view(), name='csrf_token'),
  path('auth/google/', GoogleLoginView.as_view(), name='google_login'),
  path('folder/', FolderViewSet.as_view(), name='folder'),
  path('folder/<int:pk>/', FolderRetrieveView.as_view(), name='folder'),
  path('occupation/', OccupationListCreateView.as_view(), name='occupation'),
  path('files/', MaterialListCreateView.as_view(), name='files'),
  path('files/<int:pk>/', MaterialRetrieveUpdateView.as_view(), name="files")
]