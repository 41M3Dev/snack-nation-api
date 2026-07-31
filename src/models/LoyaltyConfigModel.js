const BaseModel = require('./BaseModel');

class LoyaltyConfigModel extends BaseModel {
    constructor() {
        super('loyalty_config');
    }

    findByKey(configKey) {
        return this.db(this.tableName).where({ config_key: configKey }).first();
    }

    updateByKey(configKey, data) {
        return this.db(this.tableName).where({ config_key: configKey }).update(data);
    }
}
module.exports = new LoyaltyConfigModel();
