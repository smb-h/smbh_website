from django.shortcuts import render
from django.views import View, generic


from blog.models import Post
from .models import Profile, Contact
from django.utils import timezone

# Translition
from django.utils.translation import ugettext as _
# pgettext for multy meaning words - month = pgettext("month name", "May")

from .forms import ContactForm
from django.contrib import messages

# Home
class HomeView(View):
    # GET
    def get(self, reQ):

        Template = 'home.html'

        LatestPost = Post.objects.filter(language = self.request.LANGUAGE_CODE, publish__lte = timezone.now()).order_by('-publish')[:3]

        context = {
            'LatestPost': LatestPost
        }

        return render(reQ, Template, context)


# Contact Mixin
class ContactMixin:
    fields = ['name', 'email', 'phone', 'subject', 'content']

    @property
    def success_msg(self):
        return NotImplemented

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # Do custom logic here
        # It should return an HttpResponse
        form.save()
        messages.info(self.request, self.success_msg)
        return super(ContactMixin, self).form_valid(form)

    # def form_invalid(self, form):
    #     # Do custom logic here
    #     return super(ContactView, self).form_invalid(form)


# Contact
class ContactView(ContactMixin, generic.FormView):

    template_name = 'contact_individual.html'
    form_class = ContactForm
    success_url = '/Contact'
    success_msg = "Message Sent Successfully"






# Profile
class ProfileView(generic.ListView):

    template_name = 'Profile.html'  # Default: <app_label>/<model_name>_list.html
    context_object_name = 'Profile'   # Default: object_list
    paginate_by = 12

    # Default: Model.objects.all()
    def get_queryset(self):
        queryset = Profile.objects.all().order_by('-updated')
        return queryset

    # Add Extra Context
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


# Profile Detail
class ProfileDetailView(generic.DetailView):
    model = Profile
    template_name = 'ProfileDetailView.html'
    context_object_name = 'Profile'
