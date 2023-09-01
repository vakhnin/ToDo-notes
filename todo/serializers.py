from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    id = serializers.ReadOnlyField()
    creator_id = serializers.ReadOnlyField()

    class Meta:
        model = Project
        exclude = ('creator',)


class ToDoModelSerializer(ModelSerializer):
    id = serializers.ReadOnlyField()
    creator = serializers.CurrentUserDefault()

    class Meta:
        model = ToDo
        fields = '__all__'
        extra_kwargs = {"creator": {"required": False, "allow_null": True}}
