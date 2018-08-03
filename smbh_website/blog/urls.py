from django.urls import path, include

from .views import BlogView, PostDetailView
from .api.views import PostListAPIView



# For Manage NameSpace
app_name = 'Blog'


urlpatterns = [

    path('', BlogView.as_view(), name='blog'),
    # DRF
    path('API', PostListAPIView.as_view(), name='blogApi'),
    path('Post/<slug:slug>', PostDetailView.as_view(), name='post'),
    
]


