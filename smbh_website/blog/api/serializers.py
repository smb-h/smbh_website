from rest_framework.serializers import ModelSerializer, SlugRelatedField
from blog.models import Post


class PostListSerializer(ModelSerializer):

    tags = SlugRelatedField(many=True, read_only=True, slug_field='name')
    author = SlugRelatedField(read_only=True, slug_field='username')

    class Meta:
        model = Post
        fields = (
            'title',
            'image',
            'author',
            'publish',
            'slug',
            'tags',
            'language',
        )
        read_only_fields = ('author', 'slug')


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
            'slug',
            'tags',
            'language',
        )
        read_only_fields = ('author', 'slug')
