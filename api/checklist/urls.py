from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_csrf/', views.get_csrf, name='get_csrf'), 
    path('signin/', views.sign_in, name='sign_in')]