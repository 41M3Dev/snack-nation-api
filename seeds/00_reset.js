/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

    // Désactive les contraintes FK (sécurité)
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');

    //  Tables dépendantes (commandes)
    await knex('loyalty_transactions').del();
    await knex('order_menu_items').del();
    await knex('order_menus').del();
    await knex('order_lines').del();
    await knex('orders').del();

    //  Relations menus
    await knex('menus_has_products').del();

    //  Tables liées produits / fidélité
    await knex('rewards').del();

    //  Tables principales
    await knex('menus').del();
    await knex('products').del();
    await knex('customers').del();
    await knex('users').del();
    await knex('loyalty_config').del();

    // Réactive les FK
    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};