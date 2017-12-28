# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Category, Product, Order, OrderItem
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, OrderItemSerializer


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
