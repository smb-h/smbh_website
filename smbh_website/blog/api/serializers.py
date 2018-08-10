from blog.models import Post, Comment
from rest_framework.serializers import (
                                            ModelSerializer,
                                            SlugRelatedField,
                                            HyperlinkedIdentityField,
                                            SerializerMethodField
                                        )
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
# Users
from users.api.serializers import UserDetailSerializer




class PostListSerializer(ModelSerializer):

    tags = SlugRelatedField(many=True, read_only=True, slug_field='name')
    author = SlugRelatedField(read_only=True, slug_field='username')
    # author = SerializerMethodField()
    # url = HyperlinkedIdentityField(read_only=True, view_name='Blog:post_api', lookup_field='slug')
    url = SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = (
            'title',
            'image',
            'author',
            'publish',
            'language',
            'tags',
            'url',
        )
        read_only_fields = ('author', 'slug')

    # def get_author(self, obj):
    #     return (obj.author.username)

    def get_url(self, obj):
        request = self.context.get('request')
        return obj.get_api_url(request = request)


class PostDetailSerializer(ModelSerializer):

    tags = SlugRelatedField(many=True, read_only=True, slug_field='name')
    author = SlugRelatedField(read_only=True, slug_field='username')

    class Meta:
        model = Post
        fields = (
            'title',
            'image',
            'author',
            'language',
            'content',
            'publish',
            'tags',
            'language'
        )
        read_only_fields = ('author',)




# Comments
User = get_user_model()

def create_comment_serializer(model_type='post', slug=None, parent_id=None, user=None):
    class CommentCreateSerializer(ModelSerializer):
        class Meta:
            model = Comment
            fields = [
                'id',
                'content',
                'timestamp',
            ]
        def __init__(self, *args, **kwargs):
            self.model_type = model_type
            self.slug = slug
            self.parent_obj = None
            if parent_id:
                parent_qs = Comment.objects.filter(id=parent_id)
                if parent_qs.exists() and parent_qs.count() ==1:
                    self.parent_obj = parent_qs.first()
            return super(CommentCreateSerializer, self).__init__(*args, **kwargs)

        def validate(self, data):
            model_type = self.model_type
            model_qs = ContentType.objects.filter(model=model_type)
            if not model_qs.exists() or model_qs.count() != 1:
                raise ValidationError("This is not a valid content type")
            SomeModel = model_qs.first().model_class()
            obj_qs = SomeModel.objects.filter(slug=self.slug)
            if not obj_qs.exists() or obj_qs.count() != 1:
                raise ValidationError("This is not a slug for this content type")
            return data

        def create(self, validated_data):
            content = validated_data.get("content")
            if user:
                main_user = user
            else:
                main_user = User.objects.all().first()
            model_type = self.model_type
            slug = self.slug
            parent_obj = self.parent_obj
            comment = Comment.objects.create_by_model_type(
                    model_type, slug, content, main_user,
                    parent_obj=parent_obj,
                    )
            return comment

    return CommentCreateSerializer



class CommentSerializer(ModelSerializer):
    reply_count = SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            'id',
            'content_type',
            'object_id',
            'parent',
            'content',
            'reply_count',
            'timestamp',
        ]

    def get_reply_count(self, obj):
        if obj.is_parent:
            return obj.children().count()
        return 0



class CommentListSerializer(ModelSerializer):
    url = HyperlinkedIdentityField(
        view_name='comments-api:thread')
    reply_count = SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            'url',
            'id',
            # 'content_type',
            # 'object_id',
            # 'parent',
            'content',
            'reply_count',
            'timestamp',
        ]

    def get_reply_count(self, obj):
        if obj.is_parent:
            return obj.children().count()
        return 0



class CommentChildSerializer(ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            'content',
            'timestamp',
        ]



class CommentDetailSerializer(ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    reply_count = SerializerMethodField()
    content_object_url = SerializerMethodField()
    replies =   SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            #'content_type',
            #'object_id',
            'content',
            'reply_count',
            'replies',
            'timestamp',
            'content_object_url',
        ]
        read_only_fields = [
            #'content_type',
            #'object_id',
            'reply_count',
            'replies',
        ]

    def get_content_object_url(self, obj):
        try:
            return obj.content_object.get_api_url()
        except:
            return None

    def get_replies(self, obj):
        if obj.is_parent:
            return CommentChildSerializer(obj.children(), many=True).data
        return None

    def get_reply_count(self, obj):
        if obj.is_parent:
            return obj.children().count()
        return 0
