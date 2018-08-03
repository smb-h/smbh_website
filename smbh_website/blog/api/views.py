from rest_framework import generics
from blog.models import Post
from .serializers import PostListSerializer, PostDetailSerializer


class PostListAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer


class PostDetailAPIView(generics.RetrieveAPIView):
    queryset = Post.objects.filter()
    serializer_class = PostDetailSerializer

