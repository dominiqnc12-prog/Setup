// Initialize Icons
lucide.createIcons();

// Chart Variable
const ctx = document.getElementById('mainChart').getContext('2d');
let mainChart;

// Tab Switching Engine
function switchTab(tabId) {
    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });
    
    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show target
    const targetView = document.getElementById(`view-${tabId}`);
    targetView.classList.remove('hidden');
    setTimeout(() => targetView.classList.add('active'), 10);
    
    // Activate button
    document.getElementById(`tab-${tabId}`).classList.add('active');
}

// Financial Lab Logic (The Dashboard Engine)
function initChart() {
    mainChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Revenue', 'Expenses', 'Profit'],
            datasets: [{
                data: [1650, 1000, 650],
                backgroundColor: ['#4F46E5', '#F43F5E', '#10B981'],
                borderRadius: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}

function updateFinance() {
    const price = parseInt(document.getElementById('priceRange').value);
    const attendees = parseInt(document.getElementById('attendeeRange').value);
    const venue = parseInt(document.getElementById('venueRange').value);
    const prize = parseInt(document.getElementById('prizeRange').value);

    const revenue = price * attendees;
    const expenses = venue + prize;
    const profit = Math.max(0, revenue - expenses);

    document.getElementById('priceLabel').innerText = `$${price}`;
    document.getElementById('attendeeLabel').innerText = attendees;
    document.getElementById('venueLabel').innerText = `$${venue}`;
    document.getElementById('prizeLabel').innerText = `$${prize}`;

    document.getElementById('revKPI').innerText = `$${revenue.toLocaleString()}`;
    document.getElementById('expKPI').innerText = `$${expenses.toLocaleString()}`;
    document.getElementById('profitKPI').innerText = `$${profit.toLocaleString()}`;
    document.getElementById('splitKPI').innerText = `$${(profit/2).toLocaleString()}`;
    
    document.getElementById('breakEven').innerText = `${Math.ceil(expenses/price)} paid guests`;
    document.getElementById('upside').innerText = `$${(attendees * 2)}`;

    mainChart.data.datasets[0].data = [revenue, expenses, profit];
    mainChart.update();
}

// Listeners
document.querySelectorAll('input[type="range"]').forEach(input => {
    input.addEventListener('input', updateFinance);
});

window.onload = () => {
    initChart();
    updateFinance();
};
