// Author: Kazman/Port & WODS & Labs

var express = require('express'); //code for server
var myParser = require("body-parser");//code for server
var fs = require('fs');
var products = require("./public/products.js"); //to access data
var app = express();

app.use(myParser.urlencoded({ extended: true }));

// to validate that an input value = a non negative integer
// inputstring is the input string; returnErrors indicates how the function returns
// true = return the array, false = return a boolean.    
function isNonNegInt(inputstring, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(inputstring) != inputstring) {
        errors.push('Not a number!'); // this is to check if string = a number value
    }
    else 
    {
        if(inputstring < 0) errors.push('Negative value!'); // to check if it is non-negative
        if(parseInt(inputstring) != inputstring) errors.push('Not an integer!'); // to check that it's an integer
    }           
    return returnErrors ? errors : (errors.length == 0);
} 
// displays the products on the browser to the client. GETS the products_display.html
app.get("/products_display", function (request, response) {
    var contents = fs.readFileSync('./views/products_display.html', 'UTF8');
    response.send(eval('`' + body + '`')); // to evaluate the string


// to check the Quantity textbox for validation errors
function checkQuantityTextbox(theTextbox) {
    errors = isNonNegInt(theTextbox.value, true); // setting errors to isNonNegInt
    if (errors.length == 0) errors = ['You would like:']; 
    if (theTextbox.value.trim() == '') errors = ['Enter your quantity desired: '];
    document.getElementById(theTextbox.name + '_label').innerHTML = errors.join('<font color="red">, </font>');
}       


    // this is a loop to display the products
    function products_display() {
        str += '';
        for (i = 0; i < products.length; i++) {
            str += `
            <section class ="items">
            <h2>${products[i].brand}</h2>
            <h3 label id ="quantity_available${i}"><i>Available: ${products[i].quantity_available} in stock!</i></h3></label>
            <h4>$${products[i].price.toFixed(2)}</h4>
            <img src="./images/${products[i].image}" class="img">
            <label id ="quantity${i}_label">Number of Items: </label>
            <input type="text" placeholder="0" name="quantity${i}" onkeyup="checkQuantityTextbox(this);"> 
            </section>`;
        }
        
                // to compute tax
                tax_rate = 0.0575;
                tax = tax_rate * subtotal;
        
                // to compute shipping
                if (subtotal <= 50) {
                    shipping = 2;
                }
                else if (subtotal <= 100) {
                    shipping = 5;
                }
                else {
                    shipping = 0.05 * subtotal; // 5% of subtotal
                }
        
                // to compute grand total
                total = subtotal + tax + shipping;
        return str;
    }
});
// handles request for any static file
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));
