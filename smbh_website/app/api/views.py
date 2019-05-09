from app.models import Contact, Profile
from .serializers import ContactFormSerializer, ProfileSerializer
# DRF
from rest_framework.generics import (
                                        ListAPIView,
                                        RetrieveAPIView,
                                        CreateAPIView,
                                        RetrieveUpdateDestroyAPIView,
                                    )

# Permissions
from rest_framework.permissions import (
											AllowAny,
                                            IsAuthenticated,
                                            IsAdminUser,
                                            IsAuthenticatedOrReadOnly,
                                        )
from app.api.permissions import IsOwnerOrReadOnly
from app.api.pagination import PostPagination


# Contact Form
class ContactFormAPIView(CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactFormSerializer
    permission_classes = [AllowAny]


# Profile
class ProfileAPIView(ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    pagination_class = PostPagination
