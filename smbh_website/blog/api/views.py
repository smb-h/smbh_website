from blog.models import Post, Comment
from django.utils import timezone
# DRF
from rest_framework.generics import (
                                        ListAPIView,
                                        RetrieveAPIView,
                                        CreateAPIView,
                                        RetrieveUpdateDestroyAPIView,
                                    )
from .serializers import (
                            PostListSerializer,
                            PostDetailSerializer,
                            # Comments
                            CommentListSerializer,
                            CommentDetailSerializer,
                            create_comment_serializer
                        )
# Permissions
from rest_framework.permissions import (
											AllowAny,
                                            IsAuthenticated,
                                            IsAdminUser,
                                            IsAuthenticatedOrReadOnly,
                                        )
from app.api.permissions import IsOwnerOrReadOnly
# Filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
# Utils
from app.utils.Unique_Slug_Generator import unique_slug_generator
# Comments
from rest_framework.mixins import DestroyModelMixin, UpdateModelMixin




# Post Create
class PostCreateAPIView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'

    def perform_create(self, serializer):
        serializer.save(author = self.request.user, slug = unique_slug_generator(self.request.data['title']))


# Post Detail
class PostDetailAPIView(RetrieveAPIView):
    serializer_class = PostDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_queryset(self, *args, **kwargs):
        queryset = Post.objects.filter(slug = self.kwargs['slug'])
        return queryset

    # Default
    # def get_object(self, *args, **kwargs):
    #     pk = self.kwargs.get('pk')
    #     return Post.objects.get(pk = pk)


# Post Update
class PostRUDAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostDetailSerializer
    permission_classes = [IsOwnerOrReadOnly, IsAdminUser]
    lookup_field = 'slug'

    def perform_create(self, serializer):
        serializer.save(slug = unique_slug_generator(self))

    def get_queryset(self, *args, **kwargs):
        queryset = Post.objects.filter(slug = self.kwargs['slug'])
        return queryset

    def get_serializer_context(self, *args, **kwargs):
        context = {'request': self.request}
        return context


# Post List
class PostListAPIView(ListAPIView):
    serializer_class = PostListSerializer
    permission_classes = [AllowAny]
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

    def get_serializer_context(self, *args, **kwargs):
        context = {'request': self.request}
        return context




# Comment Create
class CommentCreateAPIView(CreateAPIView):
    queryset = Comment.objects.all()
    #serializer_class = PostCreateUpdateSerializer
    # permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        model_type = self.request.GET.get("type")
        slug = self.request.GET.get("slug")
        parent_id = self.request.GET.get("parent_id", None)
        return create_comment_serializer(
                model_type=model_type,
                slug=slug,
                parent_id=parent_id,
                user=self.request.user
                )

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)


# Comment Detail
class CommentDetailAPIView(DestroyModelMixin, UpdateModelMixin, RetrieveAPIView):
    queryset = Comment.objects.filter(id__gte=0)
    serializer_class = CommentDetailSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)



# Comment List
class CommentListAPIView(ListAPIView):
    serializer_class = CommentListSerializer
    permission_classes = [AllowAny]
    filter_backends= [SearchFilter, OrderingFilter]
    search_fields = ['content', 'user__first_name']

    def get_queryset(self, *args, **kwargs):
        #queryset_list = super(PostListAPIView, self).get_queryset(*args, **kwargs)
        queryset_list = Comment.objects.filter(id__gte=0) #filter(user=self.request.user)
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                    Q(content__icontains=query)|
                    Q(user__first_name__icontains=query) |
                    Q(user__last_name__icontains=query)
                    ).distinct()
        return queryset_list

    def get_serializer_context(self, *args, **kwargs):
        context = {'request': self.request}
        return context
