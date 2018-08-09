from django.conf import settings
from django.urls import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _


class CommentManager(models.Manager):
    def all(self):
        qs = super(CommentManager, self).filter(parent=None)
        return qs

    def filter_by_instance(self, instance):
        obj_id = instance.id
        qs = super(CommentManager, self).filter(id= obj_id).filter(parent=None)
        return qs

    def create_by_model_type(self, content, user, parent_obj=None):

        instance = self.model()
        instance.content = content
        instance.user = user
        if parent_obj:
            instance.parent = parent_obj
        instance.save()
        return instance



class Comment(models.Model):
    id = models.AutoField(primary_key=True, verbose_name = _('ID'))
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name = _('User'))
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, verbose_name = _('Parent'))
    content = models.TextField(verbose_name = _('Content'))
    timestamp   = models.DateTimeField(auto_now_add=True, verbose_name = _('Timestamp'))

    objects = CommentManager()

    class Meta:
        ordering = ['-timestamp']


    def __str__(self):
        return str(self.user.username)

    def get_absolute_url(self):
        return reverse("Comments:thread", kwargs={"id": self.id})

    def get_delete_url(self):
        return reverse("Comments:delete", kwargs={"id": self.id})

    # Replies
    def children(self):
        return Comment.objects.filter(parent=self)

    @property
    def is_parent(self):
        if self.parent is not None:
            return False
        return True
