from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        if not User.objects.filter(username='geekbrains'):
            User.objects.create_superuser(username='geekbrains',
                                          email='geekbrains@geekshop.local',
                                          password='geekbrains')
