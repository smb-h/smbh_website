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
                            CommentDetailSerializer,
                            create_comment_serializer,
                            CommentListSerializer,
                        )
# Permissions
from rest_framework.permissions import (
											AllowAny,
                                            IsAuthenticated,
                                            IsAdminUser,
                                            IsAuthenticatedOrReadOnly,
                                        )
from app.api.permissions import IsOwnerOrReadOnly
# OAuth 2
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
# Filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
# Comments
from rest_framework.mixins import DestroyModelMixin, UpdateModelMixin
from django.db.models import Q



# Post Create
class PostCreateAPIView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'

    def perform_create(self, serializer):
        serializer.save(
            author = self.request.user,
            language = self.request.LANGUAGE_CODE
            )



# Post Update
class PostRUDAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    lookup_field = 'slug'

    # def perform_create(self, serializer):
    #     serializer.save(slug = unique_slug_generator(self))

    def get_queryset(self, *args, **kwargs):
        queryset = Post.objects.filter(slug = self.kwargs['slug'])
        return queryset

    def get_serializer_context(self, *args, **kwargs):
        context = {'request': self.request}
        return context

    # Default
    # def get_object(self, *args, **kwargs):
    #     pk = self.kwargs.get('pk')
    #     return Post.objects.get(pk = pk)



# Post List
class PostListAPIView(ListAPIView):
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    # Filters
    filter_backends = (SearchFilter, OrderingFilter,)
    # filter_backends = (DjangoFilterBackend,)
    # filter_fields = ['title', 'publish',]
    # OR
    # filter_backends = (SearchFilter,)
    search_fields = ('title', 'author', 'content', 'publish', 'tags')
    # Ordering
    # filter_backends = (OrderingFilter,)
    ordering_fields = ('title', 'publish')

    def get_queryset(self, *args, **kwargs):
        query = self.request.GET.get('q')
        queryset = Post.objects.active().filter(language = self.request.LANGUAGE_CODE).search(query)
        return queryset

    def get_serializer_context(self, *args, **kwargs):
        context = {'request': self.request}
        return context




# Comment Create
class CommentCreateAPIView(CreateAPIView):
    queryset = Comment.objects.all()
    #serializer_class = PostCreateUpdateSerializer
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]


    # Request Sample
    # http://127.0.0.1:8000/en/Blog/API/Comment/Create?type=post&slug=welcome-to-deployment&parent_id=21
    def get_serializer_class(self):
        
        # Getting stuff not setting them
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



# Comment Update Mixin Version
class CommentDetailAPIView(DestroyModelMixin, UpdateModelMixin, RetrieveAPIView):
    queryset = Comment.objects.filter(id__gte=0)
    serializer_class = CommentDetailSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # PUT comes from RetrieveAPIView
    def put(self, request, *args, **kwargs):
        # self.update comes from UpdateModelMixin
        return self.update(request, *args, **kwargs)

    # Delete comes from RetrieveAPIView
    def delete(self, request, *args, **kwargs):
        # self.destroy comes from DestroyModelMixin
        return self.destroy(request, *args, **kwargs)



# Comment Update
class CommentRUDAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = CommentDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly, TokenHasReadWriteScope]
    lookup_field = 'id'

    def get_queryset(self, *args, **kwargs):
        # queryset = Comment.objects.filter(id = self.kwargs['id'])
        queryset = Comment.objects.filter(id__gte = 0)
        return queryset

    def get_serializer_context(self, *args, **kwargs):
        context = {'request': self.request}
        return context



# Comment List
class CommentListAPIView(ListAPIView):
    serializer_class = CommentListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends= [SearchFilter, OrderingFilter]
    search_fields = ('content', 'user', 'content', 'timestamp')
    ordering_fields = ('timestamp',)


    def get_queryset(self, *args, **kwargs):
        query = self.request.GET.get("q")
        queryset = Comment.objects.filter(id__gte=0).search(query)
        return queryset

    def get_serializer_context(self, *args, **kwargs):
        context = {'request': self.request}
        return context





