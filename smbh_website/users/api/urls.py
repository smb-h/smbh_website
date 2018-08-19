from django.urls import path, include
from users.api.views import (
                                UserCreateAPIView,
                                UserDetailAPIView,
                                UserLoginAPIView,
                                GroupListAPIView
                            )
# JWT
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
# OAuth 2


urlpatterns = [

    # User
    path('Login', UserLoginAPIView.as_view(), name='login_api'),
    path('Register', UserCreateAPIView.as_view(), name='register_api'),
    # Group
    path('Groups/', GroupListAPIView.as_view(), name='group_list_api'),
    # JWT
    path('Token/', obtain_jwt_token),
    path('Token/Refresh', refresh_jwt_token),
    path('Token/Verify', verify_jwt_token),
    # OAuth 2
    path('OAuth/', include('oauth2_provider.urls', namespace='oauth2_provider')),

    # User
    path('<username>', UserDetailAPIView.as_view(), name='detail_api'),
]
