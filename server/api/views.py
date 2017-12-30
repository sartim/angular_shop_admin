# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import connection
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response

from .models import Category, Product, Order, OrderItem
from .serializers import UserSerializer, CategorySerializer, ProductSerializer, OrderSerializer, OrderItemSerializer


@api_view(['GET'])
def api_root(request, format=None):
    """
    API Root
    :param request:
    :param format:
    :return: Response
    """
    return Response({
        # 'category-list': reverse('category-list', request=request, format=format),
    })


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def register(request):
    """
    Register User
    :param request:
    :return:
    """
    if request.method == 'POST':
        user_data = {
            'username': request.data.get('email'),
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'phone': request.data.get('phone'),
            'email': request.data.get('email'),
            'password': request.data.get('password'),
            'confirm_password': request.data.get('confirm_password'),
        }

        serializer = UserSerializer(data=user_data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def fetch_user(request):
    if request.method == 'GET':
        data = {
            'user_id': request.user.id,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'email': request.user.username,
            'is_active': request.user.is_active
        }
    return Response(data)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    Categories
    """
    serializer_class = CategorySerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Category.objects.all()
        return queryset


class ProductViewSet(viewsets.ModelViewSet):
    """
    Products
    """
    serializer_class = ProductSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Product.objects.all()
        return queryset


class OrderViewSet(viewsets.ModelViewSet):
    """
    Orders
    """
    serializer_class = OrderSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Order.objects.all()
        return queryset


class OrderItemViewSet(viewsets.ModelViewSet):
    """
    Orders Items
    """
    serializer_class = OrderItemSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = OrderItem.objects.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrdersTodayViewSet(viewsets.ModelViewSet):
    """
    Count all orders for the day
    """
    serializer_class = OrderSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        today = timezone.datetime.today()  # Get current day

        queryset = Order.objects.filter(
            created__year=today.year,
            created__month=today.month,
            created__day=today.day)
        return queryset


class OrdersThisMonthViewSet(viewsets.ModelViewSet):
    """
    Count all orders for the month
    """
    serializer_class = OrderSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        today = timezone.datetime.today()  # Get current day

        queryset = Order.objects.filter(
            created__year=today.year,
            created__month=today.month)
        return queryset


@api_view(['GET'])
def orders_last_month(request):
    if request.method == 'GET':
        cursor = connection.cursor()
        sql = """
                        SELECT COUNT(id)
                        FROM api_order
                        WHERE created >= date_trunc('month', current_date - interval '1' month)
                        AND created < date_trunc('month', current_date)
                      """
        cursor.execute(sql)
        rows = cursor.fetchall()
        result = []
        keys = ('count',)

        for row in rows:
            result.append(dict(zip(keys, row)))

        return Response(result)


@api_view(['GET'])
def orders_plot(request):
    if request.method == 'GET':
        cursor = connection.cursor()
        orders_sql = """
                            SELECT
                            MAX(id) as id,
                            COUNT(id) AS value,
                            to_char(created, 'yyyy-mm-dd') AS date
                            FROM api_order
                            GROUP BY date ORDER BY date ASC
                         """

        cursor.execute(orders_sql)
        rows = cursor.fetchall()
        result = []
        keys = ('id', 'value', 'date')

        for row in rows:
            result.append(dict(zip(keys, row)))

        return Response(result)
