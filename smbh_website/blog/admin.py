from django.contrib import admin
from .models import Post, Comment


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



@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):

    fieldsets = [
        ('Information', {'fields': ['user', 'content', 'parent']}),
        ('Time', {'fields': ['timestamp',]}),
        ('Utility', {'fields': ['content_type', 'object_id']}),
    ]
    readonly_fields = ('timestamp', 'user', 'object_id')

    # Display
    list_display = ('user', 'timestamp', 'content_type')

    # Filter
    list_filter = ['user', 'timestamp', 'content_type']

    # Search
    search_fields = ['timestamp', 'user', 'content']
