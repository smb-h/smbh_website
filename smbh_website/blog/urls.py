from django.urls import path, include

from .views import BlogView, PostDetailView


# For Manage NameSpace
app_name = 'Blog'


urlpatterns = [

    path('', BlogView.as_view(), name='blog'),
    path('Post/<slug:slug>', PostDetailView.as_view(), name='post'),
    
]

