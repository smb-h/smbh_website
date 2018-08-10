from django import forms
from .models import Post, Comment
# Ckeditor
from ckeditor_uploader.widgets import CKEditorUploadingWidget



class PostAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget(config_name='ck_blog'))
    class Meta:
        model = Post
        fields = '__all__'



class CommentForm(forms.Form):
    content_type = forms.CharField(widget=forms.HiddenInput)
    object_id = forms.IntegerField(widget=forms.HiddenInput)
    #parent_id = forms.IntegerField(widget=forms.HiddenInput, required=False)
    content = forms.CharField(label='', widget=forms.Textarea)
