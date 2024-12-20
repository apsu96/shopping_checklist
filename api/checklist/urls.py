from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.sign_up, name='sign_up'),
    path('signin/', views.sign_in, name='sign_in'),
    path('logout_user/', views.logout_user, name='logout_user'),
    path('get_user/', views.get_user, name='get_user'),
    path('get_checklists/', views.get_checklists, name='get_checklists'),
    path('get_shopping_lists/', views.get_shopping_lists, name='get_shopping_lists'),
    path('create_shopping_list/', views.create_shopping_list, name='create_shopping_list'),
    path('add_shopping_item/', views.add_shopping_item, name='add_shopping_item'),
    path('change_need_to_buy/', views.change_need_to_buy, name='change_need_to_buy'),
    path('change_item_description/', views.change_item_description, name='change_item_description'),
    path('delete_item/', views.delete_item, name='delete_item'),
    path('change_bought_in_shopping_list/', views.change_bought_in_shopping_list, name='change_bought_in_shopping_list'),
    path('clear_shopping_list/', views.clear_shopping_list, name='clear_shopping_list'),
    path('generate_checklist_access/', views.generate_checklist_access, name='generate_checklist_access'),
    path('get_shared_checklist/', views.get_shared_checklist, name='get_shared_checklist')
]