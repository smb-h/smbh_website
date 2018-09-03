from django.urls import path, include
from app.api.views import ContactFormAPIView





urlpatterns = [
    # Contact
    path('Contact', ContactFormAPIView.as_view(), name='contact_api'),

]
