from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from time import strftime
from django.urls import reverse
from django.conf import settings
import datetime
from django.utils import timezone
# Tag App
from taggit.managers import TaggableManager
# Ckeditor
from ckeditor_uploader.fields import RichTextUploadingField
# from ckeditor.fields import RichTextField
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from rest_framework.reverse import reverse as api_reverse




# initial a directory for files of each user
def user_directory_path(self, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/year-month-day
    return ('Uploads/{0}/{1}/{2}'.format(strftime('%Y-%m-%d'), self.author, filename))


LANGUAGES = [
    ('fa', _('Persian')),
    ('en', _('English')),
]


# Post
class Post(models.Model):
    title = models.CharField(max_length = 255, verbose_name = _('Title'))
    image = models.ImageField(blank=True, null=True, upload_to=user_directory_path, verbose_name=_('Image'))
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name = _('Author'))
    language = models.CharField(max_length = 255, choices=LANGUAGES, default = 'fa', verbose_name=_('Language'))
    # language = models.CharField(max_length=50, choices=settings.LANGUAGES, default = 'fa', verbose_name=_('Language'))
    # content = models.TextField(verbose_name = _('Content'))
    content = RichTextUploadingField(config_name='ck_blog', verbose_name = _('Content'))
    # content = RichTextField(config_name='awesome_ckeditor', verbose_name = _('Content'))
    # attach = models.FileField(blank= True, null=True, upload_to=user_directory_path, verbose_name= _('Attach Files'))
    created = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name= _('Created'))
    publish = models.DateTimeField(default=timezone.now, verbose_name=_('Publish'))
    updated = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name= _('Updated'))
    slug = models.SlugField(allow_unicode=True, unique=True, verbose_name=_('Slug'))
    tags = TaggableManager(verbose_name=_('Tags'))


    def was_published_recently(self):
        now = timezone.now()
        return self.publish <= now

    was_published_recently.admin_order_field = 'publish'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published'



    def get_absolute_url(self):
        return reverse('Blog:post', kwargs={"slug": self.slug})

    def get_api_url(self, request = None):
        return api_reverse('Blog:post_api', kwargs={"slug": self.slug}, request = request)

    class Meta:
        ordering = ['-updated', '-title']


    # formatting post objects to show
    def __str__(self):
        # return self.title
        return '{} - {}'.format(self.title, self.created)







# Comment Manager
class CommentManager(models.Manager):
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


# Comment
class Comment(models.Model):
    user        = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name = _('User'))
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, verbose_name = _('Content Type'))
    object_id = models.PositiveIntegerField(verbose_name = _('ID'))
    content_object = GenericForeignKey('content_type', 'object_id')
    parent      = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, verbose_name = _('Parent'))
    content     = models.TextField(verbose_name = _('Content'))
    timestamp   = models.DateTimeField(auto_now_add=True, verbose_name = _('Timestamp'))

    objects = CommentManager()

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return (str(self.user.username) + content_type)

    def get_absolute_url(self):
        return reverse("Blog:thread", kwargs={"id": self.id})

    def get_delete_url(self):
        return reverse("Blog:delete", kwargs={"id": self.id})

    def children(self): #replies
        return Comment.objects.filter(parent=self)

    @property
    def is_parent(self):
        if self.parent is not None:
            return False
        return True
