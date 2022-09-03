from django.shortcuts import render

# Create your views here.
from rest_framework import mixins, viewsets

from users.models import User
from users.serializers import UserModelSerializer, UserModelV2Serializer


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelV2Serializer
        return UserModelSerializer
