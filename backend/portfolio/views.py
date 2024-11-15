from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import PortfolioItem, Stock
from .serializers import PortfolioItemSerializer,UserRegistrationSerializer, StockSerializer

class PortfolioItemViewSet(viewsets.ModelViewSet):
    serializer_class = PortfolioItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PortfolioItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

from rest_framework import viewsets
from rest_framework.response import Response
from .models import Stock
from .serializers import StockSerializer
from .services import fetch_stock_data  # Assume you created this function for external API calls

class StockViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    def retrieve(self, request, *args, **kwargs):
        symbol = kwargs.get('pk')
        try:
            stock_data = fetch_stock_data(symbol)
            return Response(stock_data)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)