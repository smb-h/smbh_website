from django.contrib import admin
from .models import About, Service, Profile, Contact
from django import forms
# Ckeditor
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from ckeditor.widgets import CKEditorWidget



class AboutForm(forms.ModelForm):
    class Meta:
        model = About
        localized_fields = ('updated',)
        fields = "__all__"

        # https://docs.djangoproject.com/en/dev/topics/forms/modelforms/#overriding-the-default-fields
        widgets = {
            'content': CKEditorWidget(config_name='ck_comment'),
        }


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    form = AboutForm
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



class ServiceForm(forms.ModelForm):
    class Meta:
        model = Service
        localized_fields = ('updated',)
        fields = "__all__"

        # https://docs.djangoproject.com/en/dev/topics/forms/modelforms/#overriding-the-default-fields
        widgets = {
            'content': CKEditorWidget(config_name='ck_comment'),
        }

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    form = ServiceForm
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
        ('Information', {'fields': ['title', 'subTitle', 'image', 'content']}),
        ('Time', {'fields': ['start', 'end']}),
        ('Utility', {'fields': ['url', 'slug', 'tags']}),
    ]
    readonly_fields = ('updated', 'slug')
    # Display
    list_display = ('title', 'updated', 'url')

    # Filter
    list_filter = ['updated', 'tags']

    # Search
    search_fields = ['updated', 'title', 'subTitle', 'content', 'url', 'tags']



class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        localized_fields = ('updated',)
        fields = "__all__"

        # https://docs.djangoproject.com/en/dev/topics/forms/modelforms/#overriding-the-default-fields
        widgets = {
            'content': CKEditorWidget(config_name='ck_comment'),
        }

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    form = ContactForm
    fieldsets = [
        ('Information', {'fields': ['subject', 'first_name', 'last_name', 'email', 'phone', 'content']}),
        ('Admin', {'fields': ['checked',]})
    ]
    readonly_fields = ('updated',)
    # Display
    list_display = ('subject', 'email', 'updated', 'checked')

    # Filter
    list_filter = ['email', 'updated']

    # Search
    search_fields = ['subject', 'first_name', 'last_name', 'email', 'phone', 'content', 'updated']
