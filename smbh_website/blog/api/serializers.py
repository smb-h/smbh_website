from rest_framework.serializers import ModelSerializer
from blog.models import Post


class PostListSerializer(ModelSerializer):

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


class PostDetailSerializer(ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'



