from django.db import models # type: ignore
from django.db.models.signals import post_save # type: ignore
from django.dispatch import receiver # type: ignore
from django.conf import settings # type: ignore


class TeacherProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="teacher_profile",
        limit_choices_to={"role": "teacher"},
    )

    specialization = models.CharField(max_length=100, blank=True)
    qualification = models.CharField(max_length=200, blank=True)
    bio = models.TextField(blank=True)
    join_date = models.DateField(null=True, blank=True)
    employee_id = models.CharField(max_length=50, blank=True)
    department = models.CharField(max_length=100, blank=True)
    office_location = models.CharField(max_length=100, blank=True)
    office_hours = models.CharField(max_length=200, blank=True)
    alternate_email = models.EmailField(blank=True)

    class Meta:
        verbose_name = "Teacher Profile"
        verbose_name_plural = "Teacher Profiles"

    def __str__(self):
        return f"Teacher: {self.user.get_full_name() or self.user.user_name}"


class StudentProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="student_profile",
        limit_choices_to={"role": "student"},
    )
    grade_level = models.CharField(max_length=50, blank=True)
    admission_year = models.PositiveIntegerField(null=True, blank=True)
    roll_number = models.CharField(max_length=50, blank=True)
    section = models.CharField(max_length=20, blank=True)
    guardian_name = models.CharField(max_length=100, blank=True)
    guardian_phone = models.CharField(max_length=15, blank=True)
    guardian_email = models.EmailField(blank=True)
    guardian_relationship = models.CharField(max_length=50, blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)

    class Meta:
        verbose_name = "Student Profile"
        verbose_name_plural = "Student Profiles"

    def __str__(self):
        return f"Student: {self.user.get_full_name() or self.user.user_name}"


class AdminProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="admin_profile",
        limit_choices_to={"role": "admin"},
    )
    designation = models.CharField(max_length=100, blank=True)
    admin_level = models.CharField(max_length=50, blank=True)
    responsibilities = models.TextField(blank=True)
    office_phone = models.CharField(max_length=15, blank=True)
    emergency_contact = models.CharField(max_length=15, blank=True)

    class Meta:
        verbose_name = "Admin Profile"
        verbose_name_plural = "Admin Profiles"

    def __str__(self):
        return f"Admin: {self.user.get_full_name() or self.user.user_name}"


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == "teacher":
            TeacherProfile.objects.create(user=instance)
        elif instance.role == "student":
            StudentProfile.objects.create(user=instance)
        elif instance.role == "admin":
            AdminProfile.objects.create(user=instance)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    if instance.role == "teacher":
        if hasattr(instance, "teacher_profile"):
            instance.teacher_profile.save()
        else:
            TeacherProfile.objects.create(user=instance)
    elif instance.role == "student":
        if hasattr(instance, "student_profile"):
            instance.student_profile.save()
        else:
            StudentProfile.objects.create(user=instance)
    elif instance.role == "admin":
        if hasattr(instance, "admin_profile"):
            instance.admin_profile.save()
        else:
            AdminProfile.objects.create(user=instance)
