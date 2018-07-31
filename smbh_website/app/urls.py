from django.urls import path, include

from .views import HomeView, ContactView, PortfolioView, PortfolioDetailView



# NameSpace
app_name = 'App'


urlpatterns = [

    path('', HomeView.as_view(), name='home'),
    path('Contact', ContactView.as_view(), name='contact'),
    path('Portfolio', PortfolioView.as_view(), name='portfolio'),
    path('Portfolio/<slug:slug>', PortfolioDetailView.as_view(), name='gallery'),

]
