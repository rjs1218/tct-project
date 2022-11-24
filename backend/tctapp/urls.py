from django.urls import path, include

# from .views import upload_file
from rest_framework.routers import DefaultRouter

from . import views


router_file = DefaultRouter()
router_file.register("file-upload", views.FileViewSet)

router_keyword = DefaultRouter()
router_keyword.register("keyword", views.KeywordViewSet)

router_image = DefaultRouter()
router_image.register("image", views.ImageViewSet)

urlpatterns = [
    path("", include(router_file.urls)),
    path("", include(router_keyword.urls)),
    path("", include(router_image.urls)),
]
