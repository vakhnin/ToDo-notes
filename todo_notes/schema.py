import graphene
from graphene_django import DjangoObjectType

from todo.models import Project, ToDo
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User

    fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project

    fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo

    fields = '__all__'


class Query(graphene.ObjectType):
    user_by_id_or_all = graphene.List(UserType, id=graphene.Int(required=False))
    project_by_id_or_all = graphene.List(ProjectType, id=graphene.Int(required=False))
    todo_by_id_or_all = graphene.List(ToDoType, id=graphene.Int(required=False))

    def resolve_user_by_id_or_all(root, info, id=None):
        if id:
            return User.objects.filter(id=id)
        return User.objects.all()

    def resolve_project_by_id_or_all(root, info, id=None):
        if id:
            return Project.objects.filter(id=id)
        return Project.objects.all()

    def resolve_todo_by_id_or_all(root, info, id=None):
        if id:
            return ToDo.objects.filter(id=id)
        return ToDo.objects.all()


schema = graphene.Schema(query=Query)
