# profiles/admin.py
from django.contrib import admin
from .models import TeacherProfile, StudentProfile, AdminProfile


class TeacherProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "specialization", "department"]
    search_fields = ["user__email", "user__user_name"]


class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "grade_level", "roll_number"]
    search_fields = ["user__email", "user__user_name"]


class AdminProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "designation", "admin_level"]
    search_fields = ["user__email", "user__user_name"]


admin.site.register(TeacherProfile, TeacherProfileAdmin)
admin.site.register(StudentProfile, StudentProfileAdmin)
admin.site.register(AdminProfile, AdminProfileAdmin)
