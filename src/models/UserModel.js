const BaseModel = require('./BaseModel');

// Champs à exposer publiquement — on exclut password
const PUBLIC_FIELDS = [
    'id',
    'name',
    'email',
    'role',
    'is_active',
    'created_at',
    'updated_at',
];

class UserModel extends BaseModel {
    constructor() {
        super('users');
    }

    /** Surcharge : findAll sans le password. */
    findAll() {
        return this.db(this.tableName).select(PUBLIC_FIELDS);
    }

    /** Surcharge : findById sans le password. */
    findById(id) {
        return this.db(this.tableName).where({ id }).select(PUBLIC_FIELDS).first();
    }

    /** Recherche par email : GARDE le password (utilisé au login pour comparaison bcrypt). */
    findByEmail(email) {
        return this.db(this.tableName).where({ email }).first();
    }

    findAllActive() {
        return this.db(this.tableName).where({ is_active: 1 }).select(PUBLIC_FIELDS);
    }
    findAllNoActive() {
        return this.db(this.tableName).where({ is_active: 0 }).select(PUBLIC_FIELDS);
    }
}

module.exports = new UserModel();