from rest_framework.decorators import action
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.viewsets import ModelViewSet

from users.models import User
from users.serializers import UserModelSerializer


# Create your views here.

class UserPermissions(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        elif view.action == 'create':
            return True
        return request.user

    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_staff:
            return True
        return obj == request.user


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.order_by('-pk')
    serializer_class = UserModelSerializer
    permission_classes = (UserPermissions,)

    @action(detail=False)
    def me(self, request, *args, **kwargs):
        self.kwargs.update(pk=request.user.id)
        return self.retrieve(request, *args, **kwargs)
