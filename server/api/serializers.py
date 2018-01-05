from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Category, Product, Order, OrderItem


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'date_joined', 'first_name', 'last_name', 'password',
                  'confirm_password')
        read_only_fields = ('date_joined',)

    def create(self, validated_data):
        user = User.objects.filter(email=validated_data['email'])
        if user:
            raise serializers.ValidationError("The email '" +
                                              validated_data['email'] +
                                              "' already exists")
        validated_data.pop('confirm_password')
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name',
                                                 instance.first_name)
        instance.last_name = validated_data.get('last_name',
                                                instance.last_name)

        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and password == confirm_password:
            instance.set_password(password)

        instance.save()
        return instance

    def validate(self, data):
        """
        Ensure the passwords are the same
        :param data:
        :return:
        """
        if data['password']:
            if data['password'] != data['confirm_password']:
                raise serializers.ValidationError(
                    "The passwords have to be the same"
                )
        return data


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
    id = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only=True)
    order_total = serializers.CharField()
    created = serializers.CharField()
    updated = serializers.CharField()
    is_site_order = serializers.CharField()
    is_app_order = serializers.CharField()

    class Meta:
        model = Order
        fields = ('id', 'user', 'order_total', 'created', 'updated', 'is_site_order', 'is_app_order',)
        fields = '__all__'


class OrderItemSerializer(serializers.Serializer):
    order = OrderSerializer(read_only=True)
    product = ProductSerializer(read_only=True)
    price = serializers.CharField()
    quantity = serializers.CharField()

    class Meta:
        model = OrderItem
        fields = ('order', 'product', 'price', 'quantity',)
        fields = '__all__'
