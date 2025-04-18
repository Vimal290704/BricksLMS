# api/urls.py
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("routes/", views.get_routes, name="routes"),
    path("user/", views.get_user_data, name="user_data"),
    path("users/", include("users.urls")),
    path("profiles/", include("profiles.urls")),
]
