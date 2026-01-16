document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('historyList');
    const clearBtn = document.getElementById('clearBtn');

    function capitalizeFirst(text) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    function renderHistory() {
        const reports = JSON.parse(localStorage.getItem('inspectionReports')) || [];
        historyList.innerHTML = '';

        if (reports.length === 0) {
            historyList.innerHTML = `<p class="notFound">No inspection reports found.</p>`;
            return;
        }

        reports.forEach((r, index) => {
            const div = document.createElement('div');
            div.className = 'card';

            div.innerHTML = `
                <p><strong>No. Plate:</strong> ${r.plate}</p>
                <p><strong>Owner:</strong> ${capitalizeFirst(r.owner)}</p>
                <p><strong>Date:</strong> ${r.date}</p>
                <p><strong>Checked Items:</strong></p>
                <ul>${r.checks.map(c => `<li>${c}</li>`).join('')}</ul>
                <p><strong>Notes:</strong> ${r.notes || 'None'}</p>
                <p><em>Created: ${r.createdAt}</em></p>
                <button onclick="deleteReport(${index})">Delete</button>
            `;

            historyList.appendChild(div);
        });
    }

    window.deleteReport = function (index) {
        if (!confirm('Delete this report?')) return;

        let reports = JSON.parse(localStorage.getItem('inspectionReports')) || [];
        reports.splice(index, 1);
        localStorage.setItem('inspectionReports', JSON.stringify(reports));
        renderHistory();
    };

    clearBtn.addEventListener('click', () => {
        if (!confirm('Clear all inspection history?')) return;
        localStorage.removeItem('inspectionReports');
        renderHistory();
    });

    renderHistory();
});
