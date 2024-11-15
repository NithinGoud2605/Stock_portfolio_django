from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PortfolioViewSet, StockViewSet, RegisterUserView, PortfolioItemViewSet, UserViewSet

router = DefaultRouter()
router.register(r'portfolios', PortfolioViewSet, basename='portfolios')
router.register(r'stocks', StockViewSet, basename='stocks')
router.register(r'user', UserViewSet, basename='user')
router.register(r'portfolio-items', PortfolioItemViewSet, basename='portfolio-items')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterUserView.as_view(), name='register'),
]
