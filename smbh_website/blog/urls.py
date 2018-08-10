from django.urls import path, include

from .views import (BlogView, PostDetailView, comment_thread, comment_delete)
from blog.api.views import (
                                # Post
                                PostListAPIView,
                                PostDetailAPIView,
                                PostRUDAPIView,
                                PostCreateAPIView,
                                # Comment
                                CommentCreateAPIView,
                                CommentDetailAPIView,
                                CommentListAPIView
                            )



# For Manage NameSpace
app_name = 'Blog'


urlpatterns = [

    # path('', BlogView.as_view(), name='blog'),
    path('', BlogView.as_view(), name='blog'),
    path('<slug:slug>', PostDetailView.as_view(), name='post'),
    path('<slug:content_object>', comment_thread, name='thread'),
    path('<slug:content_object>/Delete', comment_delete, name='delete'),
    # DRF
    # Post
    path('API', PostListAPIView.as_view(), name='blog_api'),
    path('API/<slug:slug>', PostDetailAPIView.as_view(), name='post_api'),
    path('API/Create', PostCreateAPIView.as_view(), name='post_create_api'),
    path('API/<slug:slug>/Update', PostRUDAPIView.as_view(), name='post_update_api'),
    # Comment
    path('API/Comments', CommentListAPIView.as_view(), name='comment_list_api'),
    path('API/Comment/Create', CommentCreateAPIView.as_view(), name='comment_create_api'),
    path('API/Comment/<slug:content_object>', CommentDetailAPIView.as_view(), name='thread_api')

]
