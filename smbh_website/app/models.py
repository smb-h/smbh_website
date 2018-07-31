from django.db import models
from django.utils.translation import ugettext_lazy as _ 
from time import strftime
# Tag App
from taggit.managers import TaggableManager
# Ckeditor
# from ckeditor_uploader.fields import RichTextUploadingField
from ckeditor.fields import RichTextField



# initial a directory for files of each user
def user_directory_path(self, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/year-month-day
    return ('Uploads/{0}/{1}/{2}'.format(self.author, strftime('%Y-%m'), filename))
    

class AboutMe(models.Model):
    title = models.CharField(max_length=100, verbose_name=_('Title'))
    # content = models.TextField(verbose_name=_('Content'))
    content = RichTextField(config_name='smbh', verbose_name = _('Content'))
    tags = TaggableManager(verbose_name=_('Tags'))
    updated = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name= _('Updated'))

    class Meta:
        verbose_name = _('About Me')
        verbose_name_plural = _('About Me')

    def __str__(self):
        return self.title


class Service(models.Model):
    title = models.CharField(max_length=100, verbose_name=_('Title'))
    content = models.CharField(max_length=300, blank=True, null=True, verbose_name=_('Content'))
    # content = RichTextField(config_name='smbh', verbose_name = _('Content'))
    tags = TaggableManager(verbose_name=_('Tags'))
    updated = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name= _('Updated'))

    class Meta:
        verbose_name = _('Service')
        verbose_name_plural = _('Services')

    def __str__(self):
        return self.title


# Gallery
class Portfolio(models.Model):
    title = models.CharField(max_length=100, verbose_name=_('Title'))
    subTitle = models.CharField(max_length=80, null=True, blank=True, verbose_name=_('SubTitle'))
    Image = models.ImageField(upload_to='Portfolio/', verbose_name=_('Image'))
    start = models.DateField(blank=True, null=True, verbose_name=_('Start'))
    end = models.DateField(null=True, blank=True, verbose_name=_('End'))
    # content = models.TextField(verbose_name=_('Content'))
    content = RichTextField(config_name='smbh', verbose_name = _('Content'))
    url = models.URLField(blank=True, null=True, verbose_name=_('Url'))
    tags = TaggableManager(verbose_name=_('Tags'))
    slug = models.SlugField(allow_unicode=True, unique=True, verbose_name=_('Slug'))
    updated = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name= _('Updated'))

    class Meta:
        verbose_name = _('Portfolio')
        verbose_name_plural = _('Portfolio')

    def __str__(self):
        return self.title


# ContactMe
class Contact (models.Model):
    name = models.CharField(max_length=100, verbose_name=_('Name'))
    email = models.EmailField(unique=False, verbose_name=_('Email'))
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name=_('Phone'))
    subject = models.CharField(max_length=100, verbose_name=_('Subject'))
    # content = models.TextField(verbose_name=_('Content'))
    content = RichTextField(config_name='smbh', verbose_name = _('Content'))
    updated = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name= _('Updated'))

    class Meta:
        verbose_name = _('Contact Me')
        verbose_name_plural = _('Contact Me')

    def __str__(self):
        return self.subject
