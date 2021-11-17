// Author: Kazman/Port & WODS & Labs
// I start my page by going to the server http://127.0.0.1:8080/products_display.html
var express = require('express'); //code for server
var qs = require('querystring');
var products = data.prods;
var app = express();

app.use(express.urlencoded({ extended: true })); //decode URL encoded data from POST requests

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
for (i in products)



//if the data is valid, send them to the invoice, otherwise send them back to products_display
if(Object.keys(errors).length == 0) {
    response.redirect('./invoice.html?'+ qs.stringify(request.body)); //move to invoice page if no errors
}else{
    response.redirect('./products_display?'+ qs.stringify(request.body));
}
});



// handles request for any static files
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));
