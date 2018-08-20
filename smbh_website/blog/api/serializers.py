from blog.models import Post, Comment
from rest_framework.serializers import (
                                            ModelSerializer,
                                            SlugRelatedField,
                                            HyperlinkedIdentityField,
                                            SerializerMethodField,
                                            CharField
                                        )
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
# Users
# from users.api.serializers import UserDetailSerializer



# Post List Serializer
class PostListSerializer(ModelSerializer):

    tags = SlugRelatedField(many=True, read_only=True, slug_field='name')
    # author = SlugRelatedField(read_only=True, slug_field='username')
    author = SerializerMethodField()
    # url = HyperlinkedIdentityField(read_only=True, view_name='Blog:post_api', lookup_field='slug')
    url = SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = (
            'title',
            'image',
            'author',
            'summary',
            'publish',
            'tags',
            'url',
        )
        read_only_fields = ('author',)

    def get_author(self, obj):
        # return (obj.author.username)
        return (obj.author.get_full_name())

    def get_url(self, obj):
        request = self.context.get('request')
        return obj.get_api_url(request = request)


# Post Detail Serializer
class PostDetailSerializer(ModelSerializer):

    # tags = SlugRelatedField(many=True, read_only=True, slug_field='name')
    tags = SerializerMethodField()
    tag_list = CharField(required = False)
    # author = SlugRelatedField(read_only=True, slug_field='username')
    author = SerializerMethodField()
    comments = SerializerMethodField()
    content_type = SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            'title',
            'image',
            'author',
            'language',
            'summary',
            'content',
            'draft',
            'publish',
            'tags',
            'tag_list',
            'id',
            'content_type',
            'comments',
        )
        read_only_fields = ('author', 'id', 'content_type', 'comments')


    def get_author(self, obj):
        return (obj.author.get_full_name())

    def get_comments(self, obj):
        qs = Comment.objects.filter_by_instance(obj)
        comments = CommentListSerializer(qs, many = True, context={'request': self.context.get('request')}).data
        return comments

    def get_content_type(self, obj):
        tp = ContentType.objects.get_for_model(obj)
        return str(tp)

    def get_tags(self, obj):
        tags = obj.tags.names()
        # tags = ', '.join(tags)
        return  (tags)
        
        

    def create(self, validated_data):

        title = validated_data.get("title")
        image = validated_data.get("image")
        request = self.context.get('request')
        author = request.user
        content = validated_data.get("content")
        summary = validated_data.get("summary")
        draft = validated_data.get("draft")
        pub = validated_data.get("publish")
        # Auto
        # language = request.LANGUAGE_CODE
        lang = validated_data.get("language")

        post = Post.objects.create(
            title = title,
            image = image,
            author = author,
            summary = summary,
            content = content,
            draft = draft,
            publish = pub,
            language = lang
            )

        tags = validated_data.get("tag_list")
        # Tag Seprator - Assum they are seprated by ','
        if tags != None :
            tag_list = []
            tmp = tags.split(',')
            for item in tmp :
                tag_list.append(item.strip())
            for tag in tag_list :
                post.tags.add(tag)

        return post
        # return super(PostDetailSerializer, self).create(*args, **kwargs)


    def update(self, instance, validated_data):
        tags = validated_data.get("tag_list")
        # Tag Seprator - Assum they are seprated by ,
        instance.tags.clear()
        if tags != None :
            tag_list = []
            tmp = tags.split(',')
            for item in tmp :
                tag_list.append(item.strip())
            
            for tag in tag_list :
                instance.tags.add(tag)


        instance.save()

        return instance



# Comment Create Serializer
def create_comment_serializer(model_type='Post', slug=None, parent_id=None, user=None):
    class CommentCreateSerializer(ModelSerializer):
        user = SerializerMethodField()
        class Meta:
            model = Comment
            fields = [
                'id',
                'user',
                'parent',
                'content',
                'timestamp',
            ]
            read_only_fields = ('user', 'id', 'parent',)

        def get_user(self, obj):
            return obj.user.get_full_name()

            
        def __init__(self, *args, **kwargs):
            self.model_type = model_type
            self.slug = slug
            self.parent_obj = None

            self.user = user
            
            if parent_id:
                parent_qs = Comment.objects.filter(id=parent_id)
                if parent_qs.exists() and parent_qs.count() == 1 :
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
                request = self.context.get('request')
                main_user = request.user
            
        
            model_type = self.model_type
            slug = self.slug
            parent_obj = self.parent_obj
            comment = Comment.objects.create_by_model_type(
                    model_type = model_type, 
                    slug = slug, 
                    content = content, 
                    user = main_user,
                    parent_obj=parent_obj,
                    )
            return comment

    return CommentCreateSerializer


# Comment List Seralizer
class CommentListSerializer(ModelSerializer):
    reply_count = SerializerMethodField()
    # content_type = SerializerMethodField()
    comment_owner = SerializerMethodField()
    user = SerializerMethodField()
    # url = SerializerMethodField()
    url = HyperlinkedIdentityField(view_name='Blog:thread_api', lookup_field='id')

    class Meta:
        model = Comment
        fields = [
            'id',
            # 'content_type',
            # 'object_id',
            'comment_owner',
            'user',
            # 'parent',
            'content',
            'reply_count',
            'timestamp',
            'url',
        ]

    def get_reply_count(self, obj):
        if obj.is_parent:
            return obj.children().count()
        return 0

    # Return Object Content Type name instead of id
    # def get_content_type(self, obj):
    #     return str(obj.content_type)

    def get_comment_owner(self, obj):
        my_obj = obj.content_type.model_class()
        tgt = my_obj.objects.get(id=obj.object_id)
        request = self.context.get('request')
        url = tgt.get_api_url(request)
        return (url)

    def get_user(self, obj):
        return obj.user.get_full_name()

    # def get_url(self, obj):
    #     request = self.context.get('request')
    #     return obj.get_api_url(request = request)



# Comment Child Serializer
class CommentChildSerializer(ModelSerializer):
    # user = UserDetailSerializer(read_only=True)
    user = SerializerMethodField(read_only=True)
    reply_count = SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            'content',
            'reply_count',
            'timestamp',
        ]

    def get_user(self, obj):
        return obj.user.get_full_name()

    def get_reply_count(self, obj):
        if obj.is_parent:
            return obj.children().count()
        return 0


# Comment Detail Serializer
class CommentDetailSerializer(ModelSerializer):
    # user = UserDetailSerializer(read_only=True)
    user = SerializerMethodField(read_only=True)
    reply_count = SerializerMethodField()
    # content_type = SerializerMethodField()
    comment_owner = SerializerMethodField()
    replies =   SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            'id',
            'parent',
            # 'content_type',
            # 'object_id',
            'comment_owner',
            'user',
            'content',
            'timestamp',
            'reply_count',
            'replies',
        ]
        read_only_fields = [
            # 'content_type',
            # 'object_id',
            'comment_owner',
            'user',
            'timestamp',
            'reply_count',
            'replies',
        ]

    def get_user(self, obj):
        return obj.user.get_full_name()
        
    # def get_content_object_url(self, obj):
    #     try:
    #         return obj.content_object.get_api_url()
    #     except:
    #         return None

    def get_comment_owner(self, obj):
        my_obj = obj.content_type.model_class()
        tgt = my_obj.objects.get(id=obj.object_id)
        request = self.context.get('request')
        url = tgt.get_api_url(request)
        return (url)


    def get_replies(self, obj):
        if obj.is_parent:
            return CommentChildSerializer(obj.children(), many=True).data
        return None

    def get_reply_count(self, obj):
        if obj.is_parent:
            return obj.children().count()
        return 0

    # Return Object Content Type name instead of id
    # def get_content_type(self, obj):
    #     ct = obj.content_type
    #     return ct

