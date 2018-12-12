const orders = require('./orders.json');
const calcFees = require('./calcFees.js');

orders.forEach(order => {
    let order_summary = calcFees(order);
    let order_result = "Order ID: " + order.order_number;
    
    order_summary.items.forEach(order_item => {
        order_result += "\n   Order item " + order_item.type + ": $" + order_item.fee.toFixed(2);
    });

    order_result += "\n\n   Order total: $" + order_summary.total.toFixed(2) + "\n";
    console.log(order_result);
});