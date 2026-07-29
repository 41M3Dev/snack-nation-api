const BaseModel = require('./BaseModel');


class RewardModel extends BaseModel {
    constructor() {
        super('rewards');
    }
    findAllActive() {
        return this.db(this.tableName).select('*').where({ is_active: 1 });
    }
}
module.exports = new RewardModel();
