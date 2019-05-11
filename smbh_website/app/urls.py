from django.urls import path, include, re_path

from .views import (HomeView,
    ContactView,
    PortfolioView,
    PortfolioDetailView
	)

# NameSpace
app_name = 'App'


urlpatterns = [

    path('', HomeView.as_view(), name='home'),
    path('Contact', ContactView.as_view(), name='contact'),
    path('Portfolio', PortfolioView.as_view(), name='portfolio'),
    path('Portfolio/<slug:slug>', PortfolioDetailView.as_view(), name='gallery'),
    # path('Login', auth_views.login, {'template_name': 'registration/Login.html'}, name='login'),
    # path('Login', auth_views.LoginView, name='login'),
    # path('Logout', auth_views.LogoutView, name='logout'),


    # DRF API
    path('API/', include('app.api.urls')),

]
