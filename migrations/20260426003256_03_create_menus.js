/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('menus', (table) => {
        table.increments('id').primary();
        table.string('name', 150).notNullable();
        table.decimal('price_base', 10, 2).notNullable();
        table.tinyint('is_active').notNullable().defaultTo(1);
        table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('menus');
};
