from django.urls import path, include

from .views import (BlogView, post_detail, PostCreateView, PostUpdateView, comment_thread, comment_delete)




# For Manage NameSpace
app_name = 'Blog'


urlpatterns = [

    path('', BlogView.as_view(), name='blog'),
    # Comment
    path('<int:id>', comment_thread, name='thread'),
    path('<int:id>/Delete', comment_delete, name='delete'),
    # Post
    path('<slug>', post_detail, name='post'),
    path('Create', PostCreateView.as_view(), name='post_create'),
    path('<slug>/Update', PostUpdateView.as_view(), name='post_update'),


    # DRF API
    path('API/', include('blog.api.urls')),

]
