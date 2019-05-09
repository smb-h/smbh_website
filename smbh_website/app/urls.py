from django.urls import path, include, re_path

from .views import (HomeView,
    ContactView,
    ProfileView,
    ProfileDetailView
	)

# NameSpace
app_name = 'App'


urlpatterns = [

    path('', HomeView.as_view(), name='home'),
    path('Contact', ContactView.as_view(), name='contact'),
    path('Profile', ProfileView.as_view(), name='profile'),
    path('Profile/<slug:slug>', ProfileDetailView.as_view(), name='gallery'),
    # path('Login', auth_views.login, {'template_name': 'registration/Login.html'}, name='login'),
    # path('Login', auth_views.LoginView, name='login'),
    # path('Logout', auth_views.LogoutView, name='logout'),


    # DRF API
    path('API/', include('app.api.urls')),

]
