const spareparts = document.querySelectorAll('.spareparts');

function getStorageKey(part){
    return `record_${part.querySelector('p').textContent.replace(/\s+/g,'_')}`;
}

function displayRecord(part,record){
    const recordList = part.querySelector('.record')
    recordList.innerHTML = ''

    let amountTotal = 0

    record.forEach((x, index) => {
        amountTotal += x.amount;

        const li = document.createElement('li');
        li.innerHTML = `
        <span class='supplier'>${x.supplier}</span>
        <span class='price'>RM ${x.price}</span>
        <span class='amount'>Amount: ${x.amount}</span>
        <button class='delete'>Delete</button>
        `;

        li.querySelector('.delete').addEventListener('click', () =>{
            record.splice(index,1)
            localStorage.setItem(getStorageKey(part), JSON.stringify(record))
            displayRecord(part,record);
        });

        recordList.appendChild(li);
    });

    part.querySelector('.amount').textContent = amountTotal

}

spareparts.forEach(part =>{
    const details = part.querySelector('.details');
    const toggle = part.querySelector('.toggle');
    const add = part.querySelector('.add');

    let record = JSON.parse(localStorage.getItem(getStorageKey(part)))|| [];
    displayRecord(part,record)

    details.style.display = 'none';
    toggle.addEventListener('click',() => {
        if (details.style.display === 'none'){
            details.style.display = 'block';
        }
        
        else {
            details.style.display = 'none';
        }
    })

    add.addEventListener('click', () => {
        const supplier = prompt('Supplier Name:');
        if (supplier === null) return;

        if (supplier.trim() === ''){
            alert('Please enter the supplier name');
            return;
        }                    

        const priceInput = prompt('Price:')
        if (priceInput === null) return;

        const price = parseFloat(priceInput)
        if (isNaN(price)){
            alert('Please enter a valid price');
            return;
        }

        const amountInput = prompt('How many:')
        if (amountInput === null) return;

        const amount = parseInt(amountInput)
        if (isNaN(amount)){
            alert('Please enter a valid number');
            return;
        }
        
        record.push({supplier,price,amount});
        localStorage.setItem(getStorageKey(part),JSON.stringify(record));
        displayRecord(part,record)
    });    
});

