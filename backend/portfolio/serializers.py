from rest_framework import serializers
from .models import PortfolioItem, Stock
from django.contrib.auth.models import User


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'


class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = ['id', 'stock', 'quantity', 'purchase_price']  # Include fields for editing

    def update(self, instance, validated_data):
        """
        Update portfolio item with new values.
        """
        instance.stock = validated_data.get('stock', instance.stock)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.purchase_price = validated_data.get('purchase_price', instance.purchase_price)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    portfolio_items = PortfolioItemSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'portfolio_items']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user


class PortfolioItemCreateSerializer(serializers.ModelSerializer):
    stock_symbol = serializers.CharField(write_only=True)

    class Meta:
        model = PortfolioItem
        fields = ['stock_symbol', 'quantity', 'purchase_price']

    def create(self, validated_data):
        stock_symbol = validated_data.pop('stock_symbol')
        stock, created = Stock.objects.get_or_create(symbol=stock_symbol.upper())
        return PortfolioItem.objects.create(stock=stock, user=self.context['request'].user, **validated_data)

def create(self, validated_data):
    """
    Create PortfolioItem with validated stock.
    """
    stock = validated_data.pop('stock')  # Remove 'stock' symbol from validated data
    user = self.context['request'].user
    validated_data.pop('user', None)  # Remove 'user' from validated data if it exists
    return PortfolioItem.objects.create(user=user, stock=stock, **validated_data)
