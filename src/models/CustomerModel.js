const BaseModel = require('./BaseModel');

class CustomerModel extends BaseModel {
    constructor() {
        super('customers');
    }
    findByPhone(phone) {
        return this.db(this.tableName).where({ phone }).first();
    }
}
module.exports = new CustomerModel();