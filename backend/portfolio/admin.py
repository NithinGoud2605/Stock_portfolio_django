from django.contrib import admin
from .models import Stock, PortfolioItem

@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('symbol', 'name', 'sector', 'industry')
    search_fields = ('symbol', 'name', 'sector')

@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'stock', 'quantity', 'purchase_price', 'purchase_date')
    list_filter = ('purchase_date',)
    search_fields = ('user__username', 'stock__symbol')
