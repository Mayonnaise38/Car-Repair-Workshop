let serviceCost = 0;
let windscreenCost = 0;
let sparePartsCost = 0;

function updateTotal() {
    const total = serviceCost + windscreenCost + sparePartsCost;
    document.getElementById('totalAmount').textContent = total;
}

function hidePanels() {
    document.querySelectorAll('.panel').forEach(p => p.style.display = 'none');
}

function selectType(type) {
    hidePanels();
    document.getElementById(type + 'Panel').style.display = 'block';
}

function addService() {
    const base = parseInt(document.getElementById('serviceType').value);
    const extra = parseInt(document.getElementById('serviceExtra').value) || 0;

    if (!base) {
        alert('Select service type');
        return;
    }

    serviceCost = base + extra;
    updateTotal();
}

function addWindscreen() {
    const base = parseInt(document.getElementById('windscreenType').value);
    const extra = parseInt(document.getElementById('windscreenExtra').value) || 0;

    if (!base) {
        alert('Select vehicle type');
        return;
    }

    windscreenCost = base + extra;
    updateTotal();
}

function addSpareParts() {
    const selection = document.getElementById('partsCount').value;
    const extraItems = parseInt(document.getElementById('extraItems').value) || 0;
    const extra = parseInt(document.getElementById('partsExtra').value) || 0;

    let base = 0;

    if (!selection) {
        alert('Select spare parts count');
        return;
    }

    if (selection === 'more') {
        base = 120 + (extraItems * 30);
    } else {
        base = parseInt(selection);
    }

    sparePartsCost = base + extra;
    updateTotal();
}

function resetCalculator() {
    if (!confirm('Reset calculator?')) return;

    serviceCost = 0;
    windscreenCost = 0;
    sparePartsCost = 0;

    updateTotal();
    hidePanels();

    document.querySelectorAll('select, input').forEach(el => {
        if (el.type === 'number') el.value = '';
        if (el.tagName === 'SELECT') el.selectedIndex = 0;
    });
}
