from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class CustomUserManager(BaseUserManager):
  def create_user(self, email, password=None, avatar=None, name=None, occupation=None, user_rank=None, **extra_fields):
    if not email:
      raise ValueError('Email is required')
    email = self.normalize_email(email)
    user = self.model(email = email,name = name, occupation = occupation, user_rank = user_rank, **extra_fields)
    user.set_password(password)
    user.is_admin = False
    user.is_staff = True
    user.save(using=self._db)
    return user

  def create_superuser(self, email, name, password=None, **extra_fields):
    if name is None:
      raise ValueError('Name is required')
    user = self.create_user(email, password, name=name, occupation='admin', user_rank=1, **extra_fields)
    user.is_admin = True
    user.is_staff = False 
    user.save(using=self._db)
    return user

  def create_individual_user(self, email, phone_number, name, password=None, **extra_fields):
      user = self.create_user(email, password, **extra_fields)
      IndividualUser.objects.create(user=user, phone_number=phone_number)
      return user

  def create_organization_user(self, email, phone_number, tax_code, password=None, **extra_fields):
      user = self.create_user(email, password, **extra_fields)
      OrganizationUser.objects.create(user=user, tax_code=tax_code, phone_number=phone_number)
      return user

class CustomUser(AbstractBaseUser):
  email = models.EmailField(max_length=255, unique=True)
  name= models.CharField(max_length=255, null=False)
  avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
  occupation = models.ForeignKey('Occupation', on_delete=models.CASCADE, null=True, blank=True)
  user_rank = models.IntegerField(default=0)
  is_admin = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)

  objects = CustomUserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name']

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
  phone_number = models.CharField(max_length=16, blank=False, null=False)
  organization = models.ForeignKey('OrganizationUser', on_delete=models.CASCADE, null=True, blank=True)
  organization_name = models.CharField(max_length=255, null=True, blank=True)

class OrganizationUser(models.Model):
  user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
  tax_code = models.CharField(max_length=16)
  phone_number = models.CharField(max_length=16)

class MaterialUser(models.Model):
  user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
  company_name = models.CharField(max_length=255)
  occupation = models.CharField(max_length=255)

class Folder(models.Model):
  name = models.CharField(max_length=255)
  parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
  is_root = models.BooleanField(default=False)
  can_upload = models.BooleanField(default=False)
  owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

  def __str__(self):
    return self.name

class Material(models.Model):
  software = models.CharField(max_length=255)
  name = models.CharField(max_length=255, default="File_upload")
  file_size = models.CharField(max_length=255)
  model_size = models.CharField(max_length=255)
  material_type = models.CharField(max_length=255)
  file_upload = models.FileField(upload_to='materials/')
  download_count = models.IntegerField(default=0)
  create_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  folder_id = models.ForeignKey('Folder', on_delete=models.CASCADE, default=1)
  description = models.TextField(null=True, blank=True)
  upload_date = models.DateTimeField(null=True, blank=True, auto_now_add=True)

class Occupation(models.Model):
  name = models.CharField(max_length=255)

  def __str__(self):
    return self.name

class ReviewPost(models.Model):
  star = models.IntegerField()
  comment = models.TextField()
  product_id = models.ForeignKey('Material', on_delete=models.CASCADE)
  post_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
  upload_date = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name
  

class FilePreviewImage(models.Model):
  image = models.ImageField(upload_to='previews/')
  material = models.ForeignKey('Material', on_delete=models.CASCADE)
