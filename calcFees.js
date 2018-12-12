const fees = require('./fees.json');

const calcFees = order => {
    let order_summary = {};
    order_summary.total = 0.0;
    order_summary.items = [];

    order.order_items.forEach(order_item => {
        // calculate price for item based on fees
        let price = 0.0;
        let fee_item = fees.find(fee => { return fee.order_item_type === order_item.type; });

        // add flat fee for item
        price += parseFloat(fee_item.fees.find(fee => { return fee.type === "flat"; }).amount);

        // add per-page fees for additional pages if needed
        if (order_item.pages > 1) {
            price += parseFloat(fee_item.fees.find(fee => { return fee.type === "per-page"; }).amount * (order_item.pages - 1));
        }

        // add item to order summary
        order_summary.items.push({ type: order_item.type, fee: price });

        // add item price to order total
        order_summary.total += price;
    });

    return order_summary;
};

module.exports = calcFees;