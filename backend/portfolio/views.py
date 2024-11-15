from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import CreateAPIView
from django.views.generic import View
from django.http import HttpResponse
import os

from .models import PortfolioItem, Stock
from .serializers import (
    PortfolioItemSerializer,
    PortfolioItemCreateSerializer,
    StockSerializer,
    UserSerializer,
    UserRegistrationSerializer,
)
from django.contrib.auth.models import User


class PortfolioViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioItem.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == 'create':
            return PortfolioItemCreateSerializer
        return PortfolioItemSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def summary(self, request):
        user = request.user
        portfolio_items = PortfolioItem.objects.filter(user=user)
        total_value = sum(item.quantity * item.purchase_price for item in portfolio_items)

        top_performers = [
            {
                'name': item.stock.name,
                'symbol': item.stock.symbol,
                'quantity': item.quantity,
                'value': f"${item.quantity * item.purchase_price:.2f}"
            }
            for item in portfolio_items
        ]

        response_data = {
            'name': user.username,
            'portfolio_value': total_value,
            'top_performers': sorted(top_performers, key=lambda x: float(x['value'][1:]), reverse=True)[:3]
        }
        return Response(response_data)

class PortfolioItemViewSet(ModelViewSet):
    queryset = PortfolioItem.objects.all()
    serializer_class = PortfolioItemSerializer

    def get_queryset(self):
        """
        Ensure the user can only view/edit their own portfolio items.
        """
        return PortfolioItem.objects.filter(user=self.request.user)

class StockViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)


class RegisterUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer


class ReactAppView(View):
    def get(self, request, *args, **kwargs):
        try:
            with open(os.path.join(os.path.dirname(__file__), '../frontend/build/index.html')) as file:
                return HttpResponse(file.read())
        except FileNotFoundError:
            return HttpResponse(
                "React app build files not found. Please build the React app and place the files in the correct directory.",
                status=501,
            )
