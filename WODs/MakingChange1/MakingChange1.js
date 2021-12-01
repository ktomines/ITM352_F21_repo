// set amount to make change in pennies
let amount = 20;
let leftover = amount;

//determines the number of quarters
let quarters = Math.floor(amount /25);
leftover = leftover % 25;

// determines the number of dimes
let dimes = Math.floor(leftover/10);
leftover=leftover % 10;

// determines the number of nickles
let nickels = Math.floor(leftover/5);
leftover = leftover % 5; 

//determines the number of pennies
let pennies = leftover;

console.log(amount+ " pennies can be divided into: " + quarters + "quarter(s)," + dimes + "dimes(s)," + nickels + "nickel(s), &" + pennies + "pennie(s)");