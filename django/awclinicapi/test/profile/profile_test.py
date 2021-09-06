# Django
from django.test import TestCase

# Python
from PIL import Image
import tempfile
import json

# Django Rest Framework
from rest_framework.test import APIClient
from rest_framework import status

# Models
from users.models import User


class UserTestCase(TestCase):
    def setUp(self):
        user = User(
            email='testing_login@cosasdedevs.com',
            first_name='Testing',
            last_name='Testing',
            username='testing_login'
        )
        user.set_password('admin123')
        user.save()

    def test_signup_user(self):
        """Check if we can create an user"""

        client = APIClient()
        response = client.post(
                'api/profile/', {
                'email': 'eugeniocar86@gmail.com',
                'password1': 'eugenio1986',
                'password2': 'eugenio1986',
                'first_name': 'Antonio',
                'last_name': 'Antonio',
                'phone': '999888777',
                'address': 'Madrid',
                'username': 'testing1'
            },
            format='multipart'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.loads(response.content), {"username":"testing1","first_name":"Testing","last_name":"Testing","email":"testing@cosasdedevs.com"})

    
    def test_login_user(self):

        client = APIClient()
        response = client.post(
                '/api/login/', {
                'email': 'rosssif3',
                'password': '242538eugenio',
            },
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        result = json.loads(response.content)
        self.assertIn('access', result)