const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
    constructor() {
        super('users');
    }
    findByEmail(email) {
        return this.db(this.tableName).where({ email }).first();
    }
    findAllActive() {
        return this.db(this.tableName).where({ is_active: 1 });
    }
}
module.exports = new UserModel();