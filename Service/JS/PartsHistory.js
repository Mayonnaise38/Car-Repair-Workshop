const container = document.getElementById('partsHistory');
let history = JSON.parse(localStorage.getItem('sparePartsHistory')) || [];

/* ================= DISPLAY FUNCTION ================= */
function displayPartsHistory() {
    container.innerHTML = '';

    if (history.length === 0) {
        container.innerHTML = "<p class='empty'>No spare parts history found.</p>";
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Car Plate</th>
            <th>Category</th>
            <th>Part</th>
            <th>Quantity</th>
            <th>Price (RM)</th>
            <th>Action</th>
        </tr>
    `;

    history.forEach((h, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${h.date}</td>
            <td>${h.carPlate}</td>
            <td>${h.category}</td>
            <td>${h.item}</td>
            <td>${h.quantity}</td>
            <td>${h.price.toFixed(2)}</td>
            <td><button class="delete" data-index="${index}">Delete</button></td>
        `;

        table.appendChild(row);
    });

    container.appendChild(table);

    /* ================= DELETE FUNCTION ================= */
    const deleteButtons = container.querySelectorAll('.delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.dataset.index);

            // 1. Remove from inventory sales
            const categoryName = history[idx].category;
            const partName = history[idx].item;

            const inventoryKey = `record_${categoryName.replace(/\s+/g, '_')}`;
            const inventory = JSON.parse(localStorage.getItem(inventoryKey)) || [];

            inventory.forEach(part => {
                if (part.supplier === partName && part.sales) {
                    // Remove the matching sale by carPlate & quantity & price
                    part.sales = part.sales.filter(sale =>
                        !(sale.plate === history[idx].carPlate &&
                          sale.qty === history[idx].quantity &&
                          sale.sellPrice === history[idx].price)
                    );
                }
            });

            localStorage.setItem(inventoryKey, JSON.stringify(inventory));

            // 2. Remove from sparePartsHistory
            history.splice(idx, 1);
            localStorage.setItem('sparePartsHistory', JSON.stringify(history));

            // 3. Refresh table
            displayPartsHistory();
        });
    });
}

/* ================= INITIAL DISPLAY ================= */
displayPartsHistory();
