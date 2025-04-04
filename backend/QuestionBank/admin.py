from django.contrib import admin # type: ignore
from .models import Topic, Question, QuestionChoice


class QuestionChoiceInline(admin.TabularInline):
    model = QuestionChoice
    extra = 4  # Show 4 empty choice fields by default
    fields = ["choice_text", "is_correct", "matching_text", "order"]


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ("name", "question_count")
    search_fields = ("name", "description")

    def question_count(self, obj):
        return obj.questions.count()

    question_count.short_description = "Number of Questions"


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "question_id",
        "subject",
        "question_type",
        "difficulty",
        "marks",
        "duration",
        "is_verified",
        "times_used",
        "created_at",
    )
    list_filter = ("question_type", "difficulty", "is_verified", "subject")
    search_fields = ("question_text", "subject")
    date_hierarchy = "created_at"
    filter_horizontal = ("topics",)
    readonly_fields = ("created_at", "updated_at", "times_used")

    fieldsets = (
        (
            "Question Information",
            {
                "fields": (
                    "subject",
                    "topics",
                    "question_type",
                    "question_text",
                    "difficulty",
                )
            },
        ),
        ("Assessment Details", {"fields": ("marks", "duration", "model_answer")}),
        (
            "Metadata",
            {
                "fields": (
                    "added_by",
                    "is_verified",
                    "times_used",
                    "created_at",
                    "updated_at",
                ),
                "classes": ("collapse",),
            },
        ),
    )

    inlines = [QuestionChoiceInline]

    def save_model(self, request, obj, form, change):
        if not change:  # If creating a new object
            obj.added_by = request.user
        super().save_model(request, obj, form, change)
