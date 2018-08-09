from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from app.utils.Code_Generator import code_generator
from django.conf import settings
from django.core.mail import send_mail



class User(AbstractUser):


    phone = models.CharField(_('Phone Number'), blank=True, null=True, max_length=255)
    birth_date = models.DateField(_('Birth Date'), blank=True, null=True)
    # address = models.TextField(_('Address'), blank=True, null=True)

    activation_key = models.TextField(_('Activation Key'), blank=True, null=True)


    def send_activation_email(self):
        if not self.is_active:
            self.activation_key = code_generator(size=200)
            self.save()
            _path = reverse('Users:activate', kwargs={"code": self.activation_key})
            subject = 'Activate Account'
            from_email = settings.DEFAULT_FROM_EMAIL
            message = f'Activate your account here: {_path}'
            recipient_list = [self.user.email]
            html_message = f'<p>Activate your account here: {_path}</p>'
            # print(html_message)
            sent_mail = send_mail(
                            subject,
                            message,
                            from_email,
                            recipient_list,
                            fail_silently=False,
                            html_message=html_message)
            # sent_mail = False
            return sent_mail


    def get_absolute_url(self):
        return reverse("Users:detail", kwargs={"username": self.username})
