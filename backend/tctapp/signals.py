from django.db.models.signals import post_save
from django.dispatch import receiver

from .color import crawling, color, color_rgb, folder_delete

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
    # FIXME 이미지 크롤링 20개까지 가능 --> 스크롤 다운 넣으면 더 많은 이미지 크롤링 가능
    # FIXME 한 키워드 당 이미지 크롤링 20개 기준 56초~1분 --> 더 빠르게 못할까?
    crawling(keyword, 20)
    print("키워드(" + keyword + ") 이미지 크롤링 성공!")

    color(1, keyword)
    # FIXME 추출한 색상이 여러 개라도 색상이 비슷하면 RGB 값은 하나 밖에 안 나옴
    # FIXME 그래서 many_code는 1 ~ 5개의 RGB 값이 저장됨
    color(5, keyword)
    code = color_rgb(1)
    many_code = color_rgb(5)
    ImageModel.objects.create(
        keyword_id=keyword_obj, keyword=keyword, code=code, many_code=many_code
    )
    print("키워드(" + keyword + ") RGB 값 저장 완료!")
    # 키워드 주요 색상 RGB 값을 뽑아낼 때 만든 이미지 폴더 삭제
    folder_delete(keyword)
