from django import forms
from .models import Post, Comment
# Ckeditor
from ckeditor_uploader.widgets import CKEditorUploadingWidget



class PostForm(forms.ModelForm):
    # content = forms.CharField(widget=CKEditorUploadingWidget(config_name='ck_blog'))
    # content = forms.CharField(widget=forms.Textarea(attrs={'cols': 30, 'rows': 6, 'class': 'form-control'}))
    # name = forms.TextInput(attrs={'required': True})
    author = forms.CharField(widget=forms.HiddenInput)
    # publish = forms.DateField(widget = forms.SelectDateWidget)
    publish = forms.SplitDateTimeField(widget=forms.SplitDateTimeWidget)
    class Meta:
        model = Post
        fields = ['title', 'image', 'author', 'language', 'content', 'tags', 'attach', 'draft', 'publish']
        # Custmize Widgets
        # name.widget.attrs.update({'class': 'special'})
        # comment.widget.attrs.update(size='40')

        # widgets = {
        #     'content': CKEditorUploadingWidget(config_name='ck_blog'),
        #     'author': forms.HiddenInput,
        # }
        # field_classes = {
        #     'slug': MySlugFormField,
        # }
        # labels = {
        #     'name': _('Writer'),
        # }
        # help_texts = {
        #     'name': _('Some useful help text.'),
        # }
        # error_messages = {
        #     'name': {
        #         'max_length': _("This writer's name is too long."),
        #     },
        # }



class CommentForm(forms.Form):
    content_type = forms.CharField(widget=forms.HiddenInput)
    object_id = forms.IntegerField(widget=forms.HiddenInput)
    #parent_id = forms.IntegerField(widget=forms.HiddenInput, required=False)
    content = forms.CharField(label='', widget=forms.Textarea)
