from django.db import models  # type: ignore
from django.conf import settings  # type: ignore
from QuestionBank.models import Question


class Quiz(models.Model):
    """A collection of questions with a title and description"""

    quiz_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    # Created by whom
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="created_quizzes",
    )

    time_limit = models.PositiveIntegerField(
        help_text="Time limit in minutes", null=True, blank=True
    )

    shuffle_questions = models.BooleanField(default=False)

    show_answers = models.BooleanField(
        default=True, help_text="Show correct answers after completion"
    )
    passing_score = models.PositiveIntegerField(
        default=70, help_text="Minimum percentage required to pass"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    attempt_count = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Quiz"
        verbose_name_plural = "Quizzes"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    @property
    def total_marks(self):
        return sum(
            quiz_question.question.marks for quiz_question in self.quiz_questions.all()
        )

    @property
    def total_questions(self):
        return self.quiz_questions.count()


class QuizQuestion(models.Model):
    quiz = models.ForeignKey(
        Quiz, on_delete=models.CASCADE, related_name="quiz_questions"
    )
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="used_in_quizzes"
    )
    order = models.PositiveIntegerField(default=0)

    marks_override = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Override default marks for this question in this quiz",
    )

    class Meta:
        ordering = ["order"]
        unique_together = ["quiz", "question"]

    def __str__(self):
        return f"Q{self.order+1} in {self.quiz.title}"

    @property
    def marks(self):
        return (
            self.marks_override
            if self.marks_override is not None
            else self.question.marks
        )


class QuizAttempt(models.Model):

    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="attempts")
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="quiz_attempts"
    )

    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    score = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-started_at"]

    def __str__(self):
        status = "Completed" if self.completed_at else "In Progress"
        return f"{self.student.user_name}'s attempt on {self.quiz.title} ({status})"

    @property
    def duration(self):
        if not self.completed_at:
            return None
        delta = self.completed_at - self.started_at
        return delta.total_seconds() / 60

    @property
    def percentage_score(self):
        if self.quiz.total_marks == 0:
            return 0
        return (self.score / self.quiz.total_marks) * 100

    @property
    def passed(self):
        return self.percentage_score >= self.quiz.passing_score


class QuizResponse(models.Model):
    attempt = models.ForeignKey(
        QuizAttempt, on_delete=models.CASCADE, related_name="responses"
    )
    quiz_question = models.ForeignKey(
        QuizQuestion, on_delete=models.CASCADE, related_name="responses"
    )

    selected_choices = models.ManyToManyField(
        "QuestionBank.QuestionChoice", blank=True, related_name="quiz_responses"
    )

    text_response = models.TextField(blank=True)

    marks_awarded = models.PositiveIntegerField(default=0)
    is_correct = models.BooleanField(default=False)
    feedback = models.TextField(blank=True)

    matching_response = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"Response to Q{self.quiz_question.order+1} in {self.attempt}"
