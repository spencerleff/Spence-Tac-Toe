# Generated by Django 3.2.7 on 2021-12-07 02:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0006_auto_20211207_0021'),
    ]

    operations = [
        migrations.AddField(
            model_name='suggestionmodel',
            name='image',
            field=models.ImageField(max_length=144, null=True, upload_to='uploads/%Y/%m/%d/'),
        ),
        migrations.AddField(
            model_name='suggestionmodel',
            name='image_description',
            field=models.CharField(max_length=240, null=True),
        ),
    ]
