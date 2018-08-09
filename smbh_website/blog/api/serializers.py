from rest_framework.serializers import (
                                            ModelSerializer,
                                            SlugRelatedField,
                                            HyperlinkedIdentityField,
                                            SerializerMethodField
                                        )
from blog.models import Post


class PostListSerializer(ModelSerializer):

    tags = SlugRelatedField(many=True, read_only=True, slug_field='name')
    author = SlugRelatedField(read_only=True, slug_field='username')
    # author = SerializerMethodField()
    url = HyperlinkedIdentityField(read_only=True, view_name='Blog:post_api', lookup_field='slug')

    class Meta:
        model = Post
        fields = (
            'title',
            'image',
            'author',
            'publish',
            'language',
            'tags',
            'url',
        )
        read_only_fields = ('author', 'slug')

    # def get_author(self, obj):
    #     return (obj.author.username)



class PostDetailSerializer(ModelSerializer):

    tags = SlugRelatedField(many=True, read_only=True, slug_field='name')
    author = SlugRelatedField(read_only=True, slug_field='username')

    class Meta:
        model = Post
        fields = (
            'title',
            'image',
            'author',
            'language',
            'content',
            'publish',
            'tags',
            'language',
        )
        read_only_fields = ('author',)
