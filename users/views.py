from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet

from users.models import User
from users.serializers import UserModelSerializer


# Create your views here.

class UserModelViewSet(ModelViewSet):
    queryset = User.objects.order_by('-pk')
    serializer_class = UserModelSerializer

    @action(detail=False)
    def me(self, request, *args, **kwargs):
        self.kwargs.update(pk=request.user.id)
        return self.retrieve(request, *args, **kwargs)
