from django.contrib.auth.models import User
from .models import Checklist, ShoppingItem, SharedChecklist
from  rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class ShoppingItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingItem
        fields = ['id', 'description', 'period', 'category', 'need_to_buy', 'bought_in_shopping_list', 'last_bought', 'checklist']

class ChecklistSerializer(serializers.ModelSerializer):
    shopping_items = serializers.SerializerMethodField()

    class Meta:
        model = Checklist
        fields = ['id', 'name', 'created_by', 'shared_with', 'last_edited_date', 'last_edited_author', 'shopping_items']

    def get_shopping_items(self, checklist):
        shopping_items = ShoppingItem.objects.filter(checklist=checklist)
        serializer = ShoppingItemSerializer(shopping_items, many=True)
        return serializer.data
    
class SharedChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedChecklist
        fields = ['checklist', 'token', 'created_at']