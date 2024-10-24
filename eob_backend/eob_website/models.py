from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class CustomUserManager(BaseUserManager):
  def create_user(self, email, phone_number, password=None, ):
    if not email:
      raise ValueError('Email is required')
    email = self.normalize_email(email)
    user = self.model(email = email, phone_number = phone_number,)
    user.set_password(password)
    user.is_admin = False
    user.is_staff = True
    user.save(using=self._db)
    return user

  def create_superuser(self, email, phone_number, password=None ):
    user = self.create_user(email, phone_number, password)
    user.is_admin = True
    user.is_staff = False 
    user.save(using=self._db)
    return user

  def create_individual_user(self, email, phone_number, name, password=None, **extra_fields):
      user = self.create_user(email, phone_number, password, **extra_fields)
      IndividualUser.objects.create(user=user, name=name)
      return user

  def create_organization_user(self, email, phone_number, organization_name, tax_code, password=None, **extra_fields):
      user = self.create_user(email, phone_number, password, **extra_fields)
      OrganizationUser.objects.create(user=user, organization_name=organization_name, tax_code=tax_code)
      return user

class CustomUser(AbstractBaseUser):
  email = models.EmailField(max_length=255, unique=True)
  phone_number = models.CharField(max_length=16)
  is_admin = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)

  objects = CustomUserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['phone_number']

  def __str__(self):
    return self.email
  
  def has_perm(self, _perm, obj=None):
    return self.is_admin
  
  def has_module_perms(self, app_label):
    return True
  
  def is_staff(self):
    return self.is_admin or self.is_staff

class IndividualUser(models.Model):
  user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
  name = models.CharField(max_length=255)

class OrganizationUser(models.Model):
  user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
  organization_name = models.CharField(max_length=255)
  tax_code = models.CharField(max_length=16)