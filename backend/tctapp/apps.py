from django.apps import AppConfig


class TctappConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "tctapp"

    def ready(self):
        import tctapp.signals
