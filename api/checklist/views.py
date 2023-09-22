from django.http import HttpResponse
from django.contrib.auth import authenticate, login
import json

def index(request):
    return HttpResponse('Hello')

def get_csrf(request):
    return HttpResponse('CSRF cookie set')

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