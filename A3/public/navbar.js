// Author: Krizel T & Maggie M
// Date: 12/8/2021
// Create navigation bar that will be at the top of the majority of the slides
// Includes links to product pages, login, shopping cart, logout and registration
// Borrowed and modified code from Noah Kim's Assignment 3

//allows us to load user data into json file without dispalying password in URL
function loadJSON(service, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('POST', service, false);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


function navbar() {
    var cart_qty;
    loadJSON('./cart_qty', function (response) {
        // Parsing JSON string into object
        cart_qty = JSON.parse(response);
    });

    document.write(`
    <ul>
        <li><a href="./products_display.html?product_key=Krave%20Beauty">Home</a></li><br>
        <li><a href="./invoice.html${location.search}">Check Out-(${cart_qty.qty})In Cart</a></li>
        <li><a href="./login.html${location.search}">Login</a></li>
        <li><a href="./register.html${location.search}">Registration</a></li>
        <li><a href="./logout">Logout</a></li><br>
       
    `);
    for (let product_key in allproducts) {
        if (product_key == this_product_key) continue; // if product key that currently at is there, continue
        document.write(`<li><a href='./products_display.html?product_key=${product_key}'>${product_key}</a></li>`);
    }
    document.write(`
    </ul>
    `);
}