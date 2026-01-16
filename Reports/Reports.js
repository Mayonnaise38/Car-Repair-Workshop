const form = document.getElementById('inspectionForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const plate = document.getElementById('plate').value.toUpperCase().trim();
    const owner = document.getElementById('owner').value.trim();
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value.trim();

    const plateRegex = /^[A-Z0-9]{1,15}$/;
    if (!plateRegex.test(plate)) {
        alert('Car plate must contain only letters and numbers (max 15 characters).');
        return;
    }

    if (!date) {
        alert('Please select a valid date.');
        return;
    }

    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    if (year < 2000 || year > 2100) {
        alert('Year must be between 2000 and 2100.');
        return;
    }

    const checks = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(c => {
        checks.push(c.value);
    });

    if (checks.length === 0) {
        alert('Please select at least one inspection item.');
        return;
    }

    const report = {
        plate,
        owner,
        date,
        checks,
        notes,
        createdAt: new Date().toLocaleString()
    };

    let reports = JSON.parse(localStorage.getItem('inspectionReports')) || [];
    reports.push(report);
    localStorage.setItem('inspectionReports', JSON.stringify(reports));

    alert('Inspection report saved successfully.');
    form.reset();
});
