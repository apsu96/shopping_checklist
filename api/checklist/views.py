from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie
import json

def index(request):
    return HttpResponse('Hello')

def sign_in(request):
    body = json.loads(request.body)
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

