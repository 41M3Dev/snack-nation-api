/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable("products", (table) => {
        table.increments("id").primary();
        table.string("name",150).notNullable();
        table.text("description",'longtext');
        table.decimal("price",10,2).notNullable();
        table.enum('category', ['burger', 'accompagnement', 'boisson','sauce']).notNullable();
        table.string('image',255);
        table.tinyint('has_size_option').notNullable().defaultTo(0);
        table.tinyint('is_available').defaultTo(1);
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
