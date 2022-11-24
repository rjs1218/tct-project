from django.core.validators import FileExtensionValidator
from django.db import models


class FileModel(models.Model):
    # 이 방식은 파일명이 .txt만 만족하면 유효성 검사를 통과하므로 안전하지 않음
    file = models.FileField(
        upload_to="txt/%Y%m/%d",
        validators=[FileExtensionValidator(allowed_extensions=["txt"])],
    )
    file_txt = models.TextField(blank=True)


class KeywordModel(models.Model):
    file_id = models.ForeignKey(FileModel, on_delete=models.CASCADE)
    # 핵심 키워드
    keyword = models.CharField(max_length=100)


class ImageModel(models.Model):
    keyword_id = models.ForeignKey(KeywordModel, on_delete=models.CASCADE)
    keyword = models.CharField(max_length=100)
    # 키워드 주요 색상 RGB 값: 1개
    code = models.CharField(max_length=20)
    # 키워드 주요 색상 RGB 값: 3개(list)
    many_code = models.CharField(max_length=100)
