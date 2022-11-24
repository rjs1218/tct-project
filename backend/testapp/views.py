# from rest_framework.viewsets import ModelViewSet
#
# from .models import FileModel
# from .serializers import FileSerializer
#
#
# class FileViewSet(ModelViewSet):
#     queryset = FileModel.objects.all()
#     serializer_class = FileSerializer
#
#     def perform_create(self, serializer):
#         file_txt_encoding = self.request.FILES["file"].read()
#         file_txt_decoding = file_txt_encoding.decode("utf-8")
#
#         serializer.save(file_txt=file_txt_decoding)
