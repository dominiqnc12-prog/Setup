// Initial Config
const FIXED_EXPENSES = 700;
const RECRUIT_FUNDING = 500; // Expected from sponsors/org budget

// Initialize Icons
lucide.createIcons();

// Navigation Logic
function switchView(viewId) {
    // Update Content
    document.querySelectorAll('.view-content').forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('active');
    });
    
    const activeView = document.getElementById(`view-${viewId}`);
    activeView.classList.remove('hidden');
    setTimeout(() => activeView.classList.add('active'), 10);

    // Update Buttons
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${viewId}`).classList.add('active');
}

// Financial Logic Engine
const priceInput = document.getElementById('priceRange');
const attendeeInput = document.getElementById('attendeeRange');

function calculateFinance() {
    const price = parseInt(priceInput.value);
    const attendees = parseInt(attendeeInput.value);
    
    // Update Labels
    document.getElementById('priceLabel').innerText = `$${price}`;
    document.getElementById('attendeeLabel').innerText = attendees;

    // Calculations
    const gross = (price * attendees) + RECRUIT_FUNDING;
    const net = gross - FIXED_EXPENSES;
    const split = net / 2;

    // Update UI Displays
    document.getElementById('grossDisplay').innerText = `$${gross.toLocaleString()}`;
    document.getElementById('netProfitDisplay').innerText = `$${net.toLocaleString()}`;
    document.getElementById('splitDisplay').innerText = `$${split.toLocaleString()}`;

    // Color Logic for Profit/Loss
    const display = document.getElementById('netProfitDisplay');
    if (net < 0) {
        display.classList.add('text-rose-400');
        display.classList.remove('text-white');
    } else {
        display.classList.add('text-white');
        display.classList.remove('text-rose-400');
    }
}

// Event Listeners
priceInput.addEventListener('input', calculateFinance);
attendeeInput.addEventListener('input', calculateFinance);

// Run on Load
calculateFinance();
