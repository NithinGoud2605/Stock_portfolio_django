from rest_framework.authentication import SessionAuthentication

class CsrfExemptSessionAuthentication(SessionAuthentication):
    """
    A custom SessionAuthentication class that disables CSRF enforcement.
    """
    def enforce_csrf(self, request):
        return  # Skip CSRF check
