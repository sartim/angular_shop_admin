from rest_framework import serializers
from .models import Category, Product, Order, OrderItem


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('name', 'slug',)
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    # def create(self, validated_data):
    #     pass
    #
    # def update(self, instance, validated_data):
    #     pass

    class Meta:
        model = Product
        fields = ('category', 'name', 'slug', 'image', 'description', 'price', 'stock', 'available', 'created',
                  'updated',)
        fields = '__all__'


class OrderSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    order_total = serializers.CharField()
    created = serializers.CharField()
    updated = serializers.CharField()
    is_site_order = serializers.CharField()
    is_app_order = serializers.CharField()

    class Meta:
        model = Order
        fields = ('user', 'order_total', 'created', 'updated', 'is_site_order', 'is_app_order',)
        fields = '__all__'


class OrderItemSerializer(serializers.Serializer):
    order = serializers.PrimaryKeyRelatedField(read_only=True)
    product = serializers.PrimaryKeyRelatedField(read_only=True)
    price = serializers.CharField()
    quantity = serializers.CharField()

    class Meta:
        model = OrderItem
        fields = ('order', 'product', 'price', 'quantity',)
        fields = '__all__'
