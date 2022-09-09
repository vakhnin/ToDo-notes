from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer

from .models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    creater = serializers.CurrentUserDefault()

    class Meta:
        model = ToDo
        fields = '__all__'
        extra_kwargs = {"creater": {"required": False, "allow_null": True}}
