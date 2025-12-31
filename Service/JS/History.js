const historyList = document.getElementById('historyList');
const clearBtn = document.getElementById('clearHistoryBtn');

function renderHistory() {
    const history = JSON.parse(localStorage.getItem('vehicleHistory')) || [];
    historyList.innerHTML = '';

    if (history.length === 0) {
        historyList.innerHTML = '<p>No history records found.</p>';
        return;
    }

    const table = document.createElement('table');
    table.border = 1;
    table.cellPadding = 8;

    table.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Owner</th>
            <th>Insurance</th>
            <th>IC</th>
            <th>Phone</th>
            <th>Car No Plate</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Year</th>
            <th>Action</th>
            <th>Driver</th>
            <th>Delete</th>
        </tr>
    `;

    history.forEach((rec, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rec.date}</td>
            <td>${rec.ownerName}</td>
            <td>${rec.insurance}</td>
            <td>${rec.IC}</td>
            <td>${rec.phone}</td>
            <td>${rec.noPlate}</td>
            <td>${rec.manufacturer}</td>
            <td>${rec.model}</td>
            <td>${rec.year}</td>
            <td>${rec.action}</td>
            <td>${rec.driverName || 'N/A'}</td>
            <td><button class="delete-record" data-index="${index}">Delete</button></td>
        `;
        table.appendChild(row);
    });

    historyList.appendChild(table);

    // DELETE INDIVIDUAL RECORD
    const deleteButtons = historyList.querySelectorAll('.delete-record');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = parseInt(e.target.dataset.index);
            if (confirm('Are you sure you want to delete this record?')) {
                history.splice(idx, 1); // remove from array
                localStorage.setItem('vehicleHistory', JSON.stringify(history));
                renderHistory(); // refresh table
            }
        });
    });
}

renderHistory();

window.addEventListener('storage', e => {
    if (e.key === 'vehicleHistory') {
        renderHistory();
    }
});

clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all history?')) {
        localStorage.removeItem('vehicleHistory');
        renderHistory();
    }
});
