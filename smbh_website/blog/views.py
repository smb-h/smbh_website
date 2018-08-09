from django.shortcuts import render
from django.utils.translation import ugettext as _
from .models import Post
from taggit.models import Tag
from django.utils import timezone
from django.views import View, generic
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect


# Pgination
# from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage



# Tag Mixin View
class TagMixin(object):
    def get_context_data(self, **kwargs):
        context = super(TagMixin, self).get_context_data(**kwargs)
        context['tags'] = Tag.objects.all()
        return context



# Blog
# class BlogView(View, TagMixin):
class BlogView(generic.ListView, TagMixin):
    
    template_name = 'blog.html'  # Default: <app_label>/<model_name>_list.html
    context_object_name = 'Posts'   # Default: object_list
    paginate_by = 4

    # Default: Model.objects.all()
    def get_queryset(self):
        # __lte Less than & __gte Greater than
        # queryset = Post.objects.filter(language = self.request.LANGUAGE_CODE, publish__lte = timezone.now()).order_by('-publish')
        queryset = Post.objects.filter(language = self.request.LANGUAGE_CODE, publish__lte = timezone.now())
        return queryset

    # Add Extra Context
    # def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        # context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        # context['book_list'] = Book.objects.all()
        # return context



# Post Detail
class PostDetailView(generic.DetailView, TagMixin):
    model = Post
    template_name = 'blog_post_detail.html'
    context_object_name = 'Post'



