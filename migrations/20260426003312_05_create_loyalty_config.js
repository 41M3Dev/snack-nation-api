/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("loyalty_config", (table) => {
        table.increments("id").primary();
        table.string("config_key",50).notNullable().unique();
        table.string("config_value",100).notNullable();
        table.string("description",255);
        table.datetime("updated_at");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("loyalty_config");
};
