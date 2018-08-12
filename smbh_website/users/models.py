from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _



class User(AbstractUser):


    phone = models.CharField(_('Phone Number'), blank=True, null=True, max_length=255)
    birth_date = models.DateField(_('Birth Date'), blank=True, null=True)
    # address = models.TextField(_('Address'), blank=True, null=True)



    def get_absolute_url(self):
        return reverse("Users:detail", kwargs={"username": self.username})
