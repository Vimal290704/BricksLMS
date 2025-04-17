from django.contrib import admin # type: ignore
from .models import Quiz, QuizQuestion, QuizAttempt, QuizResponse


class QuizQuestionInline(admin.TabularInline):
    model = QuizQuestion
    extra = 1
    fields = ["question", "order", "marks_override"]
    raw_id_fields = ["question"]
    ordering = ["order"]


class QuizResponseInline(admin.TabularInline):
    model = QuizResponse
    extra = 0
    fields = ["quiz_question", "is_correct", "marks_awarded"]
    readonly_fields = ["quiz_question", "is_correct", "marks_awarded"]
    can_delete = False
    max_num = 0
    show_change_link = True


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "created_by",
        "total_questions",
        "total_marks",
        "passing_score",
        "attempt_count",
        "created_at",
    )
    list_filter = ("created_by", "created_at")
    search_fields = ("title", "description", "created_by__username")
    date_hierarchy = "created_at"
    readonly_fields = (
        "created_at",
        "updated_at",
        "attempt_count",
        "total_questions",
        "total_marks",
    )

    fieldsets = (
        ("Quiz Information", {"fields": ("title", "description", "created_by")}),
        (
            "Settings",
            {
                "fields": (
                    "time_limit",
                    "shuffle_questions",
                    "show_answers",
                    "passing_score",
                )
            },
        ),
        (
            "Statistics",
            {
                "fields": ("attempt_count", "total_questions", "total_marks"),
                "classes": ("collapse",),
            },
        ),
        (
            "Metadata",
            {
                "fields": ("created_at", "updated_at"),
                "classes": ("collapse",),
            },
        ),
    )

    inlines = [QuizQuestionInline]

    def total_questions(self, obj):
        return obj.total_questions

    def total_marks(self, obj):
        return obj.total_marks

    total_questions.short_description = "Questions"
    total_marks.short_description = "Total Marks"


@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = (
        "__str__",
        "quiz",
        "student",
        "score",
        "percentage_score",
        "passed",
        "started_at",
        "completed_at",
        "duration",
    )
    list_filter = ("quiz", "student", "started_at", "completed_at")
    search_fields = ("quiz__title", "student__username")
    date_hierarchy = "started_at"
    readonly_fields = (
        "quiz",
        "student",
        "started_at",
        "completed_at",
        "score",
        "percentage_score",
        "passed",
        "duration",
    )

    fieldsets = (
        ("Attempt Information", {"fields": ("quiz", "student")}),
        ("Results", {"fields": ("score", "percentage_score", "passed")}),
        ("Timing", {"fields": ("started_at", "completed_at", "duration")}),
    )

    inlines = [QuizResponseInline]

    def percentage_score(self, obj):
        return f"{obj.percentage_score:.1f}%"

    def duration(self, obj):
        if obj.duration is None:
            return "In Progress"
        return f"{obj.duration:.1f} min"

    def passed(self, obj):
        if obj.completed_at is None:
            return None
        return "Yes" if obj.passed else "No"

    percentage_score.short_description = "Score %"
    passed.boolean = True


@admin.register(QuizResponse)
class QuizResponseAdmin(admin.ModelAdmin):
    list_display = ("attempt", "quiz_question", "is_correct", "marks_awarded")
    list_filter = ("is_correct", "attempt__quiz", "attempt__student")
    search_fields = (
        "attempt__quiz__title",
        "attempt__student__username",
        "quiz_question__question__question_text",
    )
    readonly_fields = (
        "attempt",
        "quiz_question",
        "selected_choices",
        "text_response",
        "matching_response",
    )

    fieldsets = (
        ("Response Information", {"fields": ("attempt", "quiz_question")}),
        (
            "Answer",
            {"fields": ("selected_choices", "text_response", "matching_response")},
        ),
        ("Grading", {"fields": ("is_correct", "marks_awarded", "feedback")}),
    )

    def has_add_permission(self, request):
        return False

    filter_horizontal = ("selected_choices",)
