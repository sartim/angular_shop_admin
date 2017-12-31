from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from rest_framework_swagger.views import get_swagger_view
from .views import api_root, register, fetch_user, CategoryViewSet, ProductViewSet, OrderViewSet, OrderItemViewSet, \
    OrdersTodayViewSet, OrdersThisMonthViewSet, orders_last_month, orders_plot

schema_view = get_swagger_view(title='API DOC')

category_list = CategoryViewSet.as_view({'get': 'list', 'post': 'create'})
category_detail = CategoryViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})

product_list = ProductViewSet.as_view({'get': 'list', 'post': 'create'})
product_detail = ProductViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})

order_list = OrderViewSet.as_view({'get': 'list', 'post': 'create'})
order_detail = OrderViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'})

order_item_list = OrderItemViewSet.as_view({'get': 'list', 'post': 'create'})
order_item_detail = OrderItemViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'})

today_orders = OrdersTodayViewSet.as_view({'get': 'list'})

this_month_orders = OrdersThisMonthViewSet.as_view({'get': 'list'})

urlpatterns = [
    # url(r'', api_root),
    url(r'^$', schema_view),
    url(r'^api/v1/auth/token-auth/', obtain_jwt_token),
    url(r'^api/v1/auth/token-refresh/', refresh_jwt_token),
    url(r'^api/v1/auth/token-verify/', verify_jwt_token),
    url(r'^api/v1/auth/register/', register),
    url(r'^api/v1/auth/user/$', fetch_user, name='fetch-user'),
    url(r'^api/v1/category/$', category_list, name="category-list"),
    url(r'^api/v1/category/(?P<pk>[0-9]+)/$', category_detail, name="category-detail"),
    url(r'^api/v1/product/$', product_list, name="product-list"),
    url(r'^api/v1/product/(?P<pk>[0-9]+)/$', product_detail, name="product-detail"),
    url(r'^api/v1/order/$', order_list, name="order-list"),
    url(r'^api/v1/order/(?P<pk>[0-9]+)/$', order_detail, name="order-detail"),
    url(r'^api/v1/order/item/$', order_item_list, name="order-list"),
    url(r'^api/v1/order/item/(?P<pk>[0-9]+)/$', order_item_detail, name="order-item-detail"),
    url(r'^api/v1/order/today/$', today_orders, name='orders-today'),
    url(r'^api/v1/order/this-month/$', this_month_orders, name='orders-this-month'),
    url(r'^api/v1/order/last-month/$', orders_last_month, name='orders-last-month'),
    url(r'^api/v1/order/plot/$', orders_plot, name='orders-plot'),
]
