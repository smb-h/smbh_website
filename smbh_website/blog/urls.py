from django.urls import path, include

from .views import (BlogView, PostDetailView, comment_thread, comment_delete)




# For Manage NameSpace
app_name = 'Blog'


urlpatterns = [

    # path('', BlogView.as_view(), name='blog'),
    path('', BlogView.as_view(), name='blog'),
    path('<slug:slug>', PostDetailView.as_view(), name='post'),
    path('<slug:content_object>', comment_thread, name='thread'),
    path('<slug:content_object>/Delete', comment_delete, name='delete'),
    # DRF API
    path('API/', include('blog.api.urls')),

]
