from django.db import models
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string

def generate_random_token():
    return get_random_string(64)

class Checklist(models.Model):
    name = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='checklists')
    shared_with = models.ManyToManyField(User, related_name='shared_checklists')
    last_edited_date = models.DateTimeField(auto_now=True)
    last_edited_author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='last_edited_checklists')
    
class ShoppingItem(models.Model):
    description = models.TextField()
    period = models.IntegerField()
    category = models.TextField()
    need_to_buy = models.BooleanField()
    bought_in_shopping_list = models.BooleanField()
    last_bought = models.DateField()
    checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE, related_name='shopping_items')

class SharedChecklist(models.Model):
    checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE)
    token = models.CharField(max_length=64, default=generate_random_token, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)