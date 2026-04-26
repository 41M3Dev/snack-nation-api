/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
        return knex.schema.createTable("menus_has_products", (table) => {
            table.integer("menu_id").unsigned().notNullable()
                .references("id").inTable("menus")
                .onDelete("CASCADE");

            table.integer("product_id").unsigned().notNullable()
                .references("id").inTable("products");

            table.tinyint ("is_default").defaultTo(0);

            table.primary(["menu_id","product_id"]);
        })
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("menus_has_products");

};
