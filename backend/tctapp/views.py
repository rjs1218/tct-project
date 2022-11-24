from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import FileModel, KeywordModel, ImageModel
from .serializers import FileSerializer, KeywordSerializer, ImageSerializer


class FileViewSet(ModelViewSet):
    queryset = FileModel.objects.all()
    serializer_class = FileSerializer

    def perform_create(self, serializer):
        # 텍스트 파일 읽어서 디코딩하기
        file_txt_encoding = self.request.FILES["file"].read()
        file_txt_decoding = file_txt_encoding.decode("utf-8")

        serializer.save(file_txt=file_txt_decoding)


class KeywordViewSet(ModelViewSet):
    queryset = KeywordModel.objects.all()
    serializer_class = KeywordSerializer

    # 해당 파일의 핵심 키워드 3개 조회
    @action(detail=False, methods=["GET"])
    def get_keyword(self, request):
        file_obj = FileModel.objects.latest("id")
        queryset = KeywordModel.objects.filter(file_id=file_obj)
        serializer = KeywordSerializer(queryset, many=True)
        return Response(serializer.data)


class ImageViewSet(ModelViewSet):
    queryset = ImageModel.objects.all()
    serializer_class = ImageSerializer

    # 해당 키워드 주요 색상 RGB 값
    @action(detail=False, methods=["GET"])
    def get_rgb(self, request):
        file_obj = FileModel.objects.latest("id")
        keyword_objs = KeywordModel.objects.filter(file_id=file_obj)
        queryset = []

        for keyword_obj in keyword_objs:
            queryset.append(ImageModel.objects.get(keyword_id=keyword_obj))

        serializer = ImageSerializer(queryset, many=True)
        return Response(serializer.data)
