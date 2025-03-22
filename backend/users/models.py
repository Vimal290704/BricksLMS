from django.db import models  # type: ignore
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin  # type: ignore
import uuid


class Avatar(models.Model):
    avatar_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    image_url = models.URLField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Avatar {self.avatar_id}"


class CustomUserManager(BaseUserManager):
    def create_user(self, email, user_name, password=None, **other_fields):
        if not email:
            raise ValueError("Email should not be empty")
        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name, **other_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, user_name, password=None, **other_fields):
        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_active", True)
        return self.create_user(email, user_name, password, **other_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    ADMIN = "admin"
    TEACHER = "teacher"
    STUDENT = "student"

    ROLE_CHOICES = [
        (ADMIN, "Admin"),
        (TEACHER, "Teacher"),
        (STUDENT, "Student"),
    ]

    MALE = "Male"
    FEMALE = "Female"
    OTHERS = "Others"

    GENDER_CHOICES = [
        (MALE, "Male"),
        (FEMALE, "Female"),
        (OTHERS, "Others"),
    ]

    user_name = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default=STUDENT,
    )
    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        default=MALE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    school_id = models.CharField(max_length=20)
    avatar = models.OneToOneField(
        Avatar, on_delete=models.SET_NULL, null=True, blank=True
    )
    phone = models.CharField(max_length=10, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["user_name"]

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        return self.first_name

    def get_avatar(self):
        if self.avatar:
            return {
                "avatar_id": self.avatar.avatar_id,
                "image_url": self.avatar.image_url,
            }
        return None
