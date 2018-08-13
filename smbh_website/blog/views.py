from django.shortcuts import render, get_object_or_404
from django.utils.translation import ugettext as _
from .models import Post, Comment
from taggit.models import Tag
from django.utils import timezone
from django.views import View, generic
from django.http import HttpResponseRedirect
from django.db.models import Q
# Comment
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.contenttypes.models import ContentType
from django.http import Http404, HttpResponse
from .forms import CommentForm





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


    def get_queryset(self):
        queryset = Post.objects.active().filter(language = self.request.LANGUAGE_CODE)

        qs = self.request.GET.get('q')
        if qs:
            queryset = queryset.filter(
            Q(title__icontains=qs) |
            Q(content__icontains=qs) |
            Q(author__first_name__icontains=qs) |
            Q(author__last_name__icontains=qs) |
            Q(tags__name__icontains=qs)
            ).distinct()

        return queryset



# Post Detail
class PostDetailView(generic.DetailView, TagMixin):
    model = Post
    template_name = 'blog_post_detail.html'
    context_object_name = 'Post'

    # Add Extra Context
    # def get_context_data(self, **kwargs):
    #     context = super(PostDetailView, self).get_context_data(**kwargs)
    # U can access object from self.object
    #     context['share'] = quote_plus(self.object.content)
    #     return context




# Comment
@login_required #(login_url='/login/') #LOGIN_URL = '/login/'
def comment_delete(request, id):
    #obj = get_object_or_404(Comment, id=id)
    # obj = CommentFormmment.objects.get(id=id)
    try:
        obj = Comment.objects.get(id=id)
    except:
        raise Http404

    if obj.user != request.user:
        #messages.success(request, "You do not have permission to view this.")
        #raise Http404
        reponse = HttpResponse("You do not have permission to do this.")
        reponse.status_code = 403
        return reponse
        #return render(request, "confirm_delete.html", context, status_code=403)

    if request.method == "POST":
        parent_obj_url = obj.content_object.get_absolute_url()
        obj.delete()
        messages.success(request, "This has been deleted.")
        return HttpResponseRedirect(parent_obj_url)
    context = {
        "object": obj
    }
    return render(request, "confirm_delete.html", context)

def comment_thread(request, id):
    #obj = Comment.objects.get(id=id)
    try:
        obj = Comment.objects.get(id=id)
    except:
        raise Http404

    if not obj.is_parent:
        obj = obj.parent

    content_object = obj.content_object # Post that the comment is on
    content_id = obj.content_object.id

    initial_data = {
            "content_type": obj.content_type,
            "object_id": obj.object_id
    }
    form = CommentForm(request.POST or None, initial=initial_data)
    if form.is_valid() and request.user.is_authenticated():
        c_type = form.cleaned_data.get("content_type")
        content_type = ContentType.objects.get(model=c_type)
        obj_id = form.cleaned_data.get('object_id')
        content_data = form.cleaned_data.get("content")
        parent_obj = None
        try:
            parent_id = int(request.POST.get("parent_id"))
        except:
            parent_id = None

        if parent_id:
            parent_qs = Comment.objects.filter(id=parent_id)
            if parent_qs.exists() and parent_qs.count() == 1:
                parent_obj = parent_qs.first()


        new_comment, created = Comment.objects.get_or_create(
                            user = request.user,
                            content_type= content_type,
                            object_id = obj_id,
                            content = content_data,
                            parent = parent_obj,
                        )
        return HttpResponseRedirect(new_comment.content_object.get_absolute_url())


    context = {
        "comment": obj,
        "form": form,
    }
    return render(request, "comment_thread.html", context)
