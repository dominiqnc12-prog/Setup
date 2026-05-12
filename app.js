// Initialize Icons
lucide.createIcons();

// Global Chart Instance
const ctx = document.getElementById('mainChart').getContext('2d');
let mainChart;

/**
 * TAB SWITCHING ENGINE
 * Toggles visibility between Finance, Strategy, and Ops tabs
 */
function switchTab(tabId) {
    // Hide all tab content areas
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });
    
    // Remove 'active' state from all navigation buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show the selected tab content
    const targetView = document.getElementById(`view-${tabId}`);
    targetView.classList.remove('hidden');
    // Simple timeout to trigger CSS entry animations
    setTimeout(() => targetView.classList.add('active'), 10);
    
    // Set the clicked button to active
    const activeBtn = document.getElementById(`tab-${tabId}`);
    if (activeBtn) activeBtn.classList.add('active');
}

/**
 * FINANCIAL CALCULATOR
 * Drives the Bar Chart and KPI cards
 */
function initChart() {
    mainChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Revenue', 'Expenses', 'Profit'],
            datasets: [{
                data: [1650, 1000, 650],
                backgroundColor: ['#4F46E5', '#F43F5E', '#10B981'],
                borderRadius: 12,
                barThickness: 50
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: { backgroundColor: '#1C1917', titleFont: { size: 14 } }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: '#F1F5F9' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function updateFinance() {
    // Collect Input Values
    const price = parseInt(document.getElementById('priceRange').value);
    const attendees = parseInt(document.getElementById('attendeeRange').value);
    const venue = parseInt(document.getElementById('venueRange').value);
    const prize = parseInt(document.getElementById('prizeRange').value);

    // Calculate Core Metrics
    const revenue = price * attendees;
    const expenses = venue + prize;
    const profit = Math.max(0, revenue - expenses);
    const split = profit / 2;

    // Update Numerical Labels
    document.getElementById('priceLabel').innerText = `$${price}`;
    document.getElementById('attendeeLabel').innerText = attendees;
    document.getElementById('venueLabel').innerText = `$${venue}`;
    document.getElementById('prizeLabel').innerText = `$${prize}`;

    // Update KPI Header Cards
    document.getElementById('revKPI').innerText = `$${revenue.toLocaleString()}`;
    document.getElementById('expKPI').innerText = `$${expenses.toLocaleString()}`;
    document.getElementById('profitKPI').innerText = `$${profit.toLocaleString()}`;
    document.getElementById('splitKPI').innerText = `$${Math.floor(split).toLocaleString()}`;
    
    // Update Logic Insights
    document.getElementById('breakEven').innerText = `${Math.ceil(expenses/price)} paid guests`;
    document.getElementById('upside').innerText = `$${(attendees * 2)}`;

    // Refresh Visual Chart
    mainChart.data.datasets[0].data = [revenue, expenses, profit];
    mainChart.update();
}

// Global Event Listeners for Sliders
document.querySelectorAll('input[type="range"]').forEach(input => {
    input.addEventListener('input', updateFinance);
});

// Boot Application
window.onload = () => {
    initChart();
    updateFinance();
};
