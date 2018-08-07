from django.urls import path, include

from .views import BlogView, PostDetailView
from blog.api.views import (PostListAPIView, PostDetailAPIView, PostUpdateAPIView, PostCreateAPIView)



# For Manage NameSpace
app_name = 'Blog'


urlpatterns = [

    # path('', BlogView.as_view(), name='blog'),
    path('', BlogView.as_view(), name='blog'),
    # DRF
    path('API', PostListAPIView.as_view(), name='blog_api'),
    path('API/<slug:slug>', PostDetailAPIView.as_view(), name='post_api'),
    path('API/Create', PostCreateAPIView.as_view(), name='post_create_api'),
    path('API/Update/<slug:slug>', PostUpdateAPIView.as_view(), name='post_update_api'),

    path('<slug:slug>', PostDetailView.as_view(), name='post'),

]
