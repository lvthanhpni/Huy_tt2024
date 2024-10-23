from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class CustomUserManager(BaseUserManager):
  def create_user(self, email, name, phone_number, password=None, tax_code=None):
    if not email:
      raise ValueError('Email is required')
    email = self.normalize_email(email)
    user = self.model(email = email, name = name, phone_number = phone_number, tax_code = tax_code)
    user.set_password(password)
    user.is_admin = False
    user.is_staff = True
    user.save(using=self._db)
    return user

  def create_superuser(self, email, name, phone_number, password=None, tax_code=None):
    user = self.create_user(email, name, phone_number, password, tax_code)
    user.is_admin = True
    user.is_staff = False 
    user.save(using=self._db)
    return user

class CustomUser(AbstractBaseUser):
  name = models.CharField(max_length=255)
  email = models.EmailField(max_length=255, unique=True)
  tax_code = models.CharField(max_length=16, blank=True, null=True)
  phone_number = models.CharField(max_length=16)
  is_admin = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)

  objects = CustomUserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name', 'phone_number']

  def __str__(self):
    return self.email
  
  def has_perm(self, _perm, obj=None):
    return self.is_admin
  
  def has_module_perms(self, app_label):
    return True
  
  def is_staff(self):
    return self.is_admin or self.is_staff