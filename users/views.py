from django.shortcuts import render

# Create your views here.
from rest_framework import mixins, viewsets

from users.models import User
from users.serializers import UserModelSerializer


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
