from app.models import Contact, Profile
from .serializers import ContactFormSerializer
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



# Post Create
class ContactFormAPIView(CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactFormSerializer
    permission_classes = [AllowAny]
