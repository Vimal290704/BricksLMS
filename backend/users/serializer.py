from rest_framework import serializers
from .models import CustomUser, Avatar


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = ["avatar_id", "image_url", "uploaded_at"]


class UserSerializer(serializers.ModelSerializer):
    avatar = AvatarSerializer(read_only=True)

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
        ]
        read_only_fields = ["id", "is_active", "is_staff", "last_login", "created_at"]
