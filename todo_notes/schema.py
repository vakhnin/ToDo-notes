import graphene
from graphene_django import DjangoObjectType

from todo.models import Project
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project

    fields = '__all__'

class UserType(DjangoObjectType):
    class Meta:
        model = User

    fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
