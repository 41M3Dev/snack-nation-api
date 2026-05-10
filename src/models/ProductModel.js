const BaseModel = require('./BaseModel');


class ProductModel extends BaseModel {
    constructor() {
        super('products');
    }
    findAllAvailable() {
    return this.db(this.tableName).select('*').where({ is_available: 1 });
}
}
module.exports = new ProductModel();