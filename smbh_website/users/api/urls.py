from django.urls import path, include
from users.api.views import (
                                UserCreateAPIView,
                                UserDetailAPIView,
                                UserLoginAPIView,
                                GroupListAPIView
                            )




urlpatterns = [

    # User
    path('Login', UserLoginAPIView.as_view(), name='login_api'),
    path('Register', UserCreateAPIView.as_view(), name='register_api'),
    # Group
    path('Groups/', GroupListAPIView.as_view(), name='group_list_api'),

    # User
    path('<slug>', UserDetailAPIView.as_view(), name='detail_api'),
]
