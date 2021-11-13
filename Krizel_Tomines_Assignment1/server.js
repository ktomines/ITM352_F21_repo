var products_array = require('./product_data.json');
var express = require('express');
var app = express();

function display_products() {
    for (i = 0; i < products_array.length; i++) {
        products_main_display.innerHTML +=
        `
        <section class="item">
            <h2>${products[i].brand}</h2>
            <p>$${products[i].price}</p>
            <div>
            <label id="quantity${i}_label"}">Quantity</label>
            <input type="text" placeholder="0" name="quantity${i}" 
            onkeyup="checkQuantityTextbox(this);">
            </div>
            <img src="${products[i].image}">
        </section>
    `;
}
}
// Routing 

// monitor all requests
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
 });


 //validate quantities & check if quantity is availiable; author: Kazman/Port
 if (params.has('purchase_submit')) {
    total_qty = 0; // amount trying to buy
    for (i = 0; i < products.length; i++) {
        if (params.has(`quantity${i}`)) {
            a_qty = params.get(`quantity${i}`);
            // make textboxes sticky in case of invalid data
            product_selection_form[`quantity${i}`].value = a_qty;
            total_qty += a_qty;
            if (!isNonNegInt(a_qty)) {
                has_errors = true; // no negatives here!
                checkQuantityTextbox(product_selection_form[`quantity${i}`]); // show where the error is
            }
        }
    } 
 
 // route all other GET requests to files in public 
 app.use(express.static('./public'));
 
 // start server
 app.listen(8080, () => console.log(`listening on port 8080`));


}