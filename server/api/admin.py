# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .views import Category, Product, Order, OrderItem


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'name': ('name', 'slug')}
    list_display = ('name', 'slug')
    search_fields = ['name', 'slug']


admin.site.register(Category, CategoryAdmin)


class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'name': ('name', 'slug')}
    list_display = ('category', 'name', 'slug', 'image', 'description', 'price', 'stock', 'available', 'created',
                    'updated')
    search_fields = ['name', 'slug']


admin.site.register(Product, ProductAdmin)


class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'order_total', 'created', 'updated', 'is_site_order', 'is_app_order')


admin.site.register(Order, OrderAdmin)


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'price', 'quantity')


admin.site.register(OrderItem, OrderItemAdmin)
