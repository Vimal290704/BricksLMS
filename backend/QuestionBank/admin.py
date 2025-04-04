from django.contrib import admin # type: ignore
from .models import Topic, Question, QuestionChoice


class QuestionChoiceInline(admin.TabularInline):
    model = QuestionChoice
    extra = 4  
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
        "get_topics",
        "is_verified",
        "times_used",
        "created_at",
    )
    list_filter = ("question_type", "difficulty", "is_verified", "subject", "topics")
    search_fields = ("question_text", "subject", "topics__name")
    date_hierarchy = "created_at"
    filter_horizontal = ("topics",)
    readonly_fields = ("created_at", "updated_at", "times_used")

    fieldsets = (
        (
            "Question Information",
            {
                "fields": (
                    "subject",
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

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.prefetch_related("topics")

    def get_topics(self, obj):
        return ", ".join([topic.name for topic in obj.topics.all()])

    get_topics.short_description = "Topics"

    def save_model(self, request, obj, form, change):
        if not change: 
            obj.added_by = request.user
        super().save_model(request, obj, form, change)
