from django.db import models  # type: ignore
from django.conf import settings  # type: ignore
from django.core.exceptions import ValidationError  # type: ignore


class Topic(models.Model):
    """Topics for categorizing questions"""

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Question(models.Model):
    """Public questions available for all students to use in quizzes"""

    class QuestionType(models.TextChoices):
        MULTIPLE_CHOICE = "MCQ", "Multiple Choice"
        TRUE_FALSE = "TF", "True/False"
        SHORT_ANSWER = "SHORT", "Short Answer"
        ESSAY = "ESSAY", "Essay"
        MATCHING = "MATCH", "Matching"

    class Difficulty(models.TextChoices):
        EASY = "EASY", "Easy"
        MEDIUM = "MEDIUM", "Medium"
        HARD = "HARD", "Hard"
        VERY_HARD = "VERY_HARD", "Very Hard"

    question_id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=100, db_index=True)
    topics = models.ManyToManyField(Topic, related_name="questions")
    question_type = models.CharField(
        max_length=10,
        choices=QuestionType.choices,
        default=QuestionType.MULTIPLE_CHOICE,
        db_index=True,
    )
    question_text = models.TextField()
    marks = models.PositiveIntegerField(default=1)
    duration = models.PositiveIntegerField(help_text="Duration in seconds")
    difficulty = models.CharField(
        max_length=10,
        choices=Difficulty.choices,
        default=Difficulty.MEDIUM,
        db_index=True,
    )

    # For short answer and essay questions
    model_answer = models.TextField(
        blank=True, help_text="Model answer or grading criteria"
    )

    added_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="contributed_questions",
    )
    is_verified = models.BooleanField(
        default=False, help_text="Verified by admin/teacher", db_index=True
    )
    times_used = models.PositiveIntegerField(
        default=0, help_text="Number of times used in quizzes"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Q{self.question_id}: {self.question_text[:50]}"

    def clean(self):
        """Custom validation for questions based on type"""
        super().clean()

        if self.question_type in [
            self.QuestionType.MULTIPLE_CHOICE,
            self.QuestionType.TRUE_FALSE,
            self.QuestionType.MATCHING,
        ]:
            # Check if question has been saved (has an ID) before validating choices
            if self.question_id and not self.choices.exists():
                raise ValidationError(
                    "This question type requires at least one choice."
                )

            # For multiple choice and true/false, ensure at least one correct answer
            if self.question_id and self.question_type in [
                self.QuestionType.MULTIPLE_CHOICE,
                self.QuestionType.TRUE_FALSE,
            ]:
                if not self.choices.filter(is_correct=True).exists():
                    raise ValidationError(
                        "At least one choice must be marked as correct."
                    )

            # For true/false, ensure exactly two choices
            if self.question_type == self.QuestionType.TRUE_FALSE and self.question_id:
                if self.choices.count() != 2:
                    raise ValidationError(
                        "True/False questions must have exactly two choices."
                    )

    class Meta:
        verbose_name = "Question"
        verbose_name_plural = "Questions"
        indexes = [
            models.Index(fields=["subject", "difficulty"]),
            models.Index(fields=["question_type", "difficulty"]),
        ]


class QuestionChoice(models.Model):
    """Choices for questions"""

    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="choices"
    )
    choice_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    matching_text = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="The matching pair text for matching questions",
    )

    order = models.PositiveIntegerField(default=0, help_text="Order of display")

    class Meta:
        verbose_name = "Public Question Choice"
        verbose_name_plural = "Public Question Choices"
        ordering = ["order"]

    def __str__(self):
        return self.choice_text

    def clean(self):
        """Validate choice based on question type"""
        super().clean()

        if (
            self.question.question_type == Question.QuestionType.MATCHING
            and not self.matching_text
        ):
            raise ValidationError(
                "Matching questions require matching text for each choice."
            )

        if (
            self.question.question_type != Question.QuestionType.MATCHING
            and self.matching_text
        ):
            raise ValidationError(
                "Matching text should only be used for matching questions."
            )
