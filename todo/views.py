from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from todo.models import Project, ToDo
from todo.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.order_by('-pk')
    serializer_class = ProjectModelSerializer

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


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.order_by('-pk')
    serializer_class = ToDoModelSerializer

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
