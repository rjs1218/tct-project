# Generated by Django 4.1.3 on 2022-11-23 11:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("tctapp", "0002_keywordmodel_file_id_alter_filemodel_file_imagemodel"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="imagemodel",
            name="image",
        ),
    ]
