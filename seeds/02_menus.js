/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {


    // Reset auto increment
    await knex.raw('ALTER TABLE menus AUTO_INCREMENT = 1');

    // Insert fake menus
    await knex('menus').insert([
        {
            name: "Menu Classic",
            price_base: 10.50,
            is_active: 1,
            image: "cheeseburger-fondant-simple.png"

        },
        {
            name: "Menu Cheese",
            price_base: 11.50,
            image: "double-cheeseburger-fondant.png",
            is_active: 1
        },
        {
            name: "Menu Chicken",
            price_base: 11.00,
            image: "burger-poulet-croustillant.png",
            is_active: 1
        },
        {
            name: "Menu Maxi",
            price_base: 13.50,
            image: "burger-poulet-croustillant.png",
            is_active: 1
        },
        {
            name: "Menu Enfant",
            price_base: 7.50,
            image: "cheeseburger-fondant-simple.png",
            is_active: 1
        },
        {
            name: "Menu Veggie",
            price_base: 10.00,
            image: "tresor-marin.png",
            is_active: 1
        }
    ]);
};