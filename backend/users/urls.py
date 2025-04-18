from django.urls import path, include # type: ignore
from rest_framework.routers import DefaultRouter # type: ignore
from . import views

router = DefaultRouter()
router.register(r"", views.UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("me/", views.get_current_user, name="current-user"),
]
