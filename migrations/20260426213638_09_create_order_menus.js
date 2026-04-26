/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable("order_menus", (table) => {
        table.increments("id").primary();

        table.integer("order_id").unsigned().notNullable()
            .references("id").inTable("orders")
            .onDelete("CASCADE");

        table.integer("menu_id").unsigned().notNullable()
            .references("id").inTable("menus");

        table.integer("quantity").defaultTo(1);
        table.decimal("unit_price",10,2).notNullable();
        table.decimal("supplements_total",10,2).defaultTo(0);
        table.decimal("line_total",10,2).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable("order_menus");
};
