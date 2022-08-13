from django_filters import rest_framework as filters
from .models import Project, ToDo


class ProjectNameFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name',]


class TodoFilter(filters.FilterSet):
    class Meta:
        model = ToDo
        fields = ['project',]
