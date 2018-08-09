from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):

    fieldsets = [
        ('Post', {'fields': ['title', 'author', 'language'
        , 'image', 'content']}),
        # ('Date information', {'fields': ['publish'],
        # 'classes': ['collapse']}),
        ('Date Information', {'fields': ['publish']}),
        ('View Information', {'fields': ['slug', 'tags']}),
    ]
    readonly_fields = ('updated',)
    list_display = ('title', 'publish', 'was_published_recently', 'author', 'updated', 'language')
    list_filter = ('publish', 'author', 'language')
    search_fields = ('title', 'author', 'content', 'tags')
