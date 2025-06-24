const BASE_URL="http://localhost:3000/invoices";

const form = document.getElementById("invoice-form");
const list =document.getElementById("invoice-list");


//Get all existing invoices and render them
fetch(BASE_URL)
.then(res => res.json())
.then(renderInvoices);

form.addEventListener("submit", function(event){
    event.preventDefault();  //prevent the page from reloading

    