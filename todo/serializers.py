from rest_framework.serializers import HyperlinkedModelSerializer

from .models import Project


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
