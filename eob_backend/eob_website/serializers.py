<<<<<<< HEAD
from .models import Category, CustomUser, IndividualUser, Occupation, OrganizationUser, MaterialCategory
=======
from .models import CustomUser, IndividualUser, MaterialUser, OrganizationUser
>>>>>>> b8884514466f89ab739a87b3dcfdceeb403ce8d6
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, write_only=True)

    tax_code = serializers.CharField(max_length=16, required=False)
<<<<<<< HEAD
    occupation = serializers.CharField(max_length=255, required=False)
    phone_number = serializers.CharField(max_length=16, required=False)
    user_rank = serializers.IntegerField(default=0, read_only=True)
    class Meta:
        model = CustomUser
        fields = ['name', 'tax_code', 'email', 'password', 'phone_number', 'occupation', 'user_rank']
=======
    company_name = serializers.CharField(max_length=255, required=False)
    occupation = serializers.CharField(max_length=255, required=False)

    class Meta:
        model = CustomUser
        fields = ['name', 'organization_name', 'tax_code', 'email', 'password', 'phone_number','company_name', 'occupation']
>>>>>>> b8884514466f89ab739a87b3dcfdceeb403ce8d6
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

<<<<<<< HEAD
        if tax_code:
            OrganizationUser.objects.create(user=user, phone_number=phone_number, organization_name=organization_name, tax_code=tax_code)
        else:
            IndividualUser.objects.create(user=user, phone_number=phone_number)
=======
        if name:
            IndividualUser.objects.create(user=user, name=name)
        if tax_code and organization_name:
            OrganizationUser.objects.create(user=user, organization_name=organization_name, tax_code=tax_code)
        if company_name and occupation:
            MaterialUser.objects.create(user=user, company_name=company_name, occupation=occupation)
>>>>>>> b8884514466f89ab739a87b3dcfdceeb403ce8d6
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
        fields = ['email', 'name', 'avatar', 'user_rank', 'occupation', 'organization', 'organization_name', 'phone_number']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user
        print(user_data.get('user_rank', user.user_rank))
        user.name = user_data.get('name', user.name)
        user.avatar = user_data.get('avatar', user.avatar)
        user_rank = user_data.get('user_rank', user.user_rank)
        user.user_rank = user_rank
        user.occupation = user_data.get('occupation', user.occupation)
        user.save()
        
        # Lấy thông tin của người dùng (CustomUser) từ validated_data
        # user_data = validated_data.pop('user', {})

        # # Cập nhật thông tin của CustomUser
        # user = instance.user
        # user.name = user_data.get('name', user.name)
        # user.avatar = user_data.get('avatar', user.avatar)
        # user_rank = user_data.get('user_rank', user.user_rank)  # Cập nhật user_rank nếu có
        # user.occupation = user_data.get('occupation', user.occupation)
        # user.user_rank = user_rank  # Cập nhật user_rank cho CustomUser
        # user.save()

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

class CategoryViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name', 'parent', 'children']
    
    def get_children(self, obj):
        return CategoryViewSerializer(obj.children.all(), many=True).data

class OccupationCreateViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupation
        fields = ['id','name']


class MaterialCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialCategory
        fields = ['id','name', 'parent', 'children']

