from django.test import TestCase

# Create your tests here.


from QuestionBank.models import Question
from django.db.models import Prefetch
questions = Question.objects.prefetch_related('topics').all()
for question in questions:
    print(f"\nQuestion ID: {question.question_id}")
    print(f"Subject: {question.subject}")
    print(f"Type: {question.question_type}")
    print(f"Difficulty: {question.difficulty}")
    print(f"Question: {question.question_text}")
    topics = ", ".join([topic.name for topic in question.topics.all()])
    print(f"Topics: {topics if topics else 'No topics assigned'}")
    print("-" * 50)