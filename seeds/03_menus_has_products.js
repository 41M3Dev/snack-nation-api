/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

    await knex('menus_has_products').del();

    // Insert relations menu <-> produits
    await knex('menus_has_products').insert([

        // Menu Classic (id:1) - public adulte, tous les burgers viande/poisson
        { menu_id: 1, product_id: 1, is_default: 1 },  // Classic Burger (vedette)
        { menu_id: 1, product_id: 2, is_default: 0 },  // Cheese Burger
        { menu_id: 1, product_id: 3, is_default: 0 },  // Chicken Burger
        { menu_id: 1, product_id: 11, is_default: 0 }, // Fish Burger
        { menu_id: 1, product_id: 4, is_default: 1 },  // Frites (vedette)
        { menu_id: 1, product_id: 5, is_default: 0 },  // Nuggets
        { menu_id: 1, product_id: 6, is_default: 1 },  // Coca-Cola (vedette)
        { menu_id: 1, product_id: 7, is_default: 0 },  // Eau
        { menu_id: 1, product_id: 8, is_default: 1 },  // Ketchup (vedette)
        { menu_id: 1, product_id: 9, is_default: 0 },  // Mayonnaise

        // Menu Cheese (id:2) - même composition, vedette = Cheese Burger
        { menu_id: 2, product_id: 1, is_default: 0 },  // Classic Burger
        { menu_id: 2, product_id: 2, is_default: 1 },  // Cheese Burger (vedette)
        { menu_id: 2, product_id: 3, is_default: 0 },  // Chicken Burger
        { menu_id: 2, product_id: 11, is_default: 0 }, // Fish Burger
        { menu_id: 2, product_id: 4, is_default: 1 },  // Frites (vedette)
        { menu_id: 2, product_id: 5, is_default: 0 },  // Nuggets
        { menu_id: 2, product_id: 6, is_default: 1 },  // Coca-Cola (vedette)
        { menu_id: 2, product_id: 7, is_default: 0 },  // Eau
        { menu_id: 2, product_id: 8, is_default: 1 },  // Ketchup (vedette)
        { menu_id: 2, product_id: 9, is_default: 0 },  // Mayonnaise

        // Menu Chicken (id:3) - même composition, vedette = Chicken Burger
        { menu_id: 3, product_id: 1, is_default: 0 },  // Classic Burger
        { menu_id: 3, product_id: 2, is_default: 0 },  // Cheese Burger
        { menu_id: 3, product_id: 3, is_default: 1 },  // Chicken Burger (vedette)
        { menu_id: 3, product_id: 11, is_default: 0 }, // Fish Burger
        { menu_id: 3, product_id: 4, is_default: 1 },  // Frites (vedette)
        { menu_id: 3, product_id: 5, is_default: 0 },  // Nuggets
        { menu_id: 3, product_id: 6, is_default: 1 },  // Coca-Cola (vedette)
        { menu_id: 3, product_id: 7, is_default: 0 },  // Eau
        { menu_id: 3, product_id: 8, is_default: 1 },  // Ketchup (vedette)
        { menu_id: 3, product_id: 9, is_default: 0 },  // Mayonnaise

        // Menu Maxi (id:4) - version premium, tous les burgers, vedette = Classic Burger
        { menu_id: 4, product_id: 1, is_default: 1 },  // Classic Burger (vedette)
        { menu_id: 4, product_id: 2, is_default: 0 },  // Cheese Burger
        { menu_id: 4, product_id: 3, is_default: 0 },  // Chicken Burger
        { menu_id: 4, product_id: 11, is_default: 0 }, // Fish Burger
        { menu_id: 4, product_id: 4, is_default: 1 },  // Frites (vedette)
        { menu_id: 4, product_id: 5, is_default: 0 },  // Nuggets
        { menu_id: 4, product_id: 6, is_default: 1 },  // Coca-Cola (vedette)
        { menu_id: 4, product_id: 7, is_default: 0 },  // Eau
        { menu_id: 4, product_id: 8, is_default: 1 },  // Ketchup (vedette)
        { menu_id: 4, product_id: 9, is_default: 0 },  // Mayonnaise

        // Menu Enfant (id:5) - composition simplifiée adaptée aux enfants
        { menu_id: 5, product_id: 1, is_default: 1 },  // Classic Burger (vedette)
        { menu_id: 5, product_id: 2, is_default: 0 },  // Cheese Burger
        { menu_id: 5, product_id: 4, is_default: 1 },  // Frites (vedette)
        { menu_id: 5, product_id: 5, is_default: 0 },  // Nuggets
        { menu_id: 5, product_id: 6, is_default: 0 },  // Coca-Cola
        { menu_id: 5, product_id: 7, is_default: 1 },  // Eau (vedette)
        { menu_id: 5, product_id: 8, is_default: 1 },  // Ketchup (vedette, pas de Mayo pour enfants)

        // Menu Veggie (id:6) - sans viande, Veggie Burger et Fish Burger
        { menu_id: 6, product_id: 10, is_default: 1 }, // Veggie Burger (vedette)
        { menu_id: 6, product_id: 11, is_default: 0 }, // Fish Burger
        { menu_id: 6, product_id: 4, is_default: 1 },  // Frites (vedette)
        { menu_id: 6, product_id: 5, is_default: 0 },  // Nuggets
        { menu_id: 6, product_id: 6, is_default: 1 },  // Coca-Cola (vedette)
        { menu_id: 6, product_id: 7, is_default: 0 },  // Eau
        { menu_id: 6, product_id: 8, is_default: 1 },  // Ketchup (vedette)
        { menu_id: 6, product_id: 9, is_default: 0 }   // Mayonnaise
    ]);
};
