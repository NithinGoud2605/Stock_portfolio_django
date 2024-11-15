import yfinance as yf

def fetch_stock_data(symbol):
    """
    Fetch stock data for the given symbol using yfinance.
    
    Args:
        symbol (str): The stock symbol (e.g., "AAPL" for Apple Inc.).
    
    Returns:
        dict: A dictionary containing stock data, or an error message.
    """
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period='1d')  # Fetch daily stock data

        if not data.empty:
            last_close = data['Close'].iloc[-1]
            prev_close = data['Close'].iloc[-2] if len(data) > 1 else last_close
            change = last_close - prev_close
            percent_change = (change / prev_close * 100) if prev_close else 0

            return {
                "symbol": symbol,
                "price": last_close,
                "change": change,
                "percent_change": percent_change,
                "market_time": data.index[-1].isoformat(),
            }
        else:
            return {"error": f"No data available for symbol: {symbol}"}

    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}
