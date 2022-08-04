from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        if not User.objects.filter(username='geekbrains'):
            User.objects.create_superuser(username='geekbrains',
                                          first_name='geekbrains_first_name',
                                          last_name='geekbrains_last_name',
                                          email='geekbrains@geekshop.local',
                                          password='geekbrains')

        if not User.objects.filter(username='test1'):
            User.objects.create_user(username='test1',
                                     first_name='first_name1',
                                     last_name='last_name1',
                                     email='test1@geekshop.local',
                                     password='geekbrains',
                                     is_staff=True)

        if not User.objects.filter(username='test2'):
            User.objects.create_user(username='test2',
                                     first_name='first_name2',
                                     last_name='last_name2',
                                     email='test2@geekshop.local',
                                     password='geekbrains',
                                     is_staff=True)

        if not User.objects.filter(username='test3'):
            User.objects.create_user(username='test3',
                                     first_name='first_name3',
                                     last_name='last_name3',
                                     email='test3@geekshop.local',
                                     password='geekbrains',
                                     is_staff=True)
