const BaseModel = require('./BaseModel');

class MenuModel extends BaseModel {
    constructor() {
        super('menus');
    }

    findAllAvailable() {
        return this.db(this.tableName).select('*').where({ is_active: 1 });
    }
}
module.exports = new MenuModel();