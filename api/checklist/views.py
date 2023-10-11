from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
from .models import Checklist, ShoppingItem
from .serializers import ChecklistSerializer, ShoppingItemSerializer
from rest_framework.parsers import JSONParser
from datetime import date

def index(request):
    return HttpResponse('Hello')

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

