# users/admin.py
from django.contrib import admin
from django.db import models
from django import forms
from django.utils.html import format_html
from .models import CustomUser, Avatar
from profiles.models import TeacherProfile, StudentProfile, AdminProfile


class CustomUserAdminForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = "__all__"
        widgets = {
            "password": forms.PasswordInput(),
        }

    # Teacher fields
    specialization = forms.CharField(required=False, max_length=100)
    qualification = forms.CharField(required=False, max_length=200)
    join_date = forms.DateField(
        required=False, widget=forms.DateInput(attrs={"type": "date"})
    )
    employee_id = forms.CharField(required=False, max_length=50)
    department = forms.CharField(required=False, max_length=100)

    # Student fields
    grade_level = forms.CharField(required=False, max_length=50)
    admission_year = forms.IntegerField(required=False)
    roll_number = forms.CharField(required=False, max_length=50)
    guardian_name = forms.CharField(required=False, max_length=100)
    guardian_phone = forms.CharField(required=False, max_length=15)

    # Admin fields
    designation = forms.CharField(required=False, max_length=100)
    admin_level = forms.CharField(required=False, max_length=50)
    responsibilities = forms.CharField(required=False, widget=forms.Textarea)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # If we're editing an existing user, populate profile fields
        if self.instance and self.instance.pk:
            if hasattr(self.instance, "teacher_profile"):
                profile = self.instance.teacher_profile
                self.fields["specialization"].initial = profile.specialization
                self.fields["qualification"].initial = profile.qualification
                self.fields["join_date"].initial = profile.join_date
                self.fields["employee_id"].initial = profile.employee_id
                self.fields["department"].initial = profile.department
            elif hasattr(self.instance, "student_profile"):
                profile = self.instance.student_profile
                self.fields["grade_level"].initial = profile.grade_level
                self.fields["admission_year"].initial = profile.admission_year
                self.fields["roll_number"].initial = profile.roll_number
                self.fields["guardian_name"].initial = profile.guardian_name
                self.fields["guardian_phone"].initial = profile.guardian_phone
            elif hasattr(self.instance, "admin_profile"):
                profile = self.instance.admin_profile
                self.fields["designation"].initial = profile.designation
                self.fields["admin_level"].initial = profile.admin_level
                self.fields["responsibilities"].initial = profile.responsibilities

    def save(self, commit=True):
        user = super().save(commit=commit)
        if commit:
            # Save the profile data based on user role
            if user.role == "teacher":
                profile, created = TeacherProfile.objects.get_or_create(user=user)
                profile.specialization = self.cleaned_data.get("specialization", "")
                profile.qualification = self.cleaned_data.get("qualification", "")
                profile.join_date = self.cleaned_data.get("join_date")
                profile.employee_id = self.cleaned_data.get("employee_id", "")
                profile.department = self.cleaned_data.get("department", "")
                profile.save()
            elif user.role == "student":
                profile, created = StudentProfile.objects.get_or_create(user=user)
                profile.grade_level = self.cleaned_data.get("grade_level", "")
                profile.admission_year = self.cleaned_data.get("admission_year")
                profile.roll_number = self.cleaned_data.get("roll_number", "")
                profile.guardian_name = self.cleaned_data.get("guardian_name", "")
                profile.guardian_phone = self.cleaned_data.get("guardian_phone", "")
                profile.save()
            elif user.role == "admin":
                profile, created = AdminProfile.objects.get_or_create(user=user)
                profile.designation = self.cleaned_data.get("designation", "")
                profile.admin_level = self.cleaned_data.get("admin_level", "")
                profile.responsibilities = self.cleaned_data.get("responsibilities", "")
                profile.save()
        return user


class CustomUserAdmin(admin.ModelAdmin):
    form = CustomUserAdminForm
    list_display = ["email", "user_name", "role", "is_active", "created_at"]
    list_filter = ["role", "is_active", "gender"]
    search_fields = ["email", "user_name", "first_name", "last_name"]

    fieldsets = (
        (
            "User Information",
            {
                "fields": (
                    "email",
                    "user_name",
                    "password",
                    "first_name",
                    "last_name",
                    "date_of_birth",
                    "gender",
                    "role",
                    "phone",
                    "school_id",
                    "is_active",
                    "is_staff",
                )
            },
        ),
        (
            "Teacher Profile",
            {
                "classes": ("teacher-profile",),
                "fields": (
                    "specialization",
                    "qualification",
                    "join_date",
                    "employee_id",
                    "department",
                ),
            },
        ),
        (
            "Student Profile",
            {
                "classes": ("student-profile",),
                "fields": (
                    "grade_level",
                    "admission_year",
                    "roll_number",
                    "guardian_name",
                    "guardian_phone",
                ),
            },
        ),
        (
            "Admin Profile",
            {
                "classes": ("admin-profile",),
                "fields": ("designation", "admin_level", "responsibilities"),
            },
        ),
    )


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Avatar)
