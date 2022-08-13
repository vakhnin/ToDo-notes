from django.shortcuts import render

# Create your views here.
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from todo.filters import ProjectNameFilter
from todo.models import Project, ToDo
from todo.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectNameFilter


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
