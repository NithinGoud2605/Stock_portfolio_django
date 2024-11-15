from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from portfolio.views import ReactAppView

urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),
    
    # Authentication endpoints
    path('auth/', include([
        path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    ])),

    # Portfolio app API
    path('api/', include('portfolio.urls')),

    # Fallback for React frontend
    re_path(r'^.*$', ReactAppView.as_view()),
]
