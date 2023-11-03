from django.contrib import admin

from .models import Checklist, ShoppingItem, SharedChecklist, ShoppingList

admin.site.register([Checklist, ShoppingItem, SharedChecklist, ShoppingList])
