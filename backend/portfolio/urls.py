from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import PortfolioItemViewSet, StockViewSet,UserRegistrationView

router = DefaultRouter()
router.register(r'portfolio', PortfolioItemViewSet, basename='portfolio')
router.register(r'stocks', StockViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='register'),
]
