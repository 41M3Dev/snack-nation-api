/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("loyalty_transactions", (table) => {
        table.increments("id").primary();

        table.integer("customer_id").unsigned().notNullable()
            .references("id").inTable("customers")
            .onDelete("CASCADE");

        table.integer("order_id").unsigned()
            .references("id").inTable("orders")
            .onDelete("SET NULL");

        table.integer("reward_id").unsigned()
            .references("id").inTable("rewards")
            .onDelete("SET NULL");

        table.enum("type", ["earn","redeem","adjust"]).notNullable();
        table.integer("points").notNullable();
        table.integer("balance_after").notNullable();
        table.string("description",255);

        table.integer("created_by").unsigned()
            .references("id").inTable("users")
            .onDelete("SET NULL");

        table.datetime("created_at").notNullable().defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("loyalty_transactions");
};
