// Initialization
lucide.createIcons();

const ctx = document.getElementById('mainChart').getContext('2d');
let mainChart;

// Range Inputs
const priceIn = document.getElementById('priceRange');
const attendeeIn = document.getElementById('attendeeRange');
const venueIn = document.getElementById('venueRange');
const prizeIn = document.getElementById('prizeRange');

function initChart() {
    mainChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Gross Revenue', 'Total Expenses', 'Net Profit'],
            datasets: [{
                data: [1650, 1000, 650],
                backgroundColor: ['#4F46E5', '#F43F5E', '#10B981'],
                borderRadius: 12,
                barThickness: 60
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { display: false }, ticks: { font: { weight: 'bold' } } },
                x: { grid: { display: false }, ticks: { font: { weight: 'bold', size: 10 } } }
            }
        }
    });
}

function updateDashboard() {
    // Get values
    const price = parseInt(priceIn.value);
    const attendees = parseInt(attendeeIn.value);
    const venue = parseInt(venueIn.value);
    const prize = parseInt(prizeIn.value);

    // Labels
    document.getElementById('priceLabel').innerText = `$${price}`;
    document.getElementById('attendeeLabel').innerText = attendees;
    document.getElementById('venueLabel').innerText = `$${venue}`;
    document.getElementById('prizeLabel').innerText = `$${prize}`;

    // Calculations
    const revenue = price * attendees;
    const expenses = venue + prize;
    const profit = Math.max(0, revenue - expenses);
    const split = profit / 2;
    const breakEvenVal = Math.ceil(expenses / price);

    // Update KPI Cards
    document.getElementById('revKPI').innerText = `$${revenue.toLocaleString()}`;
    document.getElementById('expKPI').innerText = `$${expenses.toLocaleString()}`;
    document.getElementById('profitKPI').innerText = `$${profit.toLocaleString()}`;
    document.getElementById('splitKPI').innerText = `$${split.toLocaleString()}`;

    // Update Break-Even and Notes
    document.getElementById('breakEven').innerText = `${breakEvenVal} paid guests`;
    document.getElementById('upside').innerText = `$${(attendees * 2)}`;

    // Update Chart
    mainChart.data.datasets[0].data = [revenue, expenses, profit];
    mainChart.update();
}

// Listeners
[priceIn, attendeeIn, venueIn, prizeIn].forEach(el => {
    el.addEventListener('input', updateDashboard);
});

window.onload = () => {
    initChart();
    updateDashboard();
};
