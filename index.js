const BASE_URL="https://685bfde389952852c2dbcc70.mockapi.io/api/v1/invoices";

const form = document.getElementById("invoice-form");
const list =document.getElementById("invoice-list");

//Get all existing invoices and render them
fetch(BASE_URL)
.then(res => res.json())
.then(renderInvoices);

form.addEventListener("submit", function(event){
    event.preventDefault();  //prevent the page from reloading

    const invoice ={
      invoiceNumber: document.getElementById("invoiceNumber").value,
      clientName: document.getElementById("clientName").value,
      amount: parseFloat(document.getElementById("amount").value),
      date: document.getElementById("date").value,
      status:'unpaid'
    };
    // add an invoice
    fetch(BASE_URL, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
body:JSON.stringify(invoice)
    })
    .then(() => fetch(BASE_URL))
    .then(res => res.json()) 
    .then(renderInvoices);

    form.reset();
 });

//Function to render invoices
function renderInvoices(invoices){
    list.innerHTML = "";
    invoices.forEach(invoice => {
        const li = document.createElement("li");
        li.setAttribute("data-id", invoice.id);

        li.innerHTML =`<span>No:${invoice.invoiceNumber} - ${invoice.clientName} - $${invoice.amount} - Due: ${invoice.date} -
        <span class="${invoice.status}">${invoice.status}</span></span>`;

     const markPaidButton = document.createElement("button");
     markPaidButton.textContent = "Paid";
     markPaidButton.className= "paid-button";
     markPaidButton.addEventListener("click", () => 
    paidInvoice(invoice.id));

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.className = "delete-button";
deleteButton.addEventListener("click", () =>
    deleteInvoice(invoice.id));

//Append buttons to the list item
li.appendChild(markPaidButton);
li.appendChild(deleteButton);

//Append the list item to the list
        list.appendChild(li);
});
}

//Function to mark an invoice as paid
function paidInvoice(id) {
fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ status:"paid" })
    })
    .then(() => fetch(BASE_URL))
    .then(res => res.json())
    .then(renderInvoices)
}

 //Function to delete an invoice
function deleteInvoice(id) {
    if (confirm("Are you sure you want to delete this invoice?")){
    fetch(`${BASE_URL}/${id}`,{
        method:"DELETE",
    }) 
    .then(() => {
        const listItem = document.querySelector(`li[data-id="${id}"]`);
        if(listItem) {
            listItem.remove();
        }
    });
}
}
//search for invoice by invoice number
document.getElementById("search-box").addEventListener("input", function () {
    const searchTerm =this.value.toLowerCase();  //toLowerCase ensures the search is case insensitive

    fetch(BASE_URL)
    .then(res => res.json())
    .then(invoices => {
        const filtered = invoices.filter(invoice =>
            invoice.invoiceNumber &&   invoice.invoiceNumber .toString().toLowerCase().includes(searchTerm)
        );
        renderInvoices(filtered);
    });
});

