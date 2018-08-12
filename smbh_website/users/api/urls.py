from django.urls import path, include
from blog.api.views import (
                                # Post
                                PostCreateAPIView,
                                PostDetailAPIView,
                                PostListAPIView,
                                PostRUDAPIView,
                                # Comment
                                CommentCreateAPIView,
                                CommentDetailAPIView,
                                CommentListAPIView
                            )
from users.api.views import (
                                UserCreateAPIView,
                                UserDetailAPIView,
                                UserLoginAPIView,
                                GroupListAPIView
                            )




urlpatterns = [

    # User
    path('Login', UserLoginAPIView.as_view(), name='login_api'),
    path('<slug:slug>', UserDetailAPIView.as_view(), name='detail_api'),
    path('Register', UserCreateAPIView.as_view(), name='register_api'),
    # Group
    path('Groups/', GroupListAPIView.as_view(), name='group_list_api'),
]
