from django.http import JsonResponse  # type: ignore
from rest_framework.response import Response  # type: ignore
from rest_framework.decorators import api_view  # type: ignore
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer  # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView  # type: ignore


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.user_name
        token["email"] = user.email
        token["phone"] = user.phone
        token["SchoolID"] = user.school_id
        token["firstname"] = user.first_name
        token["lastname"] = user.last_name
        token["date_of_birth"] = str(user.date_of_birth) if user.date_of_birth else None
        token["id"] = user.id
        token["role"] = user.role
        token["gender"] = user.gender
        token["is_staff"] = user.is_staff
        token["is_active"] = user.is_active
        token["created_at"] = str(user.created_at) if user.created_at else None
        token["last_login"] = str(user.last_login) if user.last_login else None
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/token",
        "/api/token/refresh",
    ]
    return Response(routes)
