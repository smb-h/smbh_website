from blog.models import Post
from django.utils import timezone
# DRF
from rest_framework.generics import (
                                        ListAPIView,
                                        RetrieveAPIView,
                                        CreateAPIView,
                                        RetrieveUpdateDestroyAPIView,
                                    )
from .serializers import (PostListSerializer, PostDetailSerializer)
# Permissions
from rest_framework.permissions import (
                                            IsAuthenticated,
                                            IsAdminUser,
                                            IsAuthenticatedOrReadOnly,
                                        )
from .permissions import IsOwnerOrReadOnly
# Filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
# Utils
from app.utils.Unique_Slug_Generator import unique_slug_generator


# List
class PostListAPIView(ListAPIView):
    serializer_class = PostListSerializer

    # Filters
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter,)
    # filter_backends = (DjangoFilterBackend,)
    filter_fields = ['title', 'author', 'publish', 'language']
    # OR
    # filter_backends = (SearchFilter,)
    search_fields = ('title', 'author', 'content', 'publish', 'tags')
    # Ordering
    # filter_backends = (OrderingFilter,)
    ordering_fields = ('title', 'publish')

    def get_queryset(self, *args, **kwargs):
        queryset = Post.objects.filter(publish__lte = timezone.now())
        return queryset


# Detail
class PostDetailAPIView(RetrieveAPIView):
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'

    def get_queryset(self, *args, **kwargs):
        queryset = Post.objects.filter(slug = self.kwargs['slug'])
        return queryset

# Create
class PostCreateAPIView(CreateAPIView):
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'slug'

    def perform_create(self, serializer):
        serializer.save(author = self.request.user, slug = unique_slug_generator(self))


# Update
class PostUpdateAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostDetailSerializer
    permission_classes = [IsOwnerOrReadOnly, IsAdminUser, ]
    lookup_field = 'slug'

    def perform_create(self, serializer):
        serializer.save(slug = unique_slug_generator(self))

    def get_queryset(self, *args, **kwargs):
        queryset = Post.objects.filter(slug = self.kwargs['slug'])
        return queryset
