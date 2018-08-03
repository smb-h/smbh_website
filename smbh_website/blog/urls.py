from django.urls import path, include

from .views import BlogView, PostDetailView
from .api.views import PostListAPIView, PostDetailAPIView



# For Manage NameSpace
app_name = 'Blog'


urlpatterns = [

    # path('', BlogView.as_view(), name='blog'),
    path('', BlogView.as_view(), name='blog'),
    # DRF
    path('API', PostListAPIView.as_view(), name='blogApi'),
    path('API/<slug:slug>', PostDetailAPIView.as_view(), name='postApi'),

    path('<slug:slug>', PostDetailView.as_view(), name='post'),
    
]


