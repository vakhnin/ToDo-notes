from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet

from todo.models import Project
from todo.serializers import ProjectModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
