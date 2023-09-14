from django.core.management.base import BaseCommand

from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        if not User.objects.filter(username='admin'):
            User.objects.create_superuser(username='admin',
                                          first_name='Админ',
                                          last_name='Админов',
                                          email='admin@todonotes.local',
                                          password='admin',
                                          is_staff=True)

        if not User.objects.filter(username='ivanov'):
            User.objects.create_user(username='ivanov',
                                     first_name='Иван',
                                     last_name='Иванов',
                                     email='ivanov@todonotes.local',
                                     password='12345')

        if not User.objects.filter(username='petrov'):
            User.objects.create_user(username='petrov',
                                     first_name='Петр',
                                     last_name='Петров',
                                     email='petrov@todonotes.local',
                                     password='12345')
