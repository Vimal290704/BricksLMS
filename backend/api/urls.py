from django.urls import path  # type: ignore
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (  # type: ignore
    TokenRefreshView,
)

urlpatterns = [
    path("", views.getRoutes),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
