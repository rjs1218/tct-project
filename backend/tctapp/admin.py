from django.contrib import admin

# Register your machinemodels here.
from django.contrib import admin

# Register your machinemodels here.
from .models import FileModel, KeywordModel


@admin.register(FileModel)
class FileModelAdmin(admin.ModelAdmin):
    pass


@admin.register(KeywordModel)
class KeywordModelAdmin(admin.ModelAdmin):
    pass
