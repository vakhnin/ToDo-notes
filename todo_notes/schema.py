import graphene
from graphene import ObjectType
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


class ProjectCreateMutation(graphene.Mutation):
    """
    Query for test:
    mutation {
      createProject(name: "new new name", repository: "") {
        project {
          id
          name
        }
      }
    }
    """

    class Arguments:
        name = graphene.String()
        repository = graphene.String()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, repository):
        project = Project.objects.create(name=name,
                                         repository=repository)
        project.save()
        return cls(project=project)


class ProjectUpdateMutation(graphene.Mutation):
    """
    Query for test:
    mutation {
      updateProject( id: 1, name: "new name") {
        project {
          id
          name
        }
      }
    }
    """

    class Arguments:
        name = graphene.String(required=True)
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, id):
        project = Project.objects.get(pk=id)
        project.name = name
        project.save()
        return ProjectUpdateMutation(project=project)


class ProjectDeleteMutation(graphene.Mutation):
    """
    Query for test:
    mutation {
      deleteProject(id:5) {
        project {
          id
          name
        }
      }
    }
    """
    class Arguments:
        id = graphene.ID()

    project = graphene.List(ProjectType)

    @classmethod
    def mutate(cls, root, info, id):
        Project.objects.get(id=id).delete()
        return cls(project=Project.objects.all())


class Mutations(ObjectType):
    create_project = ProjectCreateMutation.Field()
    update_project = ProjectUpdateMutation.Field()
    delete_project = ProjectDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
