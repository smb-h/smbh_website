from django.urls import path, include, re_path
from django.views.generic import TemplateView
from .views import (BlogView, post_detail, PostCreateView, PostUpdateView, CommentThreadView, comment_delete)




# For Manage NameSpace
app_name = 'Blog'


urlpatterns = [

    # path('', BlogView.as_view(), name='blog'),
    # re_path(r'^', TemplateView.as_view(template_name='react.html')),
    path('', TemplateView.as_view(template_name='react.html')),
    path('<slug>', TemplateView.as_view(template_name='react.html')),

    # DRF API
    path('API/', include('blog.api.urls')),

    # Comment
    # path('<int:id>/Delete', comment_delete, name='delete'),
    # path('<int:id>', CommentThreadView.as_view(), name='thread'),
    # Post
    # path('Create', PostCreateView.as_view(), name='post_create'),
    # path('<slug>/Update', PostUpdateView.as_view(), name='post_update'),
    # path('<slug>', post_detail, name='post'),

]
