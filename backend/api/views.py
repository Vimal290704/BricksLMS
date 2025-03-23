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
        token["date_of_birth"] = user.date_of_birth
        token["id"] = user.id
        token["role"] = user.role
        token["gender"] = user.gender
        token["is_staff"] = user.is_staff
        token["is_active"] = user.is_active
        token["created_at"] = user.created_at
        token["last_login"] = user.last_login
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
