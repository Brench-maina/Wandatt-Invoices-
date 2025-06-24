const BASE_URL="http://localhost:3000/invoices";

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
    .then(res => res.json())
    .then(newInvoice => {
        renderInvoices([newInvoice]);
    form.reset();   
 });
});

//Function to render invoices
function renderInvoices(invoices){
    list.innerHTML = "";
    invoices.forEach(invoice => {
        const li = document.createElement("li");
        li.textContent = `No:${invoice.invoiceNumber} - ${invoice.clientName} - $${invoice.amount} - Due: ${invoice.date} - ${invoice.status}`;

     const markPaidButton = document.createElement("button");
     markPaidButton.textContent = "Paid";
     markPaidButton.addEventListener("click", () => 
    paidInvoice(invoice.id));

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
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
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({ status:"paid" })
    })
    .then(() => fetch(BASE_URL))
    .then(res => res.json())
    .then(renderInvoices)
}
    



