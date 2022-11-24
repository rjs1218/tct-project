from django.db.models.signals import post_save
from django.dispatch import receiver

from .color import crawling, key_color, key_color_many, folder_delete

from .keybert import pre_doc
from .models import FileModel, KeywordModel, ImageModel


# 파일 업로드 시 핵심 키워드 생성 및 저장
@receiver(post_save, sender=FileModel)
def create_keyword(sender, instance, created, **kwargs):
    if created:
        file_obj = FileModel.objects.latest("id")
        print("해당 file 오브젝트에서 핵심 키워드를 추출합니다: " + str(file_obj))
        file_txt = file_obj.file_txt
        keyword_list = pre_doc(file_txt)
        for keyword in keyword_list:
            print("키워드(" + keyword + ") 추출 성공.")
            KeywordModel.objects.create(file_id=file_obj, keyword=keyword)


# 핵심 키워드 생성 후 저장시 이미지 크롤링
@receiver(post_save, sender=KeywordModel)
def image_crawling(sender, instance, created, **kwargs):
    keyword_obj = KeywordModel.objects.latest("id")

    keyword = keyword_obj.keyword
    crawling(keyword, keyword_obj.id)
    print("키워드(" + keyword + ") 이미지 크롤링 성공!")

    color = key_color(keyword, keyword_obj.id)
    many_color = key_color_many(keyword, keyword_obj.id)
    ImageModel.objects.create(
        keyword_id=keyword_obj, keyword=keyword, code=color, many_code=many_color
    )
    print("키워드(" + keyword + ") RGB 값 저장 완료!")
    # 키워드 주요 색상 RGB 값을 뽑아낼 때 만든 이미지 폴더 삭제
    folder_delete(keyword, keyword_obj.id)
