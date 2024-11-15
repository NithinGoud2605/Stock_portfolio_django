from django.db import models
from django.contrib.auth.models import User

class Stock(models.Model):
    symbol = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    sector = models.CharField(max_length=50)
    industry = models.CharField(max_length=50)

    def __str__(self):
        return self.symbol

class PortfolioItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='portfolio_items')
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.stock.symbol}"
