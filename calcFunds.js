const fees = require('./fees.json');

const calcFunds = order => {
    let funds = {};
    order.order_items.forEach(order_item => {
        let item_distribution_amount = 0.0;

        // calculate fund amounts for item based on fee distributions
        let fee_item = fees.find(fee => { return fee.order_item_type === order_item.type; });

        // add each distribution amount to fund total for order item
        fee_item.distributions.forEach(distribution => {
            let fee_amount = parseFloat(distribution.amount);
            funds[distribution.name] === undefined ? funds[distribution.name] = fee_amount : funds[distribution.name] += fee_amount;
            item_distribution_amount += fee_amount;
        });

        // check if flat fee is fully distributed
        let flat_fee = parseFloat(fee_item.fees.find(fee => { return fee.type === "flat"; }).amount);
        if (item_distribution_amount < flat_fee) {
            funds["Other"] === undefined ? funds["Other"] = flat_fee - item_distribution_amount : funds["Other"] += flat_fee - item_distribution_amount;
        }

        // check for per-page fees to add to "Other" fund
        if (order_item.pages > 1) {
            let per_page_amount = parseFloat(fee_item.fees.find(fee => { return fee.type === "per-page"; }).amount * (order_item.pages - 1));
            funds["Other"] === undefined ? funds["Other"] = per_page_amount : funds["Other"] += per_page_amount;
        }
    });

    return funds;
};

module.exports = calcFunds;