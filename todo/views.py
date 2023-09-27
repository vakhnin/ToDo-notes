from rest_framework import status
from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from todo.models import Project, ToDo
from todo.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectPermissions(BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user:
            return False
        if request.user.is_staff:
            return True
        if not request.user.is_active:
            return False
        return obj.creator == request.user


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.order_by('-pk')
    serializer_class = ProjectModelSerializer
    permission_classes = (ProjectPermissions,)

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


class ToDoPermissions(BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user:
            return False
        if request.user.is_staff:
            return True
        if not request.user.is_active:
            return False
        return obj.creator == request.user or obj.project.creator == request.user


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.order_by('-pk')
    serializer_class = ToDoModelSerializer
    permission_classes = (ToDoPermissions,)

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
