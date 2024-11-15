from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PortfolioViewSet, StockViewSet, UserViewSet

router = DefaultRouter()
router.register(r'portfolio', PortfolioViewSet, basename='portfolio')
router.register(r'stocks', StockViewSet, basename='stocks')
router.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]
