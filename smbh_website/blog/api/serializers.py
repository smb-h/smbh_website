from rest_framework import serializers
from blog.models import Post


class PostListSerializer(serializers.ModelSerializer):

    tags = serializers.StringRelatedField(many=True)
    # author = serializers.SlugRelatedField(slug_field='username', read_only=True)
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = (
            'title',
            'author',
            'publish',
            'updated',
            'slug',
            'tags',
        )
        # fields = '__all__'


class PostDetailSerializer(serializers.ModelSerializer):

    tags = serializers.StringRelatedField(many=True)
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = '__all__'



