/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {


    // Insert relations menu <-> produits
    await knex('menus_has_products').insert([

        // Menu Classic (id:1)
        { menu_id: 1, product_id: 1, is_default: 1 }, // Classic Burger
        { menu_id: 1, product_id: 4, is_default: 1 }, // Frites
        { menu_id: 1, product_id: 6, is_default: 1 }, // Coca-Cola
        { menu_id: 1, product_id: 8, is_default: 1 }, // Ketchup

        // Menu Cheese (id:2)
        { menu_id: 2, product_id: 2, is_default: 1 }, // Cheese Burger
        { menu_id: 2, product_id: 4, is_default: 1 }, // Frites
        { menu_id: 2, product_id: 6, is_default: 1 }, // Coca-Cola
        { menu_id: 2, product_id: 9, is_default: 1 }, // Mayonnaise

        // Menu Chicken (id:3)
        { menu_id: 3, product_id: 3, is_default: 1 }, // Chicken Burger
        { menu_id: 3, product_id: 4, is_default: 1 }, // Frites
        { menu_id: 3, product_id: 6, is_default: 1 }, // Coca-Cola
        { menu_id: 3, product_id: 8, is_default: 1 }, // Ketchup

        // Menu Maxi (id:4)
        { menu_id: 4, product_id: 2, is_default: 1 }, // Cheese Burger
        { menu_id: 4, product_id: 4, is_default: 1 }, // Frites
        { menu_id: 4, product_id: 6, is_default: 1 }, // Coca-Cola
        { menu_id: 4, product_id: 9, is_default: 1 }, // Mayonnaise

        // Menu Enfant (id:5)
        { menu_id: 5, product_id: 5, is_default: 1 }, // Nuggets
        { menu_id: 5, product_id: 4, is_default: 1 }, // Frites
        { menu_id: 5, product_id: 7, is_default: 1 }, // Eau
        { menu_id: 5, product_id: 8, is_default: 1 }  // Ketchup
    ]);
};