from rest_framework.serializers import ModelSerializer
from blog.models import Post


class PostListSerializer(ModelSerializer):

    class Meta:
        model = Post
        # fields = (
            # 'title',
            # 'author',
            # 'language',
        # )
        fields = '__all__'
