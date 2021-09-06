from rest_framework import serializers
from .models import *

from django.contrib.auth.models import User

from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from datetime import datetime

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('id', 'name')

class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ('id', 'name')

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('id', 'address')

class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    address = serializers.CharField(write_only=True, required=True)
    phone = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', "last_name", "username", "email", "password1", "password2", "phone", "address")
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'password1': {'required': True},
            'password2': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        user.set_password(validated_data['password1'])
        user.save()

        pro = Profile.objects.create(user_id=user.id, address=validated_data["address"], phone=validated_data["phone"])
        pro.save()

        return user

class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='user.id')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    date_joined = serializers.DateTimeField(source='user.date_joined')
    photo = serializers.DateTimeField(default="/avatar/dummy.png")

    class Meta:
        model = Profile
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'address', 'phone', 'photo', 'date_joined')


class AppointmentsSerializer(serializers.ModelSerializer):
    date_appointment = serializers.DateTimeField(format="%d/%m/%y %H:%M:%S")
    date_created = serializers.DateTimeField(format="%d/%m/%y %H:%M:%S", required=False)

    doctor_id = serializers.CharField( required=True)
    branch_id = serializers.CharField(required=True)
    specialty_id = serializers.CharField(required=True)

    doctor_name = serializers.CharField(source='doctor.name', required=False)
    branch_address = serializers.CharField(source='branch.address', required=False)
    specialty_name = serializers.CharField(source='specialty.name', required=False)
    viewed = serializers.BooleanField( required=False)

    


    class Meta:
        model = Appointments
        fields = ('id', 'doctor_id', 'branch_id', 'specialty_id', 'doctor_name', 'branch_address', 'specialty_name', 'date_created',  'date_appointment', 'viewed')
        extra_kwargs = {
            'date_appointment': {'required': True}
        }

    def validate(self, attrs):
        try:
            d = Doctor.objects.get(id=attrs["doctor_id"])
        except Doctor.DoesNotExist:
            raise serializers.ValidationError({"doctor_id": "Doctor does not exist."})

        try:
            e = Specialty.objects.get(id=attrs["specialty_id"])
        except Specialty.DoesNotExist:
            raise serializers.ValidationError({"specialty_id": "Specialty does not exist."})

        try:
            b = Specialty.objects.get(id=attrs["branch_id"])
        except Branch.DoesNotExist:
            raise serializers.ValidationError({"branch_id": "Branch does not exist."})


        return attrs

    def create(self, validated_data):

        user = self.context.get("user")

        app = Appointments.objects.create(
            user=user,
            doctor_id=validated_data["doctor_id"],
            branch_id=validated_data["branch_id"],
            specialty_id=validated_data["specialty_id"],
            date_appointment = validated_data['date_appointment'],
            date_created = datetime.now()
        )
        
        app.save()

        return app
