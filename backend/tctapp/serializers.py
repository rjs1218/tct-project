from rest_framework import serializers

from .models import FileModel, KeywordModel


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileModel
        fields = "__all__"


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeywordModel
        fields = "__all__"
