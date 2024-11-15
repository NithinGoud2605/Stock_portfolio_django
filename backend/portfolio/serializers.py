from rest_framework import serializers
from .models import PortfolioItem, Stock
from django.contrib.auth.models import User

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class PortfolioItemSerializer(serializers.ModelSerializer):
    stock = StockSerializer()

    class Meta:
        model = PortfolioItem
        fields = '__all__'

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
    class Meta:
        model = PortfolioItem
        fields = ['stock', 'quantity', 'purchase_price']

    def create(self, validated_data):
        user = self.context['request'].user
        return PortfolioItem.objects.create(user=user, **validated_data)

class PortfolioItemUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = ['quantity', 'purchase_price']