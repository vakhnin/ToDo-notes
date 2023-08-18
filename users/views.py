# Create your views here.
from rest_framework.viewsets import ModelViewSet

from users.models import User
from users.serializers import UserModelSerializer, UserModelV2Serializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelV2Serializer
        return UserModelSerializer
