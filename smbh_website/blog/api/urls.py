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




urlpatterns = [

    # Post
    path('', PostListAPIView.as_view(), name='blog_api'),
    path('<slug:slug>', PostDetailAPIView.as_view(), name='post_api'),
    path('Post/Create', PostCreateAPIView.as_view(), name='post_create_api'),
    path('<slug:slug>/Update', PostRUDAPIView.as_view(), name='post_update_api'),
    # Comment
    path('Comments', CommentListAPIView.as_view(), name='comment_list_api'),
    path('Comment/Create', CommentCreateAPIView.as_view(), name='comment_create_api'),
    path('Comment/<slug:content_object>', CommentDetailAPIView.as_view(), name='thread_api')


]
