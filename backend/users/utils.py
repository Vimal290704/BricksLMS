# users/utils.py
from django.apps import apps


def create_user_with_profile(
    email, user_name, password, role, first_name="", last_name="", **profile_data
):
    CustomUser = apps.get_model("users", "CustomUser")
    user = CustomUser.objects.create_user(
        email=email,
        user_name=user_name,
        password=password,
        role=role,
        first_name=first_name,
        last_name=last_name,
    )
    profile = user.get_profile()

    if profile:
        for field, value in profile_data.items():
            if hasattr(profile, field):
                setattr(profile, field, value)

        profile.save()

    return user
