// Author: Kazman/Port & WODS & Labs
// I start my page by going to the server http://127.0.0.1:8080/index.html
var express = require('express'); //code for server
var qs = require('querystring');
var app = express();

app.use(express.urlencoded({ extended: true })); //decode URL encoded data from POST requests
app.get("/index", function (request, response) {
    var contents = fs.readFileSync('./views/index.html', 'utf8');
    response.send(eval('`' + body + '`')); // render template string

    //author: nate moylan; 
    //this function creates a for loop to generate the products for the page
    function display_products() {
        str = '';
        // loop to generate the products
        for (i = 0; i < products.length; i++) {
            str += `
            <section class ="item">
            <h2>${products[i].brand}</h2> 
            <h3 label id ="quantity_available${i}"><i>Available: ${products[i].quantity_available} in stock!</i></h3></label>
            <h4>$${products[i].price.toFixed(2)}</h4>
            <img src="./images/${products[i].image}" class="img">
            <label id ="quantity${i}_label">Number of Items: </label>
            <input type="text" placeholder="0" name="quantity${i}" onkeyup="checkQuantityTextbox(this);"> 

            </section>`;

            // makes sure the quantity inputted by the user is validated. 
            if (typeof req.query['purchase_submit'] != 'undefined') {
        
                for (i = 0; i < products.length; i++) {
                    if (params.has(`quantity${i}`)) {
                        a_qty = params.get(`quantity${i}`);
                        // make textboxes sticky in case of invalid data
                        product_selection_form[`quantity${i}`].value = a_qty;
                        total_qty += a_qty;
                        if (!isNonNegInt(a_qty)) {
                            has_errors = true; // if invalid quantity
                            checkQuantityTextbox(product_selection_form[`quantity${i}`]); // shows where the error is
                        }
                    }
                }
                
                console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query)); //log purchase quantities
            }
            next();
        }
        
        return str;
    }
});

// to validate that an input value = a non negative integer
// inputstring is the input string; returnErrors indicates how the function returns
// true = return the array, false = return a boolean.    
function isNonNegInt(inputstring, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(inputstring) != inputstring) {
        errors.push('Not a number!'); // this is to check if string = a number value
    }
    else {
        if (inputstring < 0) errors.push('Negative value!'); // to check if it is non-negative
        if (parseInt(inputstring) != inputstring) errors.push('Not an integer!'); // to check that it's an integer
    }
    return returnErrors ? errors : (errors.length == 0);
}
// routing
// to monitor all process requests    
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.post('/process_invoice', function (request, response, next) {
//to validate data
//error bag
var errors={};




//if the data is valid, send them to the invoice, otherwise send them back to index
if(Object.keys(errors).length == 0) {
    response.redirect('./invoice.html?'+ qs.stringify(request.body)); //move to invoice page if no errors
}else{
    response.redirect('./index?'+ qs.stringify(request.body));
}
});



// handles request for any static files
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));
