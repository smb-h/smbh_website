# Generated by Django 2.1 on 2018-08-09 16:31

import blog.models
import ckeditor_uploader.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import taggit.managers


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('taggit', '0002_auto_20150616_2121'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80, verbose_name='Title')),
                ('image', models.ImageField(blank=True, null=True, upload_to=blog.models.user_directory_path, verbose_name='Image')),
                ('language', models.CharField(choices=[('fa', 'Persian'), ('en', 'English')], default='fa', max_length=50, verbose_name='Language')),
                ('content', ckeditor_uploader.fields.RichTextUploadingField(verbose_name='Content')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('publish', models.DateTimeField(verbose_name='Publish')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated')),
                ('slug', models.SlugField(allow_unicode=True, unique=True, verbose_name='Slug')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Author')),
                ('tags', taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags')),
            ],
            options={
                'verbose_name': 'Post',
                'verbose_name_plural': 'Posts',
                'ordering': ['-updated', '-created'],
            },
        ),
    ]