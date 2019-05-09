from django.urls import path, include
from app.api.views import ContactFormAPIView, ProfileAPIView





urlpatterns = [
    # Contact
    path('Contact', ContactFormAPIView.as_view(), name='contact_api'),
    # Profile
    path('Profile/', ProfileAPIView.as_view(), name='profile_api'),

]
