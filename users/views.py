# Create your views here.
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet

from users.models import User
from users.serializers import UserModelSerializer, UserModelV2Serializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    @action(detail=False)
    def me(self, request, *args, **kwargs):
        self.kwargs.update(pk=request.user.id)
        return self.retrieve(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelV2Serializer
        return UserModelSerializer
