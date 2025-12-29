// Get form and inputs
const form = document.getElementById('carForm');

const ownerName = document.getElementById('ownerName');
const insurance = document.getElementById('insurance');
const IC = document.getElementById('IC');
const phone = document.getElementById('phone');
const noPlate = document.getElementById('noPlate');
const model = document.getElementById('model');
const year = document.getElementById('year');
const action = document.getElementById('action');
const driverName = document.getElementById('driverName');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // prevent default form submission

    // Validation
    if (ownerName.value.trim() === '') {
        alert("Please enter owner's name");
        ownerName.focus();
        return;
    }
    if (insurance.value === '') {
        alert("Please select insurance");
        insurance.focus();
        return;
    }
    if (IC.value.trim() === '') {
        alert("Please enter IC number");
        IC.focus();
        return;
    }
    if (phone.value.trim() === '') {
        alert("Please enter phone number");
        phone.focus();
        return;
    }
    if (noPlate.value.trim() === '') {
        alert("Please enter car number plate");
        noPlate.focus();
        return;
    }
    if (model.value.trim() === '') {
        alert("Please enter car model");
        model.focus();
        return;
    }
    if (year.value.trim() === '') {
        alert("Please enter year");
        year.focus();
        return;
    }
    if (action.value === '') {
        alert("Please select an action");
        action.focus();
        return;
    }

    // Create record object
    const record = {
        ownerName: ownerName.value.trim(),
        insurance: insurance.value,
        IC: IC.value.trim(),
        phone: phone.value.trim(),
        noPlate: noPlate.value.trim(),
        model: model.value.trim(),
        year: year.value.trim(),
        action: action.value,
        driverName: driverName.value.trim() || 'N/A',
        date: new Date().toLocaleString()
    };

    // Get existing history from localStorage
    let history = JSON.parse(localStorage.getItem('vehicleHistory')) || [];

    // Add new record
    history.push(record);

    // Save back to localStorage
    localStorage.setItem('vehicleHistory', JSON.stringify(history));

    alert("Form submitted successfully!");

    // Clear form
    form.reset();
});
