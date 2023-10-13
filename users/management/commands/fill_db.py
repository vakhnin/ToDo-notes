from django.core.management.base import BaseCommand

from todo.models import Project, ToDo
from users.models import User


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            '--all',
            action='store_true',
            help='Fill DB all data',
        )

    def handle(self, *args, **options):
        if (User.objects.first()
                or Project.objects.first()
                or ToDo.objects.first()):
            return

        admin = User.objects.create_superuser(
            username='admin',
            first_name='Админ',
            last_name='Админов',
            email='admin@todonotes.local',
            password='12345',
            is_staff=True)

        if not options['all']:
            return

        ivanov = User.objects.create_user(
            username='ivanov',
            first_name='Иван',
            last_name='Иванов',
            email='ivanov@todonotes.local',
            password='12345')

        petrov = User.objects.create_user(
            username='petrov',
            first_name='Петр',
            last_name='Петров',
            email='petrov@todonotes.local',
            password='12345')

        ivanov_project = Project.objects.create(
            creator=ivanov,
            name='Проект Иванова',
        )
        ivanov_project.users.set((admin, petrov,))

        petrov_project = Project.objects.create(
            creator=petrov,
            name='Проект Петрова',
        )

        ToDo.objects.create(
            project=ivanov_project,
            creator=petrov,
            name='ToDo Петрова',
            text='ToDo созданное Петровым, в проекте Иванова'
        )

        ToDo.objects.create(
            project=petrov_project,
            creator=admin,
            name='ToDo админа',
            text='ToDo созданное админом, в проекте Петрова'
        )
