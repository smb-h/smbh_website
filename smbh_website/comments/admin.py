from django.contrib import admin
from .models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):

    fieldsets = [
        ('Information', {'fields': ['user', 'content', 'parent']}),
        ('Time', {'fields': ['timestamp',]}),
        # ('Utility', {'fields': ['content_type', 'id']}),
        ('Utility', {'fields': ['id',]}),
    ]
    readonly_fields = ('timestamp', 'user', 'id')

    # Display
    list_display = ('user', 'timestamp')

    # Filter
    list_filter = ['user', 'timestamp']

    # Search
    search_fields = ['timestamp', 'user', 'content']
