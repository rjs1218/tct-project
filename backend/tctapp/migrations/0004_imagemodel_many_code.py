# Generated by Django 4.1.3 on 2022-11-24 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tctapp", "0003_remove_imagemodel_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="imagemodel",
            name="many_code",
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]