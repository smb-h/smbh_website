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



# List
class PostListAPIView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer


# Detail
class PostDetailAPIView(RetrieveAPIView):
    queryset = Post.objects.filter()
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'


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
    queryset = Post.objects.filter()
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'slug'

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)
