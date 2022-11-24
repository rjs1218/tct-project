from django.contrib import admin

# Register your machinemodels here.
from django.contrib import admin

# Register your machinemodels here.
from .models import FileModel, KeywordModel, ImageModel


@admin.register(FileModel)
class FileModelAdmin(admin.ModelAdmin):
    pass


@admin.register(KeywordModel)
class KeywordModelAdmin(admin.ModelAdmin):
    pass


@admin.register(ImageModel)
class ImageModelAdmin(admin.ModelAdmin):
    pass
