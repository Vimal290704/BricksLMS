from django.contrib import admin  # type: ignore
from django.contrib.auth.admin import UserAdmin  # type: ignore
from .models import CustomUser, Avatar


class UserAdminConfig(UserAdmin):
    search_fields = (
        "email",
        "user_name",
        "first_name",
    )
    list_filter = (
        "email",
        "user_name",
        "first_name",
        "is_active",
        "is_staff",
        "role",
        "gender",
    )
    ordering = ("-created_at",)
    list_display = (
        "email",
        "user_name",
        "first_name",
        "last_name",
        "is_active",
        "is_staff",
        "role",
        "gender",
        "created_at",
    )
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "user_name",
                    "password",
                )
            },
        ),
        (
            "Personal Information",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "role",
                    "gender",
                    "school_id",
                    "phone",
                    "avatar",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "user_name", "password1", "password2"),
            },
        ),
        (
            "Personal Information",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "role",
                    "gender",
                    "school_id",
                    "phone",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                )
            },
        ),
    )


class AvatarAdmin(admin.ModelAdmin):
    list_display = ("avatar_id", "image_url", "uploaded_at")
    search_fields = ("avatar_id",)
    readonly_fields = ("avatar_id", "uploaded_at")


admin.site.register(CustomUser, UserAdminConfig)
admin.site.register(Avatar, AvatarAdmin)
