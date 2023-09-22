from django.contrib import admin

from .models import Checklist, ShoppingItem

admin.site.register([Checklist, ShoppingItem])
