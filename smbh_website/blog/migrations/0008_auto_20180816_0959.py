# Generated by Django 2.1 on 2018-08-16 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_post_read_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='read_time',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Read Time'),
        ),
    ]