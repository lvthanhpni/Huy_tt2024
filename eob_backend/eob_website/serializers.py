from .models import CustomUser, IndividualUser, OrganizationUser
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, write_only=True)

    name = serializers.CharField(max_length=255, required=False)
    organization_name = serializers.CharField(max_length=255, required=False)
    tax_code = serializers.CharField(max_length=16, required=False)

    class Meta:
        model = CustomUser
        fields = ['name', 'organization_name', 'tax_code', 'email', 'password', 'phone_number',]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        name = validated_data.pop('name', None)
        organization_name = validated_data.pop('organization_name', None)
        tax_code = validated_data.pop('tax_code', None)

        password = validated_data.pop('password', None)

        user = CustomUser.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()

        if name:
            IndividualUser.objects.create(user=user, name=name)
        if tax_code and organization_name:
            OrganizationUser.objects.create(user=user, organization_name=organization_name, tax_code=tax_code)

        return user
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if user is None:
                raise serializers.ValidationError('Invalid login credentials')
        else:
            raise serializers.ValidationError('Must include "email" and "password"')

        data['user'] = user
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name', 'email', 'phone_number']