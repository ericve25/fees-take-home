const orders = require('./orders.json');
const calcFunds = require('./calcFunds.js');

let totals = {};
let result = "";
orders.forEach(order => {
    let funds = calcFunds(order);

    // display fund amounts for order and add to totals
    result += "Order ID: " + order.order_number;
    for (let fund in funds) {
        totals[fund] === undefined ? totals[fund] = funds[fund] : totals[fund] += funds[fund];

        if (fund !== "Other") {
            result += "\n  Fund - " + fund + ": $" + funds[fund].toFixed(2);
        }
    }
    result += "\n  Fund - Other: $" + funds["Other"].toFixed(2);
    result += "\n\n";
});
console.log(result);

// display distribution totals
result = "Total distributions:";
for (let fund in totals) {
    if (fund !== "Other") {
        result += "\n  Fund - " + fund + ": $" + totals[fund].toFixed(2);
    }
}
result += "\n  Fund - Other: $" + totals["Other"].toFixed(2);
result += "\n";
console.log(result);