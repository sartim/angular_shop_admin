from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token
from .views import api_root

urlpatterns = [
    url(r'', api_root),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^api/v1/api-token-auth/', obtain_jwt_token),
]
