from django.urls import path

from islamic_resources.users.views import (
    user_list_view,
    user_redirect_view,
    user_update_view,
    user_detail_view,
    user_activate_view,
)
from users.api.views import (
    UserCreateAPIView,
    UserLoginAPIView
    )
# from django.contrib.auth.views import LoginView, LogoutView


app_name = "Users"

urlpatterns = [
    path("", view=user_list_view, name="list"),
    path("redirect/", view=user_redirect_view, name="redirect"),
    # path("update/", view=user_update_view, name="update"),
    path("<slug:username>/Update", user_update_view, name="update"),
    path("<slug:username>/", user_detail_view, name="detail"),

    # path('Login/', LoginView.as_view(), name='login'),
    # path('Logout/', LogoutView.as_view(), name='logout'),

    path('Activate', user_activate_view, name='activate'),

    # API
    path('Login/', UserLoginAPIView.as_view(), name='login'),
    path('Register/', UserCreateAPIView.as_view(), name='register'),
]
