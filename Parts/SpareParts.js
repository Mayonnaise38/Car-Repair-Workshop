const spareparts = document.querySelectorAll('.spareparts');

function getStorageKey(part) {
    return `record_${part.querySelector('p').textContent.replace(/\s+/g, '_')}`;
}

function displayRecord(part, record) {
    const recordList = part.querySelector('.record');
    recordList.innerHTML = '';

    let amountTotal = 0;

    record.forEach((x, index) => {
        amountTotal += x.amount;

        const li = document.createElement('li');
        li.classList.add('inventory-item');

        li.innerHTML = `
            <div>
                <strong class="supplier">${x.supplier}</strong><br>
                <span class="price">Cost: RM ${x.price}</span><br>
                <span class="amount">Stock: ${x.amount}</span>
            </div>

            <div class="inventory-actions">
                <button class="sell">Sell</button>
                <button class="delete">Delete</button>
            </div>

            <div class="sales"></div>
        `;

        /* ===== DELETE STOCK ===== */
        li.querySelector('.delete').addEventListener('click', () => {
            record.splice(index, 1);
            localStorage.setItem(getStorageKey(part), JSON.stringify(record));
            displayRecord(part, record);
        });

        /* ===== SELL PART ===== */
        li.querySelector('.sell').addEventListener('click', () => {
            if (x.amount <= 0) {
                alert('No stock left');
                return;
            }

            const plate = prompt('Vehicle No Plate:');
            if (!plate || plate.trim() === '') return;

            const qty = parseInt(prompt('Quantity to sell:'), 10);
            if (isNaN(qty) || qty <= 0 || qty > x.amount) {
                alert('Invalid quantity');
                return;
            }

            const sellPrice = parseFloat(prompt('Sell price (per unit):'));
            if (isNaN(sellPrice) || sellPrice <= 0) {
                alert('Invalid price');
                return;
            }

            /* ===== UPDATE STOCK ===== */
            x.amount -= qty;

            /* ===== SAVE SALES INSIDE INVENTORY ONLY ===== */
            if (!x.sales) x.sales = [];
            const saleRecord = {
                plate: plate.toUpperCase(),
                qty,
                sellPrice,
                date: new Date().toLocaleString()
            };
            x.sales.push(saleRecord);

            localStorage.setItem(getStorageKey(part), JSON.stringify(record));
            displayRecord(part, record);
        });

        /* ===== SHOW SALES HISTORY ===== */
        const salesDiv = li.querySelector('.sales');
        if (x.sales && x.sales.length > 0) {
            x.sales.forEach((sale, saleIndex) => {
                const saleRow = document.createElement('div');
                saleRow.classList.add('sale-record');

                saleRow.innerHTML = `
                    SOLD → ${sale.qty} unit(s)<br>
                    NO. Plate: ${sale.plate}<br>
                    Sell Price: RM ${sale.sellPrice}<br>
                    ${sale.date}<br>
                    <button class="delete-sale" data-sale-index="${saleIndex}">Delete Sale</button><br>
                    ---------------------------------------
                `;

                // DELETE INDIVIDUAL SALE
                saleRow.querySelector('.delete-sale').addEventListener('click', () => {
                    x.sales.splice(saleIndex, 1);
                    x.amount += sale.qty; // restore stock
                    localStorage.setItem(getStorageKey(part), JSON.stringify(record));
                    displayRecord(part, record);
                });

                salesDiv.appendChild(saleRow);
            });
        }

        recordList.appendChild(li);
    });

    part.querySelector('.amount').textContent = amountTotal;
}

/* ===== INIT ===== */
spareparts.forEach(part => {
    const details = part.querySelector('.details');
    const toggle = part.querySelector('.toggle');
    const add = part.querySelector('.add');

    let record = JSON.parse(localStorage.getItem(getStorageKey(part))) || [];
    displayRecord(part, record);

    details.style.display = 'none';

    toggle.addEventListener('click', () => {
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    });

    add.addEventListener('click', () => {
        const supplier = prompt('Supplier Name:');
        if (!supplier || supplier.trim() === '') return;

        const price = parseFloat(prompt('Cost Price:'));
        if (isNaN(price)) return;

        const amount = parseInt(prompt('Stock Amount:'), 10);
        if (isNaN(amount)) return;

        record.push({
            supplier,
            price,
            amount,
            sales: []
        });

        localStorage.setItem(getStorageKey(part), JSON.stringify(record));
        displayRecord(part, record);
    });
});
