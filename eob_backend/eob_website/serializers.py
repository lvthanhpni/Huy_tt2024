from .models import FilePreviewImage, Folder, CustomUser, IndividualUser, Occupation, OrganizationUser, Material
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, write_only=True)

    tax_code = serializers.CharField(max_length=16, required=False)
    occupation = serializers.CharField(max_length=255, required=False)
    phone_number = serializers.CharField(max_length=16, required=False)
    user_rank = serializers.IntegerField(default=0, read_only=True)
    class Meta:
        model = CustomUser
        fields = ['name', 'tax_code', 'email', 'password', 'phone_number', 'occupation', 'user_rank']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        name = validated_data.pop('name', None)
        organization_name = validated_data.pop('organization_name', None)
        tax_code = validated_data.pop('tax_code', None)
        phone_number = validated_data.pop('phone_number', None)

        user_rank = 0

        company_name = validated_data.pop('company_name', None)
        occupation = validated_data.pop('occupation', None)

        password = validated_data.pop('password', None)

        user = CustomUser.objects.create_user(email=validated_data['email'], password=password, name=name, user_rank=user_rank)
        user.set_password(password)
        user.save()

        if tax_code:
            OrganizationUser.objects.create(user=user, phone_number=phone_number, organization_name=organization_name, tax_code=tax_code)
        else:
            IndividualUser.objects.create(user=user, phone_number=phone_number)
        return user
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        print(email)
        print(password)
        if email and password:
            print(email)
            print(password)
            print(authenticate(request=self.context.get('request'),email=email, password=password))
            user = authenticate(request=self.context.get('request'),email=email, password=password)
            if user is None:
                raise serializers.ValidationError('Invalid login credentials')
        else:
            raise serializers.ValidationError('Must include "email" and "password"')

        data['user'] = user
        return user

from rest_framework import serializers
from .models import IndividualUser, CustomUser

class IndividualUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    name = serializers.CharField(source='user.name')
    avatar = serializers.ImageField(source='user.avatar', required=False)
    user_rank = serializers.IntegerField(source='user.user_rank')
    occupation = serializers.PrimaryKeyRelatedField(source='user.occupation', queryset=Occupation.objects.all(), required=False)

    class Meta:
        model = IndividualUser
        fields = ['user_id','email', 'name', 'avatar', 'user_rank', 'occupation', 'organization', 'organization_name', 'phone_number']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user
        user.name = user_data.get('name', user.name)
        user.avatar = user_data.get('avatar', user.avatar)
        user_rank = user_data.get('user_rank', user.user_rank)
        user.user_rank = user_rank
        user.occupation = user_data.get('occupation', user.occupation)
        user.save()
        
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.organization = validated_data.get('organization', instance.organization)
        instance.organization_name = validated_data.get('organization_name', instance.organization_name)
        instance.save()
        
        return instance
    
class OrganizationUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    name = serializers.CharField(source='user.name')
    avatar = serializers.ImageField(source='user.avatar', required=False)
    occupation = serializers.PrimaryKeyRelatedField(source='user.occupation', queryset=Occupation.objects.all(), required=False)

    class Meta:
        model = OrganizationUser
        fields = ['email', 'name', 'avatar', 'user_rank', 'occupation', 'tax_code', 'phone_number']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user
        user.name = user_data.get('name', user.name)
        user_rank = user_data.get('user_rank', user.user_rank)
        user.avatar = user_data.get('avatar', user.avatar)
        user.occupation = user_data.get('occupation', user.occupation)
        user.save()

        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.tax_code = validated_data.get('tax_code', instance.tax_code)
        instance.save()
        
        return instance

class FolderViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ['id','name', 'parent', 'children', 'is_root', 'can_upload', 'owner']
    
    def get_children(self, obj):
        return FolderViewSerializer(obj.children.all(), many=True).data
    
    def perform_destroy(self, instance):
        instance.delete()

class FolderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ['name', 'parent', 'is_root', 'can_upload', 'owner']

    def create(self, validated_data):
        name = validated_data.pop('name', None)
        parrent = validated_data.pop('parent', None)
        is_root = validated_data.pop('is_root', None)
        can_upload = validated_data.pop('can_upload', None)
        owner = self.context['request'].user
        return Folder.objects.create(name=name, parent=parrent, is_root=is_root, can_upload=can_upload, owner=owner)
    

class OccupationCreateViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupation
        fields = ['id','name']

class FilePreviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'image', 'material']
class MaterialUploadViewSerializer(serializers.ModelSerializer):
    preview_images = serializers.ListField(child=serializers.ImageField(), write_only=True)
    class Meta:
        model = Material
        fields = ['name', 'file_upload', 'preview_images', 'folder_id', 'description', 'material_type', 'software']

    def create(self, validated_data):
        name = validated_data.pop('name', None)
        file_upload = validated_data.pop('file_upload', None)
        folder_id = validated_data.pop('folder_id', None)
        description = validated_data.pop('description', None)
        preview_images = validated_data.pop('preview_images', [])
        material_type = validated_data.pop('material_type', None)
        software = validated_data.pop('software', None)
        create_user = self.context['request'].user

        if folder_id is not None:
            try:
                folder_id = Folder.objects.get(id=folder_id.id)  # Thay thế 'Folder' bằng tên model thư mục của bạn nếu khác
            except Folder.DoesNotExist:
                raise serializers.ValidationError("Folder not found.")
        else:
            folder_id = None

        material = Material.objects.create(
            name = name,
            file_upload=file_upload,
            folder_id=folder_id,
            description=description,
            material_type=material_type,
            software=software,
            create_user=create_user
        )
        for image in preview_images:
            FilePreviewImage.objects.create(image=image, material=material)
        return material

