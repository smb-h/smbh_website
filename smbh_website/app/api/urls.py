from django.urls import path, include
from app.api.views import ContactFormAPIView, PortfolioAPIView





urlpatterns = [
    # Contact
    path('Contact', ContactFormAPIView.as_view(), name='contact_api'),
    # Portfolio
    path('Portfolio/', PortfolioAPIView.as_view(), name='portfolio_api'),

]
