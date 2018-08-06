from django.contrib import admin
from .models import AboutMe, Service, Profile, Contact


class AboutMeAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Info', {'fields': ['title', 'content', 'tags']}),
    ]

    # Display
    list_display = ('title', 'updated')

    # Filter
    list_filter = ['updated', 'tags']

    # Search
    search_fields = ['updated', 'title', 'content', 'tags']


class ServiceAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Info', {'fields': ['title', 'content', 'tags']}),
    ]

    # Display
    list_display = ('title', 'updated')

    # Filter
    list_filter = ['updated', 'tags']

    # Search
    search_fields = ['updated', 'title', 'content', 'tags']


class ProfileAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Information', {'fields': ['title', 'subTitle', 'Image', 'content']}),
        ('Time', {'fields': ['start', 'end']}),
        ('Utility', {'fields': ['url', 'slug', 'tags']}),
    ]

    # Display
    list_display = ('title', 'updated', 'url')

    # Filter
    list_filter = ['updated', 'tags']

    # Search
    search_fields = ['updated', 'title', 'subTitle', 'content', 'url', 'tags']


class ContactMeAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Information', {'fields': ['subject', 'name', 'email', 'phone', 'content']}),
    ]

    # Display
    list_display = ('subject', 'email', 'name', 'updated')

    # Filter
    list_filter = ['email', 'updated']

    # Search
    search_fields = ['subject', 'name', 'email', 'phone', 'content', 'updated']


admin.site.register(AboutMe, AboutMeAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Contact, ContactMeAdmin)
