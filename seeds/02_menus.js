/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

    // Supprime tout
    await knex('menus').del();

    // Reset auto increment
    await knex.raw('ALTER TABLE menus AUTO_INCREMENT = 1');

    // Insert fake menus
    await knex('menus').insert([
        {
            name: "Menu Classic",
            price_base: 10.50,
            is_active: 1
        },
        {
            name: "Menu Cheese",
            price_base: 11.50,
            is_active: 1
        },
        {
            name: "Menu Chicken",
            price_base: 11.00,
            is_active: 1
        },
        {
            name: "Menu Maxi",
            price_base: 13.50,
            is_active: 1
        },
        {
            name: "Menu Enfant",
            price_base: 7.50,
            is_active: 1
        },
        {
            name: "Menu Veggie",
            price_base: 10.00,
            is_active: 1
        }
    ]);
};