from django.db import models
from django.utils.translation import ugettext_lazy as _
from time import strftime
from django.urls import reverse
# Tag App
from taggit.managers import TaggableManager



# initial a directory for files of each user
def user_directory_path(self, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/year-month-day
    return ('{0}/{1}'.format(self.author, filename))


class About(models.Model):
    title = models.CharField(max_length=100, verbose_name=_('Title'))
    content = models.TextField(verbose_name=_('Content'))
    tags = TaggableManager(verbose_name=_('Tags'))
    updated = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name= _('Updated'))

    class Meta:
        verbose_name = _('About')
        verbose_name_plural = _('About')

    def __str__(self):
        return self.title


class Service(models.Model):
    title = models.CharField(max_length=100, verbose_name=_('Title'))
    content = models.CharField(max_length=300, blank=True, null=True, verbose_name=_('Content'))
    tags = TaggableManager(verbose_name=_('Tags'))
    updated = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name= _('Updated'))

    class Meta:
        verbose_name = _('Service')
        verbose_name_plural = _('Services')

    def __str__(self):
        return self.title


# Gallery
class Profile(models.Model):
    title = models.CharField(max_length=100, verbose_name=_('Title'))
    subTitle = models.CharField(max_length=80, null=True, blank=True, verbose_name=_('SubTitle'))
    Image = models.ImageField(upload_to='Profile/', verbose_name=_('Image'))
    start = models.DateField(blank=True, null=True, verbose_name=_('Start'))
    end = models.DateField(null=True, blank=True, verbose_name=_('End'))
    content = models.TextField(verbose_name=_('Content'))
    url = models.URLField(blank=True, null=True, verbose_name=_('Url'))
    tags = TaggableManager(verbose_name=_('Tags'))
    slug = models.SlugField(allow_unicode=True, unique=True, verbose_name=_('Slug'))
    updated = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name= _('Updated'))

    class Meta:
        verbose_name = _('Profile')
        verbose_name_plural = _('Profile')
        ordering = ['-updated', 'title']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('App:gallery', kwargs={"slug": self.slug})


# ContactMe
class Contact (models.Model):
    name = models.CharField(max_length=100, verbose_name=_('Name'))
    email = models.EmailField(unique=False, verbose_name=_('Email'))
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name=_('Phone'))
    subject = models.CharField(max_length=100, verbose_name=_('Subject'))
    content = models.TextField(verbose_name=_('Content'))
    updated = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name= _('Updated'))

    class Meta:
        verbose_name = _('Contact')
        verbose_name_plural = _('Contact')

    def __str__(self):
        return self.subject


