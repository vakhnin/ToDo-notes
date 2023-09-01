from django.shortcuts import render

# Create your views here.
from rest_framework import status, filters
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from todo.filters import ProjectNameFilter, ToDoFilter
from todo.models import Project, ToDo
from todo.serializers import ProjectModelSerializer, ToDoModelSerializer
from users.models import User


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.order_by('-pk')
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectNameFilter
    filter_backends = [filters.SearchFilter]
    search_fields = ['name',]

    def perform_create(self, serializer):
        instance = serializer.save(creator=self.request.user)


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter

    def perform_create(self, serializer):
        instance = serializer.save(creator=self.request.user)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.is_active = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_200_OK)
