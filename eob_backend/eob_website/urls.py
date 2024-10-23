from django.urls import path

from .views import RegisterView,TestView

urlpatterns = [
  path('register/', RegisterView.as_view(), name='register'),
  path('user/', TestView.as_view(), name='user')
]