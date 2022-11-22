from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import FileModel, KeywordModel
from .serializers import FileSerializer, KeywordSerializer

from .keybert import pre_doc


class FileViewSet(ModelViewSet):
    queryset = FileModel.objects.all()
    serializer_class = FileSerializer

    def perform_create(self, serializer):
        # 텍스트 파일 읽어서 디코딩하기
        file_txt_encoding = self.request.FILES["file"].read()
        file_txt_decoding = file_txt_encoding.decode("utf-8")

        serializer.save(file_txt=file_txt_decoding)

    @action(detail=False, methods=["POST"])
    def keyword(self, request):
        # 핵심 키워드 저장
        file_id = FileModel.objects.latest("file")
        file_txt = file_id.file_txt
        keyword = pre_doc(file_txt)
        k = KeywordModel(keyword=keyword)
        k.save()

        return Response(status=status.HTTP_201_CREATED)


class KeywordViewSet(ModelViewSet):
    queryset = KeywordModel.objects.all()
    serializer_class = KeywordSerializer
