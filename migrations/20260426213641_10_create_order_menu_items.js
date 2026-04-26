/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable("order_menu_items", (table) => {
        table.increments("id").primary();

        table.integer("order_menu_id").unsigned().notNullable()
            .references("id").inTable("order_menus")
            .onDelete("CASCADE");

        table.integer("product_id").unsigned().notNullable()
            .references("id").inTable("products");

        table.enum("size", ["normal","large"]).defaultTo("normal");
        table.decimal("size_supplement",10,2).defaultTo(0);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("order_lines");
};
