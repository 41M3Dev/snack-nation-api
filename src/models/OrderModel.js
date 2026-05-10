const BaseModel = require('./BaseModel');

class OrderModel extends BaseModel {
    constructor() {
        super('orders');
    }

    findByStatus(status) {
        return this.db(this.tableName)
            .where({ status })
            .orderBy('created_at', 'asc');
    }
}
module.exports = new OrderModel();