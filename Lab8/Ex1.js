require("./products_data.js"); 

var num_products = 5;
var count = 0;

while (count < num_products) {
    count++;
    if (count > num_products/4 && count < (num_products * 0.75)) {
        console.log(`${eval('name' + count)} is sold out.`);
    }
    else {
    console.log(`${count}.${eval('name'+ count)}`);
    }
}
console.log("That's all we have folks!");