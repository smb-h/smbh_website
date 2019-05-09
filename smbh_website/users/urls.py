from django.urls import path, include

from users.views import (
    user_list_view,
    user_redirect_view,
    user_update_view,
    user_detail_view
)

# from django.contrib.auth.views import LoginView, LogoutView


app_name = "Users"

urlpatterns = [
    path("", view=user_list_view, name="list"),
    path("Redirect/", view=user_redirect_view, name="redirect"),
    path("<slug:username>/Update", user_update_view, name="update"),
    path("<slug:username>", user_detail_view, name="detail"),

    # path('Login/', LoginView.as_view(), name='login'),
    # path('Logout/', LogoutView.as_view(), name='logout'),


    # DRF API
    path('API/', include('users.api.urls')),
]
