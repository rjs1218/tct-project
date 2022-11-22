from django.core.validators import FileExtensionValidator
from django.db import models


class FileModel(models.Model):
    # 이 방식은 파일명이 .txt만 만족하면 유효성 검사를 통과하므로 안전하지 않음
    file = models.FileField(
        upload_to="%Y%m/%d",
        validators=[FileExtensionValidator(allowed_extensions=["txt"])],
    )
    file_txt = models.TextField(blank=True)


class KeywordModel(models.Model):
    # 핵심 키워드
    keyword = models.CharField(max_length=20)
