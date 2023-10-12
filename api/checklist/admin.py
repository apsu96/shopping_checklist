from django.contrib import admin

from .models import Checklist, ShoppingItem, SharedChecklist

admin.site.register([Checklist, ShoppingItem, SharedChecklist])
