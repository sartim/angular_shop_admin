from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

    class Meta:
        model = Category
        fields = ('name', 'slug',)
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

    class Meta:
        model = Product
        fields = ('category', 'name', 'slug', 'image', 'description', 'price', 'stock', 'available', 'created',
                  'updated',)
        fields = '__all__'


class Order(serializers.Serializer):
    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

    class Meta:
        model = Order
        fields = ('user', 'order_total', 'created', 'updated', 'is_site_order', 'is_app_order',)
        fields = '__all__'


class OrderItem(serializers.Serializer):
    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

    class Meta:
        model = Order
        fields = ('order', 'product', 'price', 'quantity',)
        fields = '__all__'
