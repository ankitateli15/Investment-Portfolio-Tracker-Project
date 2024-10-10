
document.addEventListener("DOMContentLoaded", () => {
    const investmentList = document.getElementById('investment-list');
    const totalPortfolioValue = document.getElementById('total-portfolio-value');
    const portfolioChartCtx = document.getElementById('portfolio-chart');

    let investments = [];
    let portfolioChart;

    // Function to add an investment
    window.addInvestment = function() {
        const assetName = document.getElementById('asset-name').value;
        const amountInvested = parseFloat(document.getElementById('amount-invested').value);
        const currentValue = parseFloat(document.getElementById('current-value').value);

        if (assetName && amountInvested && currentValue) {
            const newInvestment = { assetName, amountInvested, currentValue };
            investments.push(newInvestment);
            renderInvestments();
            updatePortfolioValue();
            updateChart();

            // Clear form fields
            document.getElementById('asset-name').value = '';
            document.getElementById('amount-invested').value = '';
            document.getElementById('current-value').value = '';
        } else {
            alert("Please fill in all fields");
        }
    }

    // Function to render the list of investments
    function renderInvestments() {
        investmentList.innerHTML = '';
        investments.forEach((investment, index) => {
            const percentageChange = ((investment.currentValue - investment.amountInvested) / investment.amountInvested * 100).toFixed(2);
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${investment.assetName}: Invested $${investment.amountInvested}, Current $${investment.currentValue}, Change: ${percentageChange}%</span>
                <button onclick="removeInvestment(${index})">Remove</button>
            `;
            investmentList.appendChild(li);
        });
    }

    // Function to update the total portfolio value
    function updatePortfolioValue() {
        const totalValue = investments.reduce((sum, investment) => sum + investment.currentValue, 0);
        totalPortfolioValue.innerText = `Total Portfolio Value: $${totalValue.toFixed(2)}`;
    }

    // Function to remove an investment
    window.removeInvestment = function(index) {
        investments.splice(index, 1);
        renderInvestments();
        updatePortfolioValue();
        updateChart();
    };

    // Function to update the portfolio distribution chart
    function updateChart() {
        const labels = investments.map(inv => inv.assetName);
        const data = investments.map(inv => inv.currentValue);

        if (portfolioChart) {
            portfolioChart.destroy();
        }

        portfolioChart = new Chart(portfolioChartCtx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: labels.map((_, index) => `hsl(${index * 60}, 70%, 50%) `),
                }]
            },
            options: {
                responsive: true
            }
        });
    }


  
});

 