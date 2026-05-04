const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
    constructor() {
        super('users');
    }
    findByEmail(email) {
        return this.db(this.tableName).where({ email }).first();
    }
}
module.exports = new UserModel();