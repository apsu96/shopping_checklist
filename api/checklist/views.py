from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
from .models import Checklist, ShoppingItem, SharedChecklist, ShoppingList
from .serializers import ChecklistSerializer, ShoppingItemSerializer, SharedChecklistSerializer, UserSerializer, ShoppingListSerializer
from rest_framework.parsers import JSONParser
from datetime import date

def index(request):
    return HttpResponse('Hello')

def sign_up(request):
    data = JSONParser().parse(request)

    if User.objects.filter(username=data.get('username')).exists():
        return HttpResponse('A user with this username already exists.', status=400)
    
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        user = User.objects.create_user(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
        checklist_data = {
            'name': 'My checklist',
            'created_by': user.id,
            'last_edited_author': user.id,
        }
        checklist_serializer = ChecklistSerializer(data=checklist_data)
        shopping_list_data = {
            'name': 'Shopping list 1',
            'created_by': user.id,
        }
        shopping_list_serializer = ShoppingListSerializer(data=shopping_list_data)
        if checklist_serializer.is_valid() & shopping_list_serializer.is_valid():
            checklist_serializer.save()
            shopping_list_serializer.save()
            login(request, user)
            return HttpResponse('Success!')
        else:
            user.delete()
            return JsonResponse(shopping_list_serializer.errors, status=400)
    else:
        return HttpResponse(serializer.errors, status=400)

def sign_in(request):
    body = JSONParser().parse(request)
    username = body.get('username')
    password = body.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponse('Success')
    else: 
        return HttpResponse('Invalid login or password', status=401)

@ensure_csrf_cookie  
def get_user(request):  
    if request.user.is_authenticated:
        username = request.user.username
        return JsonResponse({'username': username})
    else:
        return HttpResponse('Not logged in')

@login_required
def get_checklists(request):
    try:
        checklists = Checklist.objects.filter(created_by=request.user)
        serializer = ChecklistSerializer(checklists, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Checklist.DoesNotExist:
        return HttpResponse('Nothing found', status=404)
    
@login_required
def get_shopping_lists(request):
    try:
        shopping_lists = ShoppingList.objects.filter(created_by=request.user)
        serializer = ShoppingListSerializer(shopping_lists, many=True)
        return JsonResponse(serializer.data, safe=False)
    except ShoppingList.DoesNotExist:
        return HttpResponse('Nothing found', status=404)
    
@login_required
def create_shopping_list(request):
    list_count = ShoppingList.objects.filter(created_by=request.user.id).count()
    shopping_list_data = {
            'name': f'Shopping list {list_count + 1}',
            'created_by': request.user.id,
        }
    shopping_list_serializer = ShoppingListSerializer(data=shopping_list_data)
    if shopping_list_serializer.is_valid():
        shopping_list_serializer.save()
        return JsonResponse(shopping_list_serializer.data)
    else:
        return JsonResponse(shopping_list_serializer.errors, status=400)
    
@login_required
def add_shopping_item(request):
    data = JSONParser().parse(request)
    serializer = ShoppingItemSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    else:
        return JsonResponse(serializer.errors, status=400)
    
@login_required
def change_need_to_buy(request):
    try:
        data = JSONParser().parse(request)
        shopping_item = ShoppingItem.objects.get(pk=data['shopping_item_id'], checklist=data['checklist_id'])
        shopping_item.need_to_buy = data['need_to_buy']
        shopping_item.save()

        serializer = ShoppingItemSerializer(shopping_item)
        return JsonResponse(serializer.data)
    except ShoppingItem.DoesNotExist:
        return HttpResponse('Shopping item not found', status=404)

@login_required
def change_item_description(request):
    try:
        data = JSONParser().parse(request)
        shopping_item = ShoppingItem.objects.get(pk=data['shopping_item_id'], checklist=data['checklist_id'])
        shopping_item.description = data['description']
        shopping_item.save()

        serializer = ShoppingItemSerializer(shopping_item)
        return JsonResponse(serializer.data)
    except ShoppingItem.DoesNotExist:
        return HttpResponse('Shopping item not found', status=404)

@login_required
def delete_item(request):
    try:
        data = JSONParser().parse(request)
        shopping_item = ShoppingItem.objects.get(pk=data['shopping_item_id'], checklist=data['checklist_id'])
        shopping_item.delete()
        return HttpResponse('Deleted')
    except ShoppingItem.DoesNotExist:
        return HttpResponse('Shopping item not found', status=404)
    
@login_required
def change_bought_in_shopping_list(request):
    try:
        data = JSONParser().parse(request)
        shopping_item = ShoppingItem.objects.get(pk=data['shopping_item_id'], checklist=data['checklist_id'])
        shopping_item.bought_in_shopping_list = data['bought_in_shopping_list']
        if data['bought_in_shopping_list']:
            shopping_item.last_bought = date.today()
        shopping_item.save()
        serializer = ShoppingItemSerializer(shopping_item)
        return JsonResponse(serializer.data)
    except ShoppingItem.DoesNotExist:
        return HttpResponse('Shopping item not found', status=404)
    
@login_required
def clear_shopping_list(request):
    try:
        data = JSONParser().parse(request)
        shopping_items = ShoppingItem.objects.filter(checklist=data['checklist_id'])
        shopping_items.update(need_to_buy=False)
        return HttpResponse('Success')
    except ShoppingItem.DoesNotExist:
        return JsonResponse('Shopping item not found', status=404)

@login_required
def logout_user(request):
    logout(request)
    return HttpResponse('Success')

@login_required
def generate_checklist_access(request):
    try:
        data = JSONParser().parse(request)
        checklist = Checklist.objects.get(pk=data['checklist_id'], created_by=request.user)
        shared_checklist, created = SharedChecklist.objects.get_or_create(checklist=checklist)
        serializer = SharedChecklistSerializer(shared_checklist)
        return JsonResponse({'link': f"shared/{serializer.data['token']}/"})
    except Checklist.DoesNotExist:
        return HttpResponse('Checklist not found', status=404)
    
@login_required
def get_shared_checklist(request):
    try:
        data = JSONParser().parse(request)
        shared_checklist = SharedChecklist.objects.get(token=data['checklist_token'])
        serializer = ChecklistSerializer(shared_checklist.checklist)
        return JsonResponse({'checklist': serializer.data})
    except Checklist.DoesNotExist:
        return HttpResponse('Checklist not found', status=404)

    
