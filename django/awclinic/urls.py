"""awclinic URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from awclinicapi import views as api_views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('dummy-data/', api_views.DummyView.as_view(), name='create-dummy'),

    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/doctor/', api_views.DoctorList.as_view(), name='doctor-list'),
    path('api/branch/', api_views.BranchList.as_view(), name='branch-list'),
    path('api/specialty/', api_views.SpecialtyList.as_view(), name='specialty-list'),

    path('api/profile/', api_views.ProfileView.as_view(), name='user-list'),

    path('api/appointment/', api_views.AppointmentView.as_view(), name='app-list'),
    path('api/appointment/<int:id>/', api_views.AppointmentsDetailView.as_view(), name='app-detail'),
]
