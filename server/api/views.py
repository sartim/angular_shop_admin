# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def api_root(request, format=None):
    """
    API Root
    :param request:
    :param format:
    :return: Response
    """
    return Response({
        # 'kfc_list': reverse('kfc-list', request=request, format=format),
        # 'kfc_search': reverse('kfc-search', request=request, format=format),
        # 'order': reverse('order', request=request, format=format),
        # 'current_user': reverse('curr-user', request=request, format=format),
        # 'active_orders': reverse('order-list', request=request, format=format),
        # 'address': reverse('address-list', request=request, format=format),
    })
