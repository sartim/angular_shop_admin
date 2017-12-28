# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from server.api.models import Category
from server.api.serializers import CategorySerializer


@api_view(['GET'])
def api_root(request, format=None):
    """
    API Root
    :param request:
    :param format:
    :return: Response
    """
    return Response({
        # 'category': reverse('category', request=request, format=format),
    })


class CategoryViewSet(viewsets.ModelViewSet):
    """
    List menu items
    """
    serializer_class = CategorySerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Category.objects.all()
        return queryset
