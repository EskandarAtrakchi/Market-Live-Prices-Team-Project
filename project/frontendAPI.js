/**
 * Fetches and loads fear and greed index data from the specified URL.
 * Displays the data in a div element with the id "fearAndGreedDiv".
 * @param {string} url - The URL to fetch the data from.
 * @returns {Promise<void>} - A promise that resolves when the data is loaded and displayed.
 */
//===================================

//function number 1 fetching data for fear and greed index 

//===================================
async function loadFearAndGreedData(url) {
    var div = "<div>";
    var response = await fetch(url);//wait for the API to respond
    var data = await response.json();// wait for the API to return data
  
    div += "<div>Name: " + data["name"] + "</div>";
  
    if (data["data"] && data["data"].length > 0) {//if statement to check if there is data
      for (let i = 0; i < data["data"].length; i++) { // for loop to iterate through the data
        div += "<div>Value: " + data["data"][i]["value"] + "</div>";//display the data in the div
        div += "<div>Classification: " + data["data"][i]["value_classification"] + "</div>";// display the data in the div
        div += "<div>Timestamp: " + new Date(data["data"][i]["timestamp"] * 1000).toLocaleString() + "</div>";// display the data in the div
  
        if (data["data"][i]["time_until_update"]) {// if statement to check if there is data for time until update
            div += "<div>Minutes Until Next Update: " + parseInt(data["data"][i]["time_until_update"] / 60) + "</div>";//display the Date in the div
            //The data retrieved is divided on 60 to get the minutes instead of the seconds
            //the data retrieved is parsed so that there is no decimal
            
        }
  
        div += "<hr>";//adding hr
      }
      
    } else {//otherwise 
      div += "<div>No data available</div>";
    }

    div += "</div>";
    //attach the div to element #fearAndGreedDiv
    document.getElementById("fearAndGreedDiv").innerHTML = div;
  }
  
//===================================

//function number 2 fetching data by listings API along with a bar chart

//===================================

/**
 * Loads crypto data based on user input and displays it in a chart.
 * @returns {Promise<void>} A promise that resolves when the crypto data is loaded and displayed.
 */
  async function loadCryptoData() {
    //grab the element search Input
    var searchInput = document.getElementById('searchInput');
    //then get its value 
    var userInput = searchInput.value;
    if (userInput === '') {//then if statement if the search input is empty 
        //if it is then alert this 
        alert('Please input crypto coins or tokens to retrieve the data.\nExample: bitcoin, ethereum, dogecoin, etc.');
    } else {//otherwise 
        try {
            // Fetch data from server-side proxy
            const response = await fetch('http://localhost:3001/listings/');
            const data = await response.json();//await for the data JSON format 

            // Process and display data as needed
            //come back here to see if there are any issues 
            console.log(data.data);

            // Get user input from the search bar
            const searchInput = document.getElementById('searchInput');
            //if the user switch their input to caps and lowers an error or no data will be retrieved 
            //just change it to lower case to retrieve the data despite users type case (lower or upper) 
            const userInput = searchInput.value.toLowerCase();

            // Example: Render data in the cryptoDataDiv, filtered by user input
            const cryptoDataDiv = document.getElementById('cryptoDataDiv');
            cryptoDataDiv.innerHTML = ''; // Clear existing content

            //creating arrays for names and IDs
            const cryptoNames = [];
            const cryptoIds = [];

            data.data.forEach(crypto => {
                // Check if the cryptocurrency name includes the user input
                if (crypto.name.toLowerCase().includes(userInput)) {
                    //only push the data to the arrays if the condition is true 
                    cryptoNames.push(crypto.name);//push to cryptoNames
                    cryptoIds.push(crypto.id);//push to cryptoNames

                    const cryptoInfo = document.createElement('div');//creating a div 
                    cryptoInfo.innerHTML = `<strong>${crypto.name}</strong> (${crypto.symbol}) - ID: ${crypto.id}`;
                    cryptoDataDiv.appendChild(cryptoInfo);
                }
            });

            // Check if there is any matching data
            if (cryptoNames.length === 0) {//if statement that there is no data pushed in the array that named cryptoNames
                //if the condition is true then alert 
                alert('No data found for the entered crypto coin or token.');
            } else {//otherwise
                // Get the existing chart instance
                const existingChart = Chart.getChart('cryptoChart');

                //there is an error coming out always is because the chart canvas is in use so the user cannot retrive more data if they needed to, the chart has to be removed and a new one gets created 
                // If a chart exists, destroy it before creating a new one
                if (existingChart) {
                    existingChart.destroy();//destroy(); method is called 
                }

                // Create a new bar chart
                const ctx = document.getElementById('cryptoChart').getContext('2d');
                const myChart = new Chart(ctx, {
                    type: 'bar', //the type of the chart 
                    data: {//the data required for the bar chart 
                        labels: cryptoNames,
                        datasets: [{
                            label: 'Crypto IDs',
                            data: cryptoIds,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {//start the y axis from 0
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

        } catch (error) {//catch
            alert.error('Error fetching data: ' + error.toString());//alert it 
        }
    }
}

//===================================

//function number 3 fetch, load and display ticker data along with a bar chart

//===================================

/**
 * Loads ticker data based on user input and displays it in a table and chart.
 * @returns {Promise<void>} A promise that resolves when the ticker data is loaded and displayed.
 */
async function loadTickerData() {
    //grab the element search Input
    var searchInput = document.getElementById('searchInput');
    //then get its value 
    var userInput = searchInput.value;
    if (userInput === '') {//then if statement if the search input is empty 
        //if it is then alert this 
        alert('Please input crypto coins or tokens to retrieve the data.\nExample: BTC, SOL, XRP, NEAR etc.');
    } else {//otherwise 
        try {

            //inform the user about what the data retrieved 
            document.getElementById('tickerPricesTextInfo').innerHTML = 'This is the retrieved data, you can request multiple coins or tokens by separating them with a space.\nExample; XRP NEAR BTC ETH';
            document.getElementById('tickerChartInfo').innerHTML = 'Data retrieved from the API is represented here in a bar chart.';

            const response = await fetch('http://localhost:3001/ticker/');// Fetch data from server-side proxy
            const result = await response.json();// JSON response from server-side proxy
            const data = result && result.length ? result : [];// JSON response from server-side proxy and data length is not specified here 

            console.log(result);
            // Get user input from the search bar
            const searchInput = document.getElementById('searchInput');
            //if the user switch their input to caps and lowers an error or no data will be retrieved 
            //just change it to lower case to retrieve the data despite users type case (lower or upper) 
            const userInput = searchInput.value.toLowerCase();

            //make the tickerDataDiv empty if there are data represented already 
            const tickerDataDiv = document.getElementById('tickerDataDiv');
            tickerDataDiv.innerHTML = '';

            // Split the user input into an array of symbols
            const symbols = userInput.split(' ');

            // Create a table
            const table = document.createElement('table');
            table.border = '1';

            // Create table header
            const headerRow = table.insertRow();
            //specifying what content should the header contain
            headerRow.innerHTML = '<th>Coin</th><th>Symbol</th><th>ID</th><th>Price USD</th><th>24h Volume USD</th><th>Market Cap USD</th><th>Percent Change (1h)</th><th>Percent Change (24h)</th><th>Percent Change (7d)</th><th>Last Updated</th>';

            //to achieve retrieving data successfully I need to 
            /*
            1. Iterates over an array of `symbols`.
            2. Filters `data` array to find objects where the lowercase `symbol` property matches the current `symbol`.
            3. Stores the filtered data in the `filteredData` variable for each symbol.
            */
            symbols.forEach(symbol => {
                const filteredData = data.filter(crypto => crypto.symbol.toLowerCase() === symbol);

                if (filteredData.length > 0) {//if there are any symbols in the data that matches the user input
                    // Create a table row
                    const row = table.insertRow();

                    // Populate table cells
                    row.innerHTML = `
                        <td>${filteredData[0].name}</td>
                        <td>${filteredData[0].symbol}</td>
                        <td>${filteredData[0].id}</td>
                        <td>${filteredData[0].price_usd}</td>
                        <td>${filteredData[0]['24h_volume_usd']}</td>
                        <td>${filteredData[0].market_cap_usd}</td>
                        <td>${filteredData[0].percent_change_1h}</td>
                        <td>${filteredData[0].percent_change_24h}</td>
                        <td>${filteredData[0].percent_change_7d}</td>
                        <td>${filteredData[0].last_updated}</td>
                    `;

                    //finally attache the row to the table
                    table.appendChild(row);
                } else {//otherwise 
                    //there is no symbol that matches the user input
                    alert(`No data found for ${symbol}`);
                    // Create a table row for no data found
                    const noDataRow = table.insertRow();
                    const noDataCell = noDataRow.insertCell(0);
                    noDataCell.colSpan = 10;
                    noDataCell.innerHTML = `No data found for ${symbol}`;
                }
            });

            tickerDataDiv.appendChild(table);

            // Get the existing chart instance
            const existingChart = Chart.getChart('tickerChart');

            // If a chart exists, destroy it before creating a new one
            //the same as I did in listing API method above 
            if (existingChart) {
                existingChart.destroy();
            }

            // Create a new bar chart with a logarithmic scale for the y-axis
            //source: https://stackoverflow.com/questions/60558243/chart-js-logarithmic-x-axis 
            const ctxTicker = document.getElementById('tickerChart').getContext('2d');
            const tickerChart = new Chart(ctxTicker, {
                type: 'bar',
                data: {
                    labels: symbols,
                    datasets: symbols.map(symbol => {
                        const filteredData = data.filter(crypto => crypto.symbol.toLowerCase() === symbol);
                        return {
                            label: `${symbol} Price (USD)`,
                            data: filteredData.length > 0 ? [parseFloat(filteredData[0].price_usd)] : [0],
                            backgroundColor: 'rgba(75, 192, 192, 0.7)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        };
                    })
                },
                options: {
                    scales: {
                        y: {
                            type: 'logarithmic',
                            position: 'left',
                            beginAtZero: true,
                        }
                    }
                }
            });
        } catch (error) {
            alert('Error fetching data: ' + error.toString());
        }
    }
}


