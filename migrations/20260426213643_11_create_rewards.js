/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable("rewards", (table) => {
        table.increments("id").primary();
        table.string("name",100).notNullable();
        table.string("description",255);
        table.integer("points_required").notNullable();

        table.enum("reward_type", ["product","discount"]).notNullable();
        table.decimal("reward_value",10,2);

        table.integer("product_id").unsigned()
            .references("id").inTable("products")
            .onDelete("SET NULL");

        table.tinyint ("is_active").defaultTo(1);
        table.datetime("created_at").notNullable().defaultTo(knex.fn.now());
        table.datetime("updated_at");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("rewards");
};
