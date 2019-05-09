from django.urls import path, include
from blog.api.views import (
                                # Post
                                PostCreateAPIView,
                                PostRUDAPIView,
                                PostListAPIView,
                                # Comment
                                CommentCreateAPIView,
                                CommentRUDAPIView,
                                CommentListAPIView,
                            )




urlpatterns = [

    # Post
    path('', PostListAPIView.as_view(), name='blog_api'),
    path('Post/Create', PostCreateAPIView.as_view(), name='post_create_api'),
    
    # Comment
    path('Comments', CommentListAPIView.as_view(), name='comment_list_api'),
    path('Comment/Create', CommentCreateAPIView.as_view(), name='comment_create_api'),
    path('Comment/<id>', CommentRUDAPIView.as_view(), name='thread_api'),

    # Post
    path('<slug>', PostRUDAPIView.as_view(), name='post_api'),
]
