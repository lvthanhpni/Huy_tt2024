from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import IndexView, UserRegisterView, UserLoginView

urlpatterns = [
  path('', IndexView.as_view() , name='index'),
  path('register', UserRegisterView.as_view() , name="register"),
  path('login', UserLoginView.as_view() , name="login"),
] 


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)