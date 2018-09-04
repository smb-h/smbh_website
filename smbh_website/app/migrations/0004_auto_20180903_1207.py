# Generated by Django 2.1 on 2018-09-03 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_auto_20180820_1413'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='name',
        ),
        migrations.AddField(
            model_name='contact',
            name='first_name',
            field=models.CharField(default='', max_length=100, verbose_name='First Name'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='contact',
            name='last_name',
            field=models.CharField(default='null', max_length=100, verbose_name='Last Name'),
            preserve_default=False,
        ),
    ]