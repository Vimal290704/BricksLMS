# Generated by Django 5.1.7 on 2025-04-05 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('QuestionBank', '0002_questionchoice_remove_choice_question_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='duration',
            field=models.PositiveIntegerField(help_text='Duration in minutes'),
        ),
    ]
