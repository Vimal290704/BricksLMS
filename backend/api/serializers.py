from rest_framework import serializers # type: ignore
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # type: ignore
from users.models import CustomUser
from users.serializer import AvatarSerializer
from profiles.serializer import (
    TeacherProfileSerializer,
    StudentProfileSerializer,
    AdminProfileSerializer,
)


class UserDetailSerializer(serializers.ModelSerializer):
    avatar = AvatarSerializer(read_only=True)
    teacher_profile = TeacherProfileSerializer(read_only=True)
    student_profile = StudentProfileSerializer(read_only=True)
    admin_profile = AdminProfileSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "user_name",
            "email",
            "first_name",
            "last_name",
            "date_of_birth",
            "is_active",
            "is_staff",
            "role",
            "gender",
            "last_login",
            "created_at",
            "school_id",
            "phone",
            "avatar",
            "teacher_profile",
            "student_profile",
            "admin_profile",
        ]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["user_id"] = user.id
        token["role"] = user.role
        token["username"] = user.user_name

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = UserDetailSerializer(self.user).data
        return data
