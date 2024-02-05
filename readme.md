# Home Page Explained

The Fear and Greed Index is designed to provide a better understanding of the current market sentiment, assisting you in making more informed decisions. The index ranges from 0 to 100, where zero signifies "Extreme Fear," and 100 indicates "Extreme Greed." Updates are made every hour, and the index on this website is calculated using the following API: [Fear and Greed Index API](https://api.alternative.me/fng/).

Images of the Fear and Greed Index are also available, sourced from the same website using the following APIs:

- Fear Index Image API: [Fear Index Image API](https://alternative.me/images/fng/crypto-fear-and-greed-index-2020-5-13.png)
- Greed Index Image API: [Greed Index Image API](https://alternative.me/images/fng/crypto-fear-and-greed-index-2020-5-13.png)

The Crypto Fear and Greed Index provide real-time information about the standing of the crypto market. Here are details about the API:

- **API:** [Alternative.me](https://api.alternative.me/)
- **Endpoint:** /fng/
- **Method:** GET
- **Description:** Get the latest data of the Fear and Greed Index.
- **Optional Parameters:**
  - `limit, [int]`: Limit the number of returned results. Default is '1'; use '0' for all available data.
  - `format, [string]`: Choose between 'json' or 'csv' for data formatting.
  - `date_format, [string]`: Choose date formatting for the United States, China/Korea, or the rest of the world.

JSON format response example:

```json
{
    "name": "Fear and Greed Index",
    "data": [
        {
            "value": "40",
            "value_classification": "Fear",
            "timestamp": "1551157200",
            "time_until_update": "68499"
        },
        {
            "value": "47",
            "value_classification": "Neutral",
            "timestamp": "1551070800"
        }
    ],
    "metadata": {
        "error": null
    }
}
```

# Listings Page Explained

The Listings API provides an overview of all accessible cryptocurrencies. It serves as a comprehensive list of available crypto currencies. Users can use the provided ID to obtain more detailed information about a specific crypto currency by using the ticker endpoint.

When the user clicks on the "Fetch Crypto Data" button, the system retrieves all available cryptocurrencies listed along with their corresponding IDs. Subsequently, a chart is generated to visually represent the available cryptos and their associated IDs on the same page. This chart aids users in quickly checking the listings IDs of various cryptocurrencies.

## API Information

- **Endpoint:** /listings/
- **Method:** GET
- **Description:** Overview of all available cryptocurrencies. Use the returned ID to retrieve more data on a specific crypto currency through the ticker endpoint.
- **Example URL:** [Listings API](https://api.alternative.me/v2/listings/)
- **Example Response:**

```json
{
    "data": [
        {
            "id": "1",
            "name": "Bitcoin",
            "symbol": "BTC",
            "website_slug": "bitcoin"
        },
        {
            "id": "2",
            "name": "Litecoin",
            "symbol": "LTC",
            "website_slug": "litecoin"
        },
        // ... (more cryptocurrency entries)
    ],
    "metadata": {
        "timestamp": 1537430627,
        "num_cryptocurrencies": 935,
        "error": null
    }
}
```

# Ticker Page Explained

The Ticker API allows users to retrieve data for multiple coins by entering their symbols in the text field, separated by space. The data is then retrieved and displayed in both a chart and as plain text. For example, if the user enters "BTC XRP NEAR SOL," the data for these coins will be retrieved and displayed in the chart and as a table.

## API Information

- **Endpoint:** /ticker/
- **Method:** GET
- **Description:** Coin and token prices are updated every 5 minutes.
- **Optional Parameters:**
  - `limit, [int]`: Limit the number of returned results. The default value is 100; use '0' for all available data.
  - `start, [int]`: Sets the first element to be fetched. All requests are ordered by Marketcap, meaning the order of returned elements can change over time.
  - `convert, [string]`: In addition to USD values, converted values can be delivered in the requested currency (e.g., 'USD', 'EUR', 'GBP', 'RUB', 'JPY', 'CAD', 'KRW', 'PLN'). It is also possible to convert to other cryptocurrencies like 'BTC', 'ETH', 'XRP', 'LTC', and 'BCH'.
  - `structure, [string]`: Sets the structure of the data field as either array or name-value pair style. Possible values are 'dictionary' for name-value pair style and 'array' for array style.
  - `sort, [string]`: Returned results can be sorted by various criteria. Default sorting is by rank. Additional sorting options include 'price', 'percent_change_1h', 'percent_change_7d', 'circulating_supply', and 'name'.

**Example URL:** [Ticker API](https://api.alternative.me/v2/ticker/)

**JSON Format Response Example:**

```json
{
    "data": [
        {
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "website_slug": "bitcoin",
            "rank": 1,
            "circulating_supply": 17277612,
            "total_supply": 17277612,
            "max_supply": 21000000,
            "quotes": {
                "USD": {
                    "price": 6418.85820382,
                    "volume_24h": 4263700490.8,
                    "market_cap": 110902541529,
                    "percentage_change_1h": 0.1,
                    "percentage_change_24h": 0.84,
                    "percentage_change_7d": -0.23
                },
                "EUR": {
                    "price": 5490.04942172725,
                    "volume_24h": 3646743029.78124,
                    "market_cap": 94854943769.7537,
                    "percentage_change_1h": 0.1,
                    "percentage_change_24h": 0.84,
                    "percentage_change_7d": -0.23
                }
            },
            "last_updated": 1537428143
        },
        // ... (more cryptocurrency entries)
    ],
    "metadata": {
        "timestamp": 1537428090,
        "num_cryptocurrencies": 935,
        "error": null
    }
}
```