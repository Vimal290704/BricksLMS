from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"teacher", views.TeacherProfileViewSet)
router.register(r"student", views.StudentProfileViewSet)
router.register(r"admin", views.AdminProfileViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
