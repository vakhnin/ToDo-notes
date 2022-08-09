from django.db import models

# Create your models here.
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=32, unique=True)
    repository = models.URLField(blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name
