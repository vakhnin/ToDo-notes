from django.contrib import admin

# Register your models here.
from todo.models import Project

admin.site.register(Project)
