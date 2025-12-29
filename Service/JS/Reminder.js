const reminderBox = document.getElementById('reminderBox');
const history = JSON.parse(localStorage.getItem('vehicleHistory')) || [];

if (history.length === 0) {
    reminderBox.innerHTML = '<p class="empty">No service records found.</p>';
} else {
    const latest = history[history.length - 1];
    const serviceDate = new Date(latest.date);
    let reminderDate = new Date(serviceDate);
    let suggestion = '';

    if (latest.action === 'Service Car') {
        reminderDate.setMonth(reminderDate.getMonth() + 6);
        suggestion = 'Regular car servicing is recommended every 6 months.';
    } 
    else if (latest.action === 'Change Windscreen') {
        reminderDate.setFullYear(reminderDate.getFullYear() + 1);
        suggestion = 'Check your windscreen condition yearly for safety.';
    } 
    else if (latest.action === 'Buy Spare Parts') {
        reminderDate.setMonth(reminderDate.getMonth() + 3);
        suggestion = 'Ensure spare parts are inspected after installation.';
    }

    reminderBox.innerHTML = `
        <div class="reminder-item">
            <h3>Vehicle: ${latest.noPlate}</h3>
            <p><strong>Owner:</strong> ${latest.ownerName}</p>
            <p><strong>Last Action:</strong> ${latest.action}</p>
            <p><strong>Last Service Date:</strong> ${serviceDate.toLocaleDateString()}</p>
            <p><strong>Next Reminder:</strong> ${reminderDate.toLocaleDateString()}</p>
            <p><strong>Suggestion:</strong> ${suggestion}</p>
        </div>
    `;
}
