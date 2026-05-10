/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
    exports.up = function(knex) {
        return knex.schema.createTable("orders", (table) => {
            table.increments("id").primary();
            table.string("order_number",20).notNullable();
            table.enum("status", ["pending","preparing","ready","delivered","cancelled"]).defaultTo("pending");
            table.decimal("total",10,2).notNullable();
            table.enum("source", ["kiosk","counter","phone"]).notNullable();

            table.integer("user_id").unsigned()
                .references("id").inTable("users")
                .onDelete("SET NULL");

            table.integer("customer_id").unsigned()
                .references("id").inTable("customers")
                .onDelete("SET NULL");

            table.integer("points_earned").defaultTo(0);
            table.datetime("created_at").notNullable().defaultTo(knex.fn.now());
            table.datetime("updated_at");
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("orders");

};
