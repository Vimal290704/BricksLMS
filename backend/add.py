from django.utils import timezone # type: ignore
import random
import os
import django # type: ignore
import sys

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myapp.settings")
django.setup()

# Import your models after Django setup
from Quiz.models import Quiz, QuizQuestion, QuizAttempt, QuizResponse
from QuestionBank.models import Question, QuestionChoice
from users.models import CustomUser  # Import your custom user model


def create_sample_quiz(admin_email=None):
    """
    Creates a sample quiz with questions and a student attempt with responses

    Args:
        admin_email (str, optional): Email of the admin user to use as quiz creator.
                                     If None, will use the first admin user found.
    """
    # Get the admin user
    try:
        if admin_email:
            admin = CustomUser.objects.get(email=admin_email, is_superuser=True)
        else:
            # Get first admin user
            admin = CustomUser.objects.filter(is_superuser=True).first()

        if not admin:
            print("No admin user found. Please create an admin user first.")
            return

        print(f"Using admin user: {admin.email} ({admin.user_name})")
    except CustomUser.DoesNotExist:
        print(f"Admin user with email '{admin_email}' not found or is not a superuser.")
        return

    # Create a sample quiz
    quiz = Quiz.objects.create(
        title="Sample Python Quiz",
        description="A quiz covering Python programming basics",
        created_by=admin,
        time_limit=30,  # 30 minutes
        shuffle_questions=True,
        show_answers=True,
        passing_score=70,
    )
    print(f"Created quiz: {quiz.title}")

    # Get existing questions or create some if none exist
    questions = Question.objects.all()
    if not questions.exists():
        print("No questions found in the database. Please add questions first.")
        return

    # Add questions to the quiz (use up to 5 questions)
    question_count = min(5, questions.count())
    selected_questions = random.sample(list(questions), question_count)

    for i, question in enumerate(selected_questions):
        QuizQuestion.objects.create(quiz=quiz, question=question, order=i)
        print(f"Added question: {question} to quiz")

    # Create a student if doesn't exist
    student, created = CustomUser.objects.get_or_create(
        email="student1@example.com",
        defaults={
            "user_name": "student1",
            "is_staff": False,
            "is_superuser": False,
            "is_active": True,
            "role": CustomUser.STUDENT,
            "school_id": "STU001",
            "first_name": "Student",
            "last_name": "One",
        },
    )
    if created:
        student.set_password("studentpass")
        student.save()
        print(f"Created student user: {student.email}")

    # Create a quiz attempt
    quiz_attempt = QuizAttempt.objects.create(
        quiz=quiz,
        student=student,
        started_at=timezone.now(),
        completed_at=timezone.now(),  # Completed immediately for this example
        score=0,  # Will be updated after responses are added
    )
    print(f"Created quiz attempt for student: {student.email}")

    # Create responses for each question in the quiz
    total_score = 0

    for quiz_question in quiz.quiz_questions.all():
        question = quiz_question.question
        response = QuizResponse.objects.create(
            attempt=quiz_attempt,
            quiz_question=quiz_question,
            marks_awarded=0,  # Will be updated based on correctness
            is_correct=False,  # Will be updated based on choices
        )

        # Handle response based on question type
        if hasattr(question, "question_type") and (
            question.question_type == "MCQ" or question.question_type == "MRQ"
        ):
            # Get choices for this question
            choices = QuestionChoice.objects.filter(question=question)
            if choices.exists():
                # For demo purposes, randomly select choices
                if question.question_type == "MCQ":
                    # Single choice question
                    selected_choice = random.choice(choices)
                    response.selected_choices.add(selected_choice)

                    # Check if the selected choice is correct
                    if (
                        hasattr(selected_choice, "is_correct")
                        and selected_choice.is_correct
                    ):
                        response.is_correct = True
                        response.marks_awarded = quiz_question.marks
                        total_score += quiz_question.marks
                else:
                    # Multiple choice question
                    num_to_select = random.randint(1, choices.count())
                    selected_choices = random.sample(list(choices), num_to_select)
                    for choice in selected_choices:
                        response.selected_choices.add(choice)

                    # Simple correctness check - all correct choices must be selected
                    if hasattr(choices.first(), "is_correct"):
                        correct_choices = choices.filter(is_correct=True)
                        selected_correct = response.selected_choices.filter(
                            is_correct=True
                        )

                        if (
                            selected_correct.count() == correct_choices.count()
                            and not response.selected_choices.filter(
                                is_correct=False
                            ).exists()
                        ):
                            response.is_correct = True
                            response.marks_awarded = quiz_question.marks
                            total_score += quiz_question.marks

        elif hasattr(question, "question_type") and question.question_type == "TEXT":
            # For text questions, put a simple response
            response.text_response = "Sample text answer for this question"

            # Assume 50% chance of being correct for demo
            if random.random() > 0.5:
                response.is_correct = True
                response.marks_awarded = quiz_question.marks
                total_score += quiz_question.marks

        elif hasattr(question, "question_type") and question.question_type == "MATCH":
            # Create a sample matching response
            # This assumes the matching pairs are stored in the question data
            response.matching_response = {"1": "A", "2": "B", "3": "C"}

            # Assume 50% chance of being correct for demo
            if random.random() > 0.5:
                response.is_correct = True
                response.marks_awarded = quiz_question.marks
                total_score += quiz_question.marks

        response.save()
        print(f"Created response for question: {question}")

    # Update the overall score
    quiz_attempt.score = total_score
    quiz_attempt.save()

    print(f"Quiz attempt completed with score: {quiz_attempt.score}/{quiz.total_marks}")
    print(f"Percentage: {quiz_attempt.percentage_score:.2f}%")
    print(f"Pass status: {'Passed' if quiz_attempt.passed else 'Failed'}")


if __name__ == "__main__":
    # Check if email was provided as command line argument
    admin_email = None
    if len(sys.argv) > 1:
        admin_email = sys.argv[1]

    create_sample_quiz(admin_email)
    print("Script completed successfully!")
