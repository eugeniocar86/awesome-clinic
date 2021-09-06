from django.db import models

from django.contrib.auth.models import User

from datetime import date


class Profile(models.Model):
    phone = models.CharField(max_length=500, default=None, null=True)
    address = models.CharField(max_length=500, default=None, null=True)
    user =  models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name

class Doctor(models.Model):
    name = models.CharField(max_length=500, default=None, null=True)

    def __str__(self):
        return self.name

class Specialty(models.Model):
    name = models.CharField(max_length=500, default=None, null=True)

    def __str__(self):
        return self.name


class Branch(models.Model):
    address = models.CharField(max_length=500, default=None, null=True)

    def __str__(self):
        return self.address


class Appointments(models.Model):
    user = models.ForeignKey(User, null=True, default=None, related_name='user_appointment', on_delete=models.CASCADE)
    date_created = models.DateTimeField(blank=True, null=True)
    date_appointment = models.DateTimeField(default=date.today)
    viewed=models.BooleanField(default=False)
    branch = models.ForeignKey(Branch, null=True, default=None, related_name='branch_appointment', on_delete=models.CASCADE)
    specialty = models.ForeignKey(Specialty, null=True, default=None, related_name='specialty_appointment', on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, null=True, default=None, related_name='doctor_appointment', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name