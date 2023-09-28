from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signin/', views.sign_in, name='sign_in'),
    path('get_user/', views.get_user, name='get_user')]