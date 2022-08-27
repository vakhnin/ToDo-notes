from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient

from .models import Project
from .views import ProjectModelViewSet


# Create your tests here.
class TestProjectViewSet(TestCase):
    def test_get_project_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_get_detail(self):
    #     project = Project.objects.create(name='Пушкин', birthday_year=1799)
    #     client = APIClient()
    #     response = client.get(f'/api/projects/{project.id}/')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

