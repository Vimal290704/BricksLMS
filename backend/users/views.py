from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import CustomUser, Avatar
from .serializer import UserSerializer, AvatarSerializer


class UserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_staff:
            return True
        if (
            view.action in ["retrieve", "update", "partial_update"]
            and request.user.is_authenticated
        ):
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        if view.action in ["retrieve", "update", "partial_update"]:
            return obj == request.user
        return False


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [UserPermission]

    @action(detail=False, methods=["get"])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    from api.serializers import UserDetailSerializer

    serializer = UserDetailSerializer(request.user)
    return Response(serializer.data)
