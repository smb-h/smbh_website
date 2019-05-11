from app.models import Contact, Portfolio
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


# Portfolio Serializer
class PortfolioSerializer(ModelSerializer):
    tags = SerializerMethodField()
    class Meta:
        model = Portfolio
        fields = (
            'title',
            'subTitle',
            'image',
            'start',
            'end',
            'content',
            'url',
            'tags',
            'slug',
            'updated',
        )

    def get_tags(self, obj):
        tags = obj.tags.names()
        return  (tags)
