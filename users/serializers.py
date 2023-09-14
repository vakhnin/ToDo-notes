from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import User


class UserModelSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)
    creator_projects = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user

    def update(self, user, validated_data):
        if 'first_name' in validated_data and validated_data['first_name']:
            user.first_name = validated_data['first_name']
        if 'last_name' in validated_data and validated_data['last_name']:
            user.last_name = validated_data['last_name']
        if 'email' in validated_data and validated_data['email']:
            user.email = validated_data['email']
        if 'password' in validated_data:
            user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'password',
                  'creator_projects')
