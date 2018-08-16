from django.contrib import admin
from .models import Post, Comment



@admin.register(Post)
class PostAdmin(admin.ModelAdmin):

    fieldsets = [
        ('Post', {'fields': ['author', 'title', 'language'
        , 'image', 'content', 'read_time', 'tags', 'slug']}),
        # ('Date information', {'fields': ['publish'],
        # 'classes': ['collapse']}),
        ('Date Information', {'fields': ['draft', 'publish']}),
    ]
    readonly_fields = ('updated', 'slug', 'author', 'read_time')
    list_display = ('title', 'publish', 'was_published_recently', 'author', 'updated', 'language')
    list_filter = ('publish', 'author', 'language')
    search_fields = ('title', 'author__first_name', 'author__last_name', 'content', 'tags')

    def save_model(self, request, obj, form, change):
        obj.author = request.user
        super().save_model(request, obj, form, change)



@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):

    fieldsets = [
        ('Information', {'fields': ['user', 'content', 'parent']}),
        ('Time', {'fields': ['timestamp',]}),
        ('Utility', {'fields': ['content_type', 'object_id']}),
    ]
    # readonly_fields = ('timestamp', 'user', 'object_id')
    readonly_fields = ('timestamp',)

    # Display
    list_display = ('__str__', 'user', 'content_type', 'timestamp', 'id')

    # Filter
    list_filter = ['user', 'timestamp', 'content_type']

    # Search
    search_fields = ['timestamp', 'user', 'content', 'content_type']
