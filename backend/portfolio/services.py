import requests

def fetch_stock_data(symbol):
    """
    Fetch stock data for the given symbol from Yahoo Finance API.
    
    Args:
        symbol (str): The stock symbol (e.g., "AAPL" for Apple Inc.).
    
    Returns:
        dict: A dictionary containing stock data, or an error message.
    """
    base_url = 'https://query1.finance.yahoo.com/v7/finance/quote'
    params = {
        'symbols': symbol,
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # Raise HTTPError for bad responses
        data = response.json()
        
        # Validate response structure
        quote_response = data.get("quoteResponse", {})
        results = quote_response.get("result", [])
        
        if results:
            stock_info = results[0]
            return {
                "symbol": stock_info.get("symbol"),
                "price": stock_info.get("regularMarketPrice"),
                "change": stock_info.get("regularMarketChange"),
                "percent_change": stock_info.get("regularMarketChangePercent"),
                "market_time": stock_info.get("regularMarketTime"),
            }
        else:
            return {"error": f"No data found for symbol: {symbol}"}
    
    except requests.RequestException as e:
        return {"error": f"Network or connection error: {str(e)}"}
    except ValueError as e:
        return {"error": f"Invalid response: {str(e)}"}
    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}
