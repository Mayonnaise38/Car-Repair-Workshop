const form = document.getElementById('carForm');

const ownerName = document.getElementById('ownerName');
const insurance = document.getElementById('insurance');
const IC = document.getElementById('IC');
const phone = document.getElementById('phone');
const noPlate = document.getElementById('noPlate');
const manufacturer = document.getElementById('manufacturer');
const model = document.getElementById('model');
const year = document.getElementById('year');
const action = document.getElementById('action');
const driverName = document.getElementById('driverName');

/* ===== IC FORMAT ===== */
IC.addEventListener('input', () => {
    let value = IC.value.replace(/\D/g, '');
    if (value.length > 12) value = value.slice(0, 12);

    if (value.length > 6 && value.length <= 8) {
        value = value.slice(0, 6) + '-' + value.slice(6);
    } else if (value.length > 8) {
        value = value.slice(0, 6) + '-' + value.slice(6, 8) + '-' + value.slice(8);
    }
    IC.value = value;
});

/* ===== PHONE FORMAT (10–11 DIGITS ONLY) ===== */
phone.addEventListener('input', () => {
    let value = phone.value.replace(/\D/g, '');

    // Limit max to 11 digits
    if (value.length > 11) value = value.slice(0, 11);

    // Format XXX-XXXXXXX or XXX-XXXXXXXX
    if (value.length > 3) {
        value = value.slice(0, 3) + '-' + value.slice(3);
    }

    phone.value = value;
});

/* ===== YEAR ===== */
year.addEventListener('input', () => {
    let value = year.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    year.value = value;
});

/* ===== CAPITALIZE ===== */
function capitalizeWords(text) {
    return text
        .toLowerCase()
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

/* ===== SPARE PARTS DATA ===== */
const spareParts = {
    "Engine & Transmission": [
        "Spark plugs",
        "Timing belt",
        "Oil filter",
        "Fuel pump",
        "Engine pistons",
        "Clutch plate"
    ],
    "Electrical & Electronics": [
        "Battery",
        "Alternator",
        "Starter motor",
        "Oxygen sensor",
        "Engine Control Unit",
        "Fuse box"
    ],
    "Brake & Suspension": [
        "Brake pads",
        "Brake discs",
        "Shock absorbers",
        "Coil springs",
        "Brake calipers",
        "Anti-roll bar"
    ],
    "Cooling & Heating": [
        "Radiator",
        "Water pump",
        "Thermostat",
        "Heater core",
        "Cooling fan",
        "Radiator hose"
    ],
    "Lighting & Visibility": [
        "Headlight bulbs",
        "Tail light bulbs",
        "Fog lights",
        "Windshield wiper blades",
        "Turn signal indicators",
        "Headlight lens"
    ],
    "Body & Interior": [
        "Side mirrors",
        "Door handles",
        "Dashboard",
        "Seats",
        "Bumpers",
        "Seat belts"
    ]
};

/* ===== FORM SUBMIT ===== */
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const rawPhone = phone.value.replace(/\D/g, '');

    // VALIDATION
    if (!ownerName.value.trim()) return alert("Please enter owner's name");
    if (!insurance.value) return alert("Please select insurance");
    if (!/^\d{6}-\d{2}-\d{4}$/.test(IC.value)) return alert("IC format: 000000-00-0000");

    // PHONE VALIDATION (10–11 digits)
    if (rawPhone.length < 10 || rawPhone.length > 11) {
        return alert("Phone number must be 10 or 11 digits");
    }

    if (!noPlate.value.trim()) return alert("Please enter car number plate");
    if (!manufacturer.value.trim()) return alert("Please enter car manufacturer");
    if (!model.value.trim()) return alert("Please enter car model");
    if (!year.value.trim()) return alert("Please enter year");
    if (!action.value) return alert("Please select an action");

    // RECORD FOR HISTORY.HTML
    const record = {
        date: new Date().toLocaleString(),
        ownerName: ownerName.value.trim(),
        insurance: insurance.value,
        IC: IC.value.trim(),
        phone: phone.value.trim(),
        noPlate: noPlate.value.trim().toUpperCase(),
        manufacturer: capitalizeWords(manufacturer.value.trim()),
        model: capitalizeWords(model.value.trim()),
        year: year.value.trim(),
        action: action.value,
        driverName: driverName.value.trim() || 'N/A'
    };

    let vehicleHistory = JSON.parse(localStorage.getItem('vehicleHistory')) || [];
    vehicleHistory.push(record);
    localStorage.setItem('vehicleHistory', JSON.stringify(vehicleHistory));

    // IF BUY SPARE PARTS
    if (action.value === "Buy Spare Parts") {
        selectSpareParts(record.noPlate);
    } else {
        alert("Form submitted successfully!");
    }

    form.reset();
});

/* ===== SPARE PARTS SELECTION ===== */
function selectSpareParts(carPlate) {
    const categories = Object.keys(spareParts);
    let categoryList = categories.map((c, i) => `${i + 1}. ${c}`).join('\n');
    let categoryChoice = prompt("Select Category:\n" + categoryList);

    if (!categoryChoice) return;
    const catIndex = parseInt(categoryChoice) - 1;
    if (!categories[catIndex]) return alert("Invalid category");

    const category = categories[catIndex];
    const items = spareParts[category];

    let itemsList = items.map((i, idx) => `${idx + 1}. ${i}`).join('\n');
    let itemChoice = prompt("Select Spare Part:\n" + itemsList);

    if (!itemChoice) return;
    const itemIndex = parseInt(itemChoice) - 1;
    if (!items[itemIndex]) return alert("Invalid spare part");

    const qty = parseInt(prompt("Quantity to buy:"), 10);
    if (isNaN(qty) || qty <= 0) return alert("Invalid quantity");

    const price = parseFloat(prompt("Selling Price (RM):"));
    if (isNaN(price) || price <= 0) return alert("Invalid price");

    let partsHistory = JSON.parse(localStorage.getItem('sparePartsHistory')) || [];
    partsHistory.push({
        date: new Date().toLocaleString(),
        carPlate,
        category,
        item: items[itemIndex],
        quantity: qty,
        price
    });

    localStorage.setItem('sparePartsHistory', JSON.stringify(partsHistory));

    alert(`Spare part purchase recorded!\nCar: ${carPlate}\n${category} → ${items[itemIndex]}`);
}
