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




# initial a directory for files of each user
def user_directory_path(self, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/year-month-day
    return ('Uploads/{0}/{1}/{2}'.format(strftime('%Y-%m-%d'), self.author, filename))


LANGUAGES = [
    ('fa', _('Persian')),
    ('en', _('English')),
]


# Blog
class Post(models.Model):
    title = models.CharField(max_length = 80, verbose_name = _('Title'))
    image = models.ImageField(blank=True, null=True, upload_to=user_directory_path, verbose_name=_('Image'))
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name = _('Author'))
    language = models.CharField(max_length=50, choices=LANGUAGES, default = 'fa', verbose_name=_('Language'))
    # language = models.CharField(max_length=50, choices=settings.LANGUAGES, default = 'fa', verbose_name=_('Language'))
    # content = models.TextField(verbose_name = _('Content'))
    content = RichTextUploadingField(config_name='smbh', verbose_name = _('Content'))
    # content = RichTextField(config_name='awesome_ckeditor', verbose_name = _('Content'))
    # attach = models.FileField(blank= True, null=True, upload_to=user_directory_path, verbose_name= _('Attach Files'))
    created = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name= _('Created'))
    publish = models.DateTimeField(verbose_name=_('Publish'))
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



    class Meta:
        verbose_name = _('Post')
        verbose_name_plural = _('Posts')
        ordering = ['-updated', '-created']


    # formatting post objects to show
    def __str__(self):
        # return self.title
        return '{} - {}'.format(self.title, self.created)



# Translations
# django-admin makemessage
# django-admin compilemessage
