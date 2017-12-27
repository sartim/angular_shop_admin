from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'slug',)
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('category', 'name', 'slug', 'image', 'description', 'price', 'stock', 'available', 'created',
                  'updated',)
        fields = '__all__'

class Order(serializers.Serializer):
    class Meta:
        model = Order
        fields = ()