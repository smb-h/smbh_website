from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import DetailView, ListView, RedirectView, UpdateView
from django.contrib.auth import get_user_model

User = get_user_model()


class UserDetailView(LoginRequiredMixin, DetailView):

    model = User
    slug_field = "username"
    slug_url_kwarg = "username"
    template_name = 'user_detail.html'

user_detail_view = UserDetailView.as_view()



class UserListView(LoginRequiredMixin, ListView):

    model = User
    slug_field = "username"
    slug_url_kwarg = "username"
    template_name = 'user_list.html'

user_list_view = UserListView.as_view()



class UserUpdateView(LoginRequiredMixin, UpdateView):

    model = User
    fields = ["first_name", 'last_name', 'birth_date', 'phone']
    template_name = 'user_form.html'

    def get_success_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})

    def get_object(self):
        user = User.objects.get(username=self.request.user.username)
        return user

user_update_view = UserUpdateView.as_view()



class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get_redirect_url(self):
        return reverse("Users:detail", kwargs={"username": self.request.user.username})

user_redirect_view = UserRedirectView.as_view()
