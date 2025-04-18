from django.db import models # type: ignore
from users.models import CustomUser
from QuestionBank.models import QuestionBank, QuestionChoice


# Create your models here.
class Assignment(models.Model):
    STATUS_CHOICES = (
        ("draft", "Draft"),
        ("published", "Published"),
        ("closed", "Closed"),
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    # subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='assignments')
    created_by = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="created_assignments"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    due_date = models.DateTimeField()
    total_marks = models.PositiveIntegerField(default=0)
    assigned_to = models.ManyToManyField(
        CustomUser, related_name="assigned_assignments", blank=True
    )

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            super().save(*args, **kwargs)
        else:
            self.total_marks = sum(question.marks for question in self.questions.all())
            super().save(*args, **kwargs)


class AssignmentQuestion(models.Model):
    assignment = models.ForeignKey(
        Assignment, on_delete=models.CASCADE, related_name="questions"
    )
    question = models.ForeignKey(
        QuestionBank, on_delete=models.CASCADE, related_name="assignments"
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        unique_together = ["assignment", "question"]

    def __str__(self):
        return f"{self.assignment.title} - Question {self.order}"


class StudentAttempt(models.Model):
    STATUS_CHOICES = (
        ("in_progress", "In Progress"),
        ("submitted", "Submitted"),
        ("graded", "Graded"),
    )

    student = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="assignment_attempts"
    )
    assignment = models.ForeignKey(
        Assignment, on_delete=models.CASCADE, related_name="attempts"
    )
    started_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="in_progress"
    )
    score = models.FloatField(null=True, blank=True)

    class Meta:
        unique_together = ["student", "assignment"]

    def __str__(self):
        return f"{self.student.user_name} - {self.assignment.title}"


class QuestionAttempt(models.Model):
    attempt = models.ForeignKey(
        StudentAttempt, on_delete=models.CASCADE, related_name="question_attempts"
    )
    question = models.ForeignKey(
        QuestionBank, on_delete=models.CASCADE, related_name="student_attempts"
    )
    answer_text = models.TextField(blank=True)
    selected_options = models.ManyToManyField(QuestionChoice, blank=True)
    marks_obtained = models.FloatField(null=True, blank=True)
    feedback = models.TextField(blank=True)

    def __str__(self):
        return (
            f"{self.attempt.student.user_name} - {self.question.question_text[:30]}..."
        )
