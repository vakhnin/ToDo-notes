from django_filters import rest_framework as filters
from .models import Project, ToDo


class ProjectNameFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name', ]


class ToDoFilter(filters.FilterSet):
    from_created = filters.DateTimeFilter(field_name='created',
                                          lookup_expr='gte', input_formats=['%Y-%m-%d'])
    to_created = filters.DateTimeFilter(field_name='created',
                                        lookup_expr='lte', input_formats=['%Y-%m-%d'])

    class Meta:
        model = ToDo
        fields = ['project', 'from_created', 'to_created']
