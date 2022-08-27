from django.test import TestCase
from mixer.backend.django import mixer

from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient

from users.models import User
from .models import Project
from .views import ProjectModelViewSet


# Create your tests here.
class TestProjectViewSet(TestCase):
    def setUp(self) -> None:
        self.url = '/api/projects/'

    def test_get_project_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_project_detail(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.get(f'{self.url}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
