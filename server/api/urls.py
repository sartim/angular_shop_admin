from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from rest_framework_swagger.views import get_swagger_view
from .views import api_root, CategoryViewSet

schema_view = get_swagger_view(title='API DOC')

category_list = CategoryViewSet.as_view({'get': 'list'})

category_detail = CategoryViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'})

urlpatterns = [
    # url(r'', api_root),
    url(r'^$', schema_view),
    url(r'^api/v1/api-token-auth/', obtain_jwt_token),
    url(r'^api/v1/api-token-refresh/', refresh_jwt_token),
    url(r'^api/v1/api-token-verify/', verify_jwt_token),
    url(r'^api/v1/category/$', category_list, name="category-list"),
    url(r'^api/v1/category/(?P<pk>[0-9]+)/$', category_detail, name="category-detail"),
]
