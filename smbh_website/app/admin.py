from django.contrib import admin
from .models import AboutMe, Service, Profile, Contact
from django import forms
# Ckeditor
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from ckeditor.widgets import CKEditorWidget



class AboutMeForm(forms.ModelForm):
    class Meta:
        model = AboutMe
        localized_fields = ('updated',)
        fields = "__all__"

        # https://docs.djangoproject.com/en/dev/topics/forms/modelforms/#overriding-the-default-fields
        widgets = {
            'content': CKEditorWidget(config_name='ck_comment'),
        }


@admin.register(AboutMe)
class AboutMeAdmin(admin.ModelAdmin):
    form = AboutMeForm
    fieldsets = [
        ('Info', {'fields': ['title', 'content', 'tags']}),
    ]
    readonly_fields = ('updated',)
    # Display
    list_display = ('title', 'updated')

    # Filter
    list_filter = ['updated', 'tags']

    # Search
    search_fields = ['updated', 'title', 'content', 'tags']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Info', {'fields': ['title', 'content', 'tags']}),
    ]
    readonly_fields = ('updated',)
    # Display
    list_display = ('title', 'updated')

    # Filter
    list_filter = ['updated', 'tags']

    # Search
    search_fields = ['updated', 'title', 'content', 'tags']



class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        localized_fields = ('updated',)
        fields = "__all__"

        # https://docs.djangoproject.com/en/dev/topics/forms/modelforms/#overriding-the-default-fields
        widgets = {
            'content': CKEditorWidget(config_name='ck_blog'),
        }


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    form = ProfileForm
    fieldsets = [
        ('Information', {'fields': ['title', 'subTitle', 'Image', 'content']}),
        ('Time', {'fields': ['start', 'end']}),
        ('Utility', {'fields': ['url', 'slug', 'tags']}),
    ]
    readonly_fields = ('updated',)
    # Display
    list_display = ('title', 'updated', 'url')

    # Filter
    list_filter = ['updated', 'tags']

    # Search
    search_fields = ['updated', 'title', 'subTitle', 'content', 'url', 'tags']



class ProfileForm(forms.ModelForm):
    class Meta:
        model = Contact
        localized_fields = ('updated',)
        fields = "__all__"

        # https://docs.djangoproject.com/en/dev/topics/forms/modelforms/#overriding-the-default-fields
        widgets = {
            'content': CKEditorWidget(config_name='ck_comment'),
        }

@admin.register(Contact)
class ContactMeAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Information', {'fields': ['subject', 'name', 'email', 'phone', 'content']}),
    ]
    readonly_fields = ('updated',)
    # Display
    list_display = ('subject', 'email', 'name', 'updated')

    # Filter
    list_filter = ['email', 'updated']

    # Search
    search_fields = ['subject', 'name', 'email', 'phone', 'content', 'updated']
