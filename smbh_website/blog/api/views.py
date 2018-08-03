from rest_framework import generics
from blog.models import Post
from .serializers import PostListSerializer


class PostListAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
