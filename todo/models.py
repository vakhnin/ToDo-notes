from django.db import models

from users.models import User


class Project(models.Model):
    creator = models.ForeignKey(User, related_name='creator_projects',
                                on_delete=models.CASCADE)
    name = models.CharField(max_length=32, unique=True)
    repository = models.URLField(blank=True)
    users = models.ManyToManyField(User, blank=True,
                                   related_name='project_users')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=32)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User, related_name='creator_todos',
                                on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('project', 'name',)

    def __str__(self):
        return self.text
