from django.shortcuts import render, get_object_or_404
from django.utils.translation import ugettext as _
from .models import Post, Comment
from taggit.models import Tag
from django.utils import timezone
from django.views import View, generic
from django.http import HttpResponseRedirect
from django.db.models import Q
from django.contrib.auth.mixins import LoginRequiredMixin
from app.utils.Unique_Slug_Generator import unique_slug_generator
# Comment
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.contenttypes.models import ContentType
from django.http import Http404, HttpResponse
from .forms import CommentForm, PostForm





# Tag Mixin View
class TagMixin(object):
    def get_context_data(self, **kwargs):
        context = super(TagMixin, self).get_context_data(**kwargs)
        context['tags'] = Tag.objects.all()
        return context


# Create Post
class PostCreateView(LoginRequiredMixin, generic.CreateView):
    form_class = PostForm
    template_name = 'blog_post_create.html'


    def form_valid(self, form):
        """If the form is valid, redirect to the supplied URL."""
        ins = form.save(commit = False)
        ins.author = self.request.user
        ins.slug = unique_slug_generator(ins)
        ins.save()
        ins.save_m2m()
        return HttpResponseRedirect(self.get_success_url())


    def form_invalid(self, form):
        """If the form is invalid, render the invalid form."""
        return self.render_to_response(self.get_context_data(form=form))

    def get_success_url(self):
        """Return the URL to redirect to after processing a valid form."""
        if self.success_url:
            url = self.success_url.format(**self.object.__dict__)
        else:
            url = self.object.get_absolute_url()
        return url


# Update Post
class PostUpdateView(LoginRequiredMixin, generic.CreateView):
    form_class = PostForm
    template_name = 'blog_post_update.html'

    def form_valid(self, form):
        """If the form is valid, redirect to the supplied URL."""
        ins = form.save(commit = False)
        ins.slug = unique_slug_generator(ins)
        ins.save()
        ins.save_m2m()
        return HttpResponseRedirect(self.get_success_url())


    def form_invalid(self, form):
        """If the form is invalid, render the invalid form."""
        return self.render_to_response(self.get_context_data(form=form))


    def get_success_url(self):
        """Return the URL to redirect to after processing a valid form."""
        if self.success_url:
            url = self.success_url.format(**self.object.__dict__)
        else:
            url = self.object.get_absolute_url()
        return url

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)


    def get_context_data(self, *args, **kwargs):
        context = super(PostUpdateView, self).get_context_data(*args, **kwargs)
        # name = self.get_object().name
        # context['comments'] = f'Update Restaurant: {name}'
        return context




# Blog
# class BlogView(View, TagMixin):
class BlogView(generic.ListView, TagMixin):

    template_name = 'blog.html'  # Default: <app_label>/<model_name>_list.html
    context_object_name = 'Posts'   # Default: object_list
    paginate_by = 4


    def get_queryset(self):
        qs = self.request.GET.get('q')
        queryset = Post.objects.active().filter(language = self.request.LANGUAGE_CODE).search(qs)
        # if qs:
        #     queryset = Post.objects.search(qs).filter(language = self.request.LANGUAGE_CODE)
        return queryset



# Post Detail
class PostDetailView(generic.View, TagMixin):

    # GET
    def get(self, *args, **kwargs):
        # print(self._allowed_methods())
        # print(self.http_method_not_allowed(self.request))
        # print(self.request)
        Template = 'blog_post_detail.html'
        ins = get_object_or_404(Post, slug=kwargs['slug'])

        comments = ins.comments

        # Comment Form
        initial_data={
            'content_type' : ins.get_content_type,
            'object_id' : ins.id
        }

        form = CommentForm(initial=initial_data)

        context = {
            'Post': ins,
            'comments': comments,
            'comment_form': form,
        }

        return render(self.request, Template, context)

    # POST
    def post(self, *args, **kwargs):
        Template = 'blog_post_detail.html'
        ins = get_object_or_404(Post, slug=kwargs['slug'])

        comments = ins.comments

        # Comment Form
        initial_data={
            'content_type' : ins.get_content_type,
            'object_id' : ins.id
        }

        form = CommentForm(self.request.POST or None, initial=initial_data)
        if form.is_valid():
            print(form.cleaned_data)
            # c_type = form.cleaned_data.get('content_type')
            # content_type = ContentType.objects.get(model = c_type)
            # obj_id = form.cleaned_data.get('object_id')
            # content_data = forms.cleaned_data.get('content')
            # new_comment, created = Comment.objects.get_or_create(
            #                                                         user = self.request.user,
            #                                                         content_type = content_type,
            #                                                         object_id = obj_id,
            #                                                         content = content_data
            #                                                     )


        context = {
            'Post': ins,
            'comments': comments,
            'comment_form': form,
        }

        return render(self.request, Template, context)





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
