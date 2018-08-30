from django.db import models
from django.utils.translation import ugettext_lazy as _
from time import strftime
from django.urls import reverse
from django.conf import settings
import datetime
from django.utils import timezone
from django.db.models import Q
from app.utils.Unique_Slug_Generator import unique_slug_generator
from .utils.Timetable import get_read_time
# Tag App
from taggit.managers import TaggableManager
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from rest_framework.reverse import reverse as api_reverse
from django.utils.safestring import mark_safe


class PostQuerySet(models.query.QuerySet):
    def search(self, query):
        if query:
            query = query.strip()
            qs = self.filter(
                                Q(title__icontains=query) |
                                Q(content__icontains=query) |
                                Q(author__first_name__icontains=query) |
                                Q(author__last_name__icontains=query) |
                                Q(tags__name__icontains=query)
                            ).distinct()
            return qs
        return self


# Post Model Manager
class PostManager(models.Manager):
    # OverRide all
    # def all(self, *args, **kwargs):
        # Super() is the original method and we are add filtering to it
        # qs = super(PostManager, self).filter(draft=False, publish__lte=timezone.now())
        # return qs

    def get_queryset(self):
        return PostQuerySet(self.model, using=self._db)

    # Active Posts
    def active(self, *args, **kwargs):
        # __lte Less than & __gte Greater than
        qs = super(PostManager, self).filter(draft=False, publish__lte=timezone.now())
        return qs

    # Search
    def search(self, query):
        # if query:
        #     # qs = self.get_queryset().filter(
        #     qs = self.active().filter(
        #                                 Q(title__icontains=query) |
        #                                 Q(content__icontains=query) |
        #                                 Q(author__first_name__icontains=query) |
        #                                 Q(author__last_name__icontains=query) |
        #                                 Q(tags__name__icontains=query)
        #                             ).distinct()
        #     return qs
        # return None
        return self.get_queryset().search(query)




# initial a directory for files of each user
def upload_path(self, filename):
    # file will be uploaded to MEDIA_ROOT/year-month-day/UserName/FileName
    # return ('Uploads/{0}/{1}/{2}'.format(strftime('%Y-%m-%d'), self.author, filename))
    return ('{0}/{1}'.format(self.author, filename))


LANGUAGES = [
    ('fa', _('Persian')),
    ('en', _('English')),
]

User = settings.AUTH_USER_MODEL

# Post
class Post(models.Model):
    title = models.CharField(max_length = 255, verbose_name = _('Title'))
    image = models.ImageField(blank = True, null = True, upload_to = upload_path, verbose_name = _('Image'))
    author = models.ForeignKey(User, on_delete = models.CASCADE, verbose_name = _('Author'))
    language = models.CharField(max_length = 255, choices = LANGUAGES, default = 'fa', verbose_name = _('Language'))
    content = models.TextField(verbose_name = _('Content'))
    summary = models.CharField(max_length = 511, blank = True, null = True, verbose_name = _('Summary'))
    attach = models.FileField(blank = True, null = True, upload_to = upload_path, verbose_name = _('Attach File'))
    # Date Time Information
    created = models.DateTimeField(auto_now_add = True, auto_now = False, verbose_name = _('Created'))
    updated = models.DateTimeField(auto_now_add = False, auto_now = True, verbose_name = _('Updated'))
    read_time = models.CharField(max_length = 255, blank = True, null = True, verbose_name = _('Read Time'))
    draft = models.BooleanField(default = False, verbose_name = _('Draft'))
    publish = models.DateTimeField(blank = True, null = True, verbose_name = _('Publish'))
    # Utils
    slug = models.SlugField(allow_unicode = True, unique = True, verbose_name = _('Slug'))
    tags = TaggableManager(blank = True, verbose_name = _('Tags'))

    objects = PostManager()

    def was_published_recently(self):
        if self.publish:
            now = timezone.now()
            return (self.publish <= now and not self.draft)
        return None

    was_published_recently.admin_order_field = 'publish'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published'


    def get_absolute_url(self):
        return reverse('Blog:post', kwargs={"slug": self.slug})

    def get_api_url(self, request = None):
        return api_reverse('Blog:post_api', kwargs={"slug": self.slug}, request = request)


    class Meta:
        verbose_name = _('Post')
        verbose_name_plural = _('Post')
        ordering = ['-publish', 'title']

    # formatting post objects to show
    def __str__(self):
        return '{} - {}'.format(self.title, self.created)

    @property
    def comments(self):
        qs = Comment.objects.filter_by_instance(self)
        return qs

    @property
    def get_content_type(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return content_type

    # OverRiding Save Method
    # https://docs.djangoproject.com/en/2.1/topics/db/models/#overriding-predefined-model-methods
    def save(self, *args, **kwargs):
        self.slug = unique_slug_generator(self)
        self.read_time = get_read_time(self.content)

        # Call the "real" save() method.
        super().save(*args, **kwargs)
        # do_something_else()



# Comment Manager

class CommentQuerySet(models.query.QuerySet):
    def search(self, query):
        if query:
            query = query.strip()
            qs = self.filter(
                                Q(content__icontains=query) |
                                Q(user__first_name__icontains=query) |
                                Q(user__last_name__icontains=query) |
                                Q(content_type__icontains=query)
                            ).distinct()
            return qs
        return self


class CommentManager(models.Manager):

    def get_queryset(self):
        return CommentQuerySet(self.model, using=self._db)


    def all(self):
        qs = super(CommentManager, self).filter(parent=None)
        return qs

    def filter_by_instance(self, instance):
        content_type = ContentType.objects.get_for_model(instance.__class__)
        obj_id = instance.id
        qs = super(CommentManager, self).filter(content_type=content_type, object_id= obj_id).filter(parent=None)
        return qs

    def create_by_model_type(self, model_type, slug, content, user, parent_obj=None):
        model_qs = ContentType.objects.filter(model=model_type)
        if model_qs.exists():
            SomeModel = model_qs.first().model_class()
            obj_qs = SomeModel.objects.filter(slug=slug)
            if obj_qs.exists() and obj_qs.count() == 1:
                instance = self.model()
                instance.content = content
                instance.user = user
                instance.content_type = model_qs.first()
                instance.object_id = obj_qs.first().id
                if parent_obj:
                    instance.parent = parent_obj
                instance.save()
                return instance
        return None

    # Search
    def search(self, query):
        return self.get_queryset().search(query)


content_types = [
    ('post', _('Post')),
    ('comment', _('Comment')),
]

# Comment
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name = _('User'))
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, verbose_name = _('Content Type'))
    # content_type = models.CharField(max_length = 255, choices=content_types, default = 'post', verbose_name=_('Content Type'))
    object_id = models.PositiveIntegerField(verbose_name = _('ID'))
    content_object = GenericForeignKey('content_type', 'object_id')
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, verbose_name = _('Parent'))
    content = models.TextField(verbose_name = _('Content'))
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name = _('Timestamp'))

    objects = CommentManager()

    class Meta:
        verbose_name = _('Comment')
        verbose_name_plural = _('Comments')
        ordering = ['-timestamp']

    def __str__(self):
        # return ('{} - {}'.format(str(self.user.username), self.content_type))
        return (mark_safe(self.content))

    def get_absolute_url(self):
        return reverse("Blog:thread", kwargs={"id": self.id})

    def get_delete_url(self):
        return reverse("Blog:delete", kwargs={"id": self.id})

    def get_api_url(self, request = None):
        return api_reverse('Blog:thread_api', kwargs={"id": self.id}, request = request)


    # Replies
    def children(self):
        return Comment.objects.filter(parent=self)

    @property
    def is_parent(self):
        if self.parent is not None:
            return False
        return True

    # OverRiding Save Method
    # https://docs.djangoproject.com/en/2.1/topics/db/models/#overriding-predefined-model-methods
    def save(self, *args, **kwargs):

        # Call the "real" save() method.
        super().save(*args, **kwargs)
        # Save many to many relations
        super().save_m2m(*args, **kwargs)
        # do_something_else()
