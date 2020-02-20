from django.shortcuts import render
from django.views import View, generic


from blog.models import Post
from .models import Portfolio, Contact
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

        LatestPost = Post.objects.filter(language = self.request.LANGUAGE_CODE, publish__lte = timezone.now())[:3]

        context = {
            'LatestPost': LatestPost
        }


        return render(reQ, Template, context)


# Contact Mixin
class ContactMixin:
    fields = ['first_name', 'last_name', 'email', 'phone', 'subject', 'content']

    @property
    def success_msg(self):
        return NotImplemented

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.

        # Why use commin = false ?
        # print (form.cleand_data.get('title'))
        # print (form.cleand_data['title'))

        ins = form.save(commit = False)

        # The Answer of top question
        # print(ins.title)

        # Do custom logic here
        # It should return an HttpResponse
        ins.save()
        # We can put logic in template {% if "html_safe" in messages.tags %} {{ messages | safe}} {% else %} {{ messages }} {% endif %}
        # messages.success(self.request, "Message Sent Successfully", extra_tags='html_safe')
        messages.info(self.request, self.success_msg)
        return super(ContactMixin, self).form_valid(form)

    def form_invalid(self, form):
        # Do custom logic here
        messages.error(self.request, "Try Again!")
        return super(ContactView, self).form_invalid(form)


# Contact
class ContactView(ContactMixin, generic.FormView):

    template_name = 'contact_individual.html'
    # template_name = 'contact_django_Tool.html'
    form_class = ContactForm
    success_url = '/Contact'
    success_msg = "Message Sent Successfully"




# Portfolio
class PortfolioView(generic.ListView):
    queryset = Portfolio.objects.all()
    template_name = 'portfolio.html'  # Default: <app_label>/<model_name>_list.html
    context_object_name = 'Portfolio'   # Default: object_list
    paginate_by = 12




# Portfolio Detail
class PortfolioDetailView(generic.DetailView):
    model = Portfolio
    template_name = 'portfolio_detail_view.html'
    context_object_name = 'Portfolio'

