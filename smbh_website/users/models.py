from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _



class User(AbstractUser):

    # OverWrite base email field
    email = models.EmailField(_('Email Address'), unique=True)
    
    phone = models.CharField(_('Phone Number'), blank=True, null=True, max_length=255)
    birth_date = models.DateField(_('Birth Date'), blank=True, null=True)
    # address = models.TextField(_('Address'), blank=True, null=True)



    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        ordering = ['-date_joined']


    def get_absolute_url(self):
        return reverse("Users:detail", kwargs={"username": self.username})


    # OverRiding Save Method
    # https://docs.djangoproject.com/en/2.1/topics/db/models/#overriding-predefined-model-methods
    # def save(self, *args, **kwargs):
        # Send Activation mail

        # Call the "real" save() method.
        # super().save(*args, **kwargs)
        # do_something_else()


