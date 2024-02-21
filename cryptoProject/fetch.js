function listings() {

}
document.getElementById('fetchData').addEventListener('click', function () {
    const coinSymbol = document.getElementById('coinSymbol').value.toUpperCase();

    // Fetch all listings from the server
    fetch(`http://localhost:3000/listings`)
        .then(response => response.json())
        .then(data => {
            // Find the specific listing with the entered symbol
            const coinData = data.data.find(coin => coin.symbol === coinSymbol);

            if (!coinData) {
                console.error('Coin not found');
                return;
            }

            const table = document.getElementById('dataTable');
            const ctx = document.getElementById('barChart').getContext('2d');

            // Clear the table
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Data will be inserted here -->
                </tbody>
            `;

            // Insert the coin data into the table
            const row = table.insertRow();
            const nameCell = row.insertCell();
            const symbolCell = row.insertCell();
            nameCell.textContent = coinData.name;
            symbolCell.textContent = coinData.symbol;

            // Create the chart
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [coinData.name],
                    datasets: [{
                        label: 'Example Dataset',
                        data: [coinData.quote.USD.price], // Replace this with the actual numerical data you want to display
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error:', error));
});