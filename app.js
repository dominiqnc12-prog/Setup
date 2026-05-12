// Central Configuration
const CONFIG = {
    FIXED_EXPENSES: 700,
    SPONSORSHIP_INCOME: 500,
    ORG_SPLIT_PERCENT: 0.50
};

// Initialize Lucide Icons
lucide.createIcons();

// View Switching Functionality
function switchView(viewId) {
    document.querySelectorAll('.view-content').forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('active');
    });
    
    const targetView = document.getElementById(`view-${viewId}`);
    targetView.classList.remove('hidden');
    // Small delay to allow CSS transitions to fire
    setTimeout(() => targetView.classList.add('active'), 10);

    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${viewId}`).classList.add('active');
}

// Financial Engine
const priceRange = document.getElementById('priceRange');
const attendeeRange = document.getElementById('attendeeRange');

function updateFinancials() {
    const ticketPrice = parseInt(priceRange.value);
    const attendance = parseInt(attendeeRange.value);

    // Dynamic Label Updates
    document.getElementById('priceLabel').innerText = `$${ticketPrice}`;
    document.getElementById('attendeeLabel').innerText = attendance;

    // The Logic Pipeline
    const grossTicketRevenue = ticketPrice * attendance;
    const totalGross = grossTicketRevenue + CONFIG.SPONSORSHIP_INCOME;
    const netProfit = totalGross - CONFIG.FIXED_EXPENSES;
    const orgSplit = netProfit * CONFIG.ORG_SPLIT_PERCENT;

    // DOM Updates
    document.getElementById('grossDisplay').innerText = `$${totalGross.toLocaleString()}`;
    document.getElementById('netProfitDisplay').innerText = `$${netProfit.toLocaleString()}`;
    document.getElementById('splitDisplay').innerText = `$${orgSplit.toLocaleString()}`;

    // Conditional Styling for Warning States
    const warning = document.getElementById('profitWarning');
    const netDisplay = document.getElementById('netProfitDisplay');

    if (netProfit < 300) {
        warning.classList.remove('hidden');
        netDisplay.classList.add('text-rose-400');
    } else {
        warning.classList.add('hidden');
        netDisplay.classList.remove('text-rose-400');
        netDisplay.classList.add('text-white');
    }
}

// Listeners
priceRange.addEventListener('input', updateFinancials);
attendeeRange.addEventListener('input', updateFinancials);

// Initial Run
updateFinancials();
