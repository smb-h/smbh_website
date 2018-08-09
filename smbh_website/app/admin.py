from django.contrib import admin
from .models import AboutMe, Service, Profile, Contact


@admin.register(AboutMe)
class AboutMeAdmin(admin.ModelAdmin):
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


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
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
