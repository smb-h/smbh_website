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
from urllib.parse import quote_plus
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
class PostUpdateView(LoginRequiredMixin, generic.UpdateView):
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



# class PostDetailView(generic.DetailView, generic.CreateView):
#     template_name = 'blog_post_detail.html'


#     def get_queryset(self):
#         qs = Post.objects.active()
#         return qs

#     def get_context_data(self, **kwargs):
#         context = super(PostDetailView, self).get_context_data(**kwargs)
#         # form = CommentForm(self.request.POST or None, initial=self.get_initial())
#         # context['form'] = form
#         context['share_content'] = quote_plus(self.object.content)
#         context['comments'] = self.object.comments
#         context['post'] = self.object
        
#         return context

#     def get_initial(self):

#         print('==================================')
#         print(self.object)
#         print(self.object.get_content_type)

#         initial_data = {
#             "content_type": self.object.get_content_type,
#             "object_id": self.object.id
#         }
#         return initial_data

#     def get_form_class(self, form_class=None):
#         form = CommentForm(self.request.POST or None, initial=self.get_initial())
#         return form


#     def form_valid(self, form):
#         if request.user.is_authenticated :
#             # ins = form.save(commit=False)
#             # c_type = form.cleaned_data.get("content_type")
#             c_type = self.object.get_content_type
#             # content_type = ContentType.objects.get(model=c_type)
#             obj_id = form.cleaned_data.get('object_id')
#             content_data = form.cleaned_data.get("content")


#             parent_obj = None
#             try:
#                 parent_id = int(self.request.POST.get("parent_id"))
#             except:
#                 parent_id = None

#             if parent_id:
#                 parent_qs = Comment.objects.filter(id=parent_id)
#                 if parent_qs.exists() and parent_qs.count() == 1:
#                     parent_obj = parent_qs.first()



#             new_comment, created = Comment.objects.get_or_create(
#                                                                     user = request.user,
#                                                                     content_type= c_type,
#                                                                     object_id = obj_id,
#                                                                     content = content_data,
#                                                                     parent = parent_obj
#                                                                 )


#             # ins.save()
#             messages.success(request, "Message Sent Successfully!")
#             return HttpResponseRedirect(new_comment.content_object.get_absolute_url())

        



# Post Detail
def post_detail(request, slug=None):
    # instance = get_object_or_404(Post, slug=slug)
    instance = Post.objects.active().get(slug=slug)
    if not instance:
        raise Http404

    share_content = quote_plus(instance.content)


    initial_data = {
        "content_type": instance.get_content_type,
        # "content_type": ContentType.objects.get_for_model(instance).id,
        "object_id": instance.id
    }

    form = CommentForm(request.POST or None, initial=initial_data)


    
    if form.is_valid() and request.user.is_authenticated :
        # ins = form.save(commit=False)
        c_type = form.cleaned_data.get("content_type")
        # content_type = ContentType.objects.get(model=c_type)
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
                                                                content_type= c_type,
                                                                object_id = obj_id,
                                                                content = content_data,
                                                                parent = parent_obj
                                                            )


        # ins.save()
        messages.success(request, "Message Sent Successfully!")
        return HttpResponseRedirect(new_comment.content_object.get_absolute_url())



    comments = instance.comments
    context = {
        "post": instance,
        "share_content": share_content,
        "comments": comments,
        "form":form,
    }
    return render(request, "blog_post_detail.html", context)




# class CommentDeleteView(generic.DeleteView, LoginRequiredMixin):
#     model = Comment
#     pk_url_kwarg = 'id'
#     template_name = 'confirm_delete.html'
#     context_object_name = 'object'
#     url = ''
#     # success_url = '/Blog'

#     def __init__(self, *args, **kwargs):
#         obj = self.get_object()
#         if obj.parent == None:
#             # print('Object IS PARENT')
#             parent_obj_url = obj.content_object.get_absolute_url()
#         else :
#             # print('Object IS CHILD')
#             parent_obj_url = obj.parent.get_absolute_url()

#         self.url = parent_obj_url
#         print('======================================')
#         print(self.url)


#     def get_object(self):
#         try:
#             obj = Comment.objects.get(id=self.kwargs['id'])
#         except :
#             raise Http404
#         if not obj.is_parent:
#             obj = obj.parent

#         if obj.user != self.request.user:
#             reponse = HttpResponse("You Do Not Have Permission To Do This.")
#             reponse.status_code = 403
#             return reponse
#             #return render(request, "confirm_delete.html", context, status_code=403)
        
#         return obj
    
#     def get_queryset(self, *args, **kwargs):
#         obj = self.get_obj()
#         # qs = Comment.objects.filter_by_instance(obj.content_object)
#         qs = Comment.objects.filter(content_type = obj.content_type)
#         return qs

#     def get_success_url(self):
#         url = self.url
#         messages.success(self.request, "The Comment Has Been Deleted.")
#         return HttpResponseRedirect(url)



# Comment

@login_required 
def comment_delete(request, id):
    # obj = get_object_or_404(Comment, id=id)
    try:
        obj = Comment.objects.get(id=id)
    except :
        raise Http404

    if obj.user != request.user:
        reponse = HttpResponse("You do not have permission to do this.")
        reponse.status_code = 403
        return reponse
        #return render(request, "confirm_delete.html", context, status_code=403)

    if request.method == "POST":
        if obj.parent == None:
            # print('Object IS PARENT')
            parent_obj_url = obj.content_object.get_absolute_url()
        else :
            # print('Object IS CHILD')
            parent_obj_url = obj.parent.get_absolute_url()
        obj.delete()
        messages.success(request, "This has been deleted.")
        return HttpResponseRedirect(parent_obj_url)
    context = {
        "object": obj
    }
    return render(request, "confirm_delete.html", context)



class CommentThreadView(generic.ListView, generic.CreateView):
    model = Comment
    template_name = 'comment_thread.html'


    def get_obj(self):
        try:
            obj = Comment.objects.get(id=self.kwargs['id'])
        except :
            raise Http404
        if not obj.is_parent:
            obj = obj.parent
        return obj
    
    def get_queryset(self, *args, **kwargs):
        qs = Comment.objects.filter_by_instance(self.get_obj())
        return qs


    def get_initial(self):
        initial_data = {
            "content_type": self.get_obj().content_type,
            "object_id": self.get_obj().object_id
        }
        return initial_data.copy()

    def get_form(self):
        form = CommentForm(self.request.POST or None, initial=self.get_initial())
        return form

    def get_context_data(self, **kwargs):
        # context = super(CommentThreadView, self).get_context_data(**kwargs)
        context = {}
        context['form'] = self.get_form()
        context['comment'] = self.get_obj()

        return context

    def form_valid(self, form):
        if self.request.user.is_authenticated:
            c_type = form.cleaned_data.get("content_type")
            # content_type = ContentType.objects.get(model=c_type)
            obj_id = form.cleaned_data.get('object_id')
            content_data = form.cleaned_data.get("content")
            parent_obj = None
            try:
                parent_id = int(self.request.POST.get("parent_id"))
            except:
                parent_id = None

            if parent_id != None:
                parent_qs = Comment.objects.filter(id=parent_id)
                if parent_qs.exists() and parent_qs.count() == 1:
                    parent_obj = parent_qs.first()


            new_comment, created = Comment.objects.get_or_create(
                                                                    user = self.request.user,
                                                                    content_type= c_type,
                                                                    object_id = obj_id,
                                                                    content = content_data,
                                                                    parent = parent_obj,
                                                                )
            if new_comment.parent != None:
                return HttpResponseRedirect(new_comment.parent.get_absolute_url())                                                        
            return HttpResponseRedirect(new_comment.content_object.get_absolute_url())

        else :
            reponse = HttpResponse("You Must Login First.")
            reponse.status_code = 403
            return reponse


 
