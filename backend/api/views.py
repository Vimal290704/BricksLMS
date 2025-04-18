from rest_framework.decorators import api_view, permission_classes  # type: ignore
from rest_framework.permissions import IsAuthenticated  # type: ignore
from rest_framework.response import Response  # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView  # type: ignore
from .serializers import MyTokenObtainPairSerializer, UserDetailSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def get_routes(request):
    routes = [
        "/api/token/",
        "/api/token/refresh/",
        "/api/user/",
        "/api/users/",
        "/api/profiles/teacher/",
        "/api/profiles/student/",
        "/api/profiles/admin/",
    ]
    return Response(routes)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    serializer = UserDetailSerializer(request.user)
    return Response(serializer.data)
