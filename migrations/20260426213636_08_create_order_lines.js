/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable("order_lines", (table) => {
        table.increments("id").primary();

        table.integer("order_id").unsigned().notNullable()
            .references("id").inTable("orders")
            .onDelete("CASCADE");

        table.integer("product_id").unsigned().notNullable()
            .references("id").inTable("products");

        table.integer("quantity").defaultTo(1);
        table.enum("size", ["normal","large"]).defaultTo("normal");
        table.decimal("unit_price",10,2).notNullable();
        table.decimal("size_supplement",10,2).defaultTo(0);
        table.decimal("line_total",10,2).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("order_lines");
};
