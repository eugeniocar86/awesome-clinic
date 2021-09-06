from django.shortcuts import render

from .models import *
from .serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.permissions import AllowAny

from rest_framework import status
from django.http import Http404

class DummyView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request, format=None):
        Doctor.objects.create(name="Joaquin Romero").save()
        Doctor.objects.create(name="Roberto Fonseca").save()
        Doctor.objects.create(name="Rossana Sifontes").save()
        Doctor.objects.create(name="Maricela Rodriguez").save()
        Doctor.objects.create(name="Roger Perdomo").save()

        Branch.objects.create(address="Vitacura").save()
        Branch.objects.create(address="Las Condes").save()
        Branch.objects.create(address="Alameda").save()
        Branch.objects.create(address="Maipu").save()
        Branch.objects.create(address="Cajon del maipo").save()

        Specialty.objects.create(name="Obstetricia").save()
        Specialty.objects.create(name="Odontologia").save()
        Specialty.objects.create(name="Gastroenterologia").save()
        Specialty.objects.create(name="Medicina Interna").save()
        Specialty.objects.create(name="Oncologia").save()

        return Response(status=status.HTTP_201_CREATED)

class ProfileView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


class DoctorList(APIView):
    """
    View all doctors.
    """
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        """
        Return a list of all doctors.
        """
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)


class BranchList(APIView):
    """
    View all specialties.
    """
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        """
        Return a list of all specialties.
        """
        branches = Branch.objects.all()
        serializer = BranchSerializer(branches, many=True)
        return Response(serializer.data)


class SpecialtyList(APIView):
    """
    View all branches.
    """
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        """
        Return a list of all branches.
        """
        specialty = Specialty.objects.all()
        serializer = SpecialtySerializer(specialty, many=True)
        return Response(serializer.data)

class AppointmentView(APIView):
    def post(self, request, format=None):
        serializer = AppointmentsSerializer(context = {'user':request.user}, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        app = Appointments.objects.filter(user_id=request.user.id).order_by("-id")
        serializer = AppointmentsSerializer(app, many=True)
        return Response(serializer.data)

class AppointmentsDetailView(APIView):
    def get_object(self, id, user_id):
        try:
            return Appointments.objects.get(pk=id, user_id=user_id)
        except Appointments.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        app = self.get_object(id, request.user.id)
        serializer = AppointmentsSerializer(app)
        return Response(serializer.data)

    def delete(self, request, id, format=None):
        app = self.get_object(id, request.user.id)
        app.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, id, format=None):
        app = Appointments.objects.filter(id=id, user_id=request.user.id).update(viewed=True)

        app = self.get_object(id, request.user.id)
        serializer = AppointmentsSerializer(app)

        return Response(serializer.data)

    


