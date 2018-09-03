from app.models import Contact, Profile
from rest_framework.serializers import (
                                            ModelSerializer,
                                            SlugRelatedField,
                                            HyperlinkedIdentityField,
                                            SerializerMethodField,
                                            CharField
                                        )
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError



# Contact Form Serializer
class ContactFormSerializer(ModelSerializer):

    class Meta:
        model = Contact
        fields = (
            'first_name',
            'last_name',
            'email',
            'phone',
            'subject',
            'content',
        )
        # read_only_fields = ()
