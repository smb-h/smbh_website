from rest_framework.generics import (
                                        ListAPIView,
                                        RetrieveAPIView,
                                        CreateAPIView,
                                        RetrieveUpdateDestroyAPIView,
                                    )
from blog.models import Post
from .serializers import (PostListSerializer, PostDetailSerializer)
# from django.core.exception import PermissionDenied
from rest_framework.permissions import (
                                            IsAuthenticated,
                                            IsAdminUser,
                                            IsAuthenticatedOrReadOnly,
                                        )
from .permissions import IsOwnerOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter



# List
class PostListAPIView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer

    # Filters
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter,)
    # filter_backends = (DjangoFilterBackend,)
    filter_fields = ['title', 'author', 'publish',]
    # OR
    # filter_backends = (SearchFilter,)
    search_fields = ('title', 'author')
    # Ordering
    # filter_backends = (OrderingFilter,)
    ordering_fields = ('title', 'publish')

# Detail
class PostDetailAPIView(RetrieveAPIView):
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'


    def get_queryset(self, *args, **kwargs):
        # queryset = Post.objects.filter(author=self.request.user)
        queryset = Post.objects.all()
        return queryset


# Update
class PostUpdateAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.filter()
    serializer_class = PostDetailSerializer
    permission_classes = [IsOwnerOrReadOnly, IsAdminUser, ]
    lookup_field = 'slug'

    # def perform_destroy(self, instance):
    #     if instance.author != self.request.user:
    #         raise PermissionDenied
    #     else :
    #         instance.delete()


# Create
class PostCreateAPIView(CreateAPIView):
    # queryset = Post.objects.filter()
    # model = Post
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'slug'

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)
