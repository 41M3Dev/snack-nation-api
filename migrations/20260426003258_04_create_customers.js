/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('customers', (table) => {
        table.increments('id').primary();
        table.string('firstname', 150);
        table.string('phone',20).notNullable().unique();
        table.integer('points_balance').defaultTo(0).notNullable();
        table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('last_activity_at');
        table.tinyint('is_active').notNullable().defaultTo(1);

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('customers');
};
