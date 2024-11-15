from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import PortfolioItem, Stock
from .serializers import PortfolioItemSerializer, PortfolioItemCreateSerializer, PortfolioItemUpdateSerializer, StockSerializer, UserSerializer
from django.contrib.auth.models import User

class PortfolioViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioItem.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == 'create':
            return PortfolioItemCreateSerializer
        elif self.action in ['create','update', 'partial_update']:
            return PortfolioItemUpdateSerializer
        else:
            return PortfolioItemSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def summary(self, request):
        user = request.user
        portfolio_items = PortfolioItem.objects.filter(user=user)
        total_value = 0
        top_performers = []

        for item in portfolio_items:
            current_price = fetch_stock_data(item.stock.symbol) or item.purchase_price
            position_value = current_price * item.quantity
            total_value += position_value
            top_performers.append({
                'name': item.stock.name,
                'value': f"${position_value:,.2f}"
            })

        # Sort top performers by value descending
        top_performers = sorted(top_performers, key=lambda x: float(x['value'].replace('$', '').replace(',', '')), reverse=True)

        response_data = {
            'name': user.username,
            'portfolio_value': total_value,
            'top_performers': top_performers[:3],  # Top 3 performers
        }
        return Response(response_data)

class StockViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        query = request.query_params.get('q', '')
        stocks = Stock.objects.filter(symbol__icontains=query)[:10]
        serializer = self.get_serializer(stocks, many=True)
        return Response(serializer.data)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
