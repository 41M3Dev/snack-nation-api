const db = require('../config/database');

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
        this.db = db;
    }
    findAll() {
        return db(this.tableName).select('*');
    }

    findById(id) {
        return db(this.tableName).where({ id }).first();
    }

    create(data) {
        return db(this.tableName).insert(data);
    }

    update(id, data) {
        return db(this.tableName).where({ id }).update(data);
    }

    delete(id) {
        return db(this.tableName).where({ id }).del();
    }
}
module.exports = BaseModel;