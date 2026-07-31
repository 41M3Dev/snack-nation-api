/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

    await knex('products').del();

    // Reset auto increment
    await knex.raw('ALTER TABLE products AUTO_INCREMENT = 1');

    // Insert fake data
    await knex('products').insert([
        {
            name: "Classic Burger",
            description: "Burger classique avec steak, salade, tomate et fromage",
            price: 8.50,
            category: "burger",
            image: "burger1.jpg",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Cheese Burger",
            description: "Burger avec double fromage fondant",
            price: 9.50,
            category: "burger",
            image: "burger2.jpg",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Chicken Burger",
            description: "Burger au poulet croustillant",
            price: 9.00,
            category: "burger",
            image: "burger3.jpg",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Frites",
            description: "Frites croustillantes",
            price: 3.00,
            category: "accompagnement",
            image: "fries.jpg",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Nuggets",
            description: "6 nuggets de poulet",
            price: 4.50,
            category: "accompagnement",
            image: "nuggets.jpg",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Coca-Cola",
            description: "Boisson gazeuse",
            price: 2.50,
            category: "boisson",
            image: "coca.jpg",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Eau",
            description: "Bouteille d'eau",
            price: 1.50,
            category: "boisson",
            image: "water.jpg",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Ketchup",
            description: "Sauce ketchup",
            price: 0,
            category: "sauce",
            image: "ketchup.jpg",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Mayonnaise",
            description: "Sauce mayonnaise",
            price: 0,
            category: "sauce",
            image: "mayo.jpg",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Veggie Burger",
            description: "Burger végétarien avec galette de légumes",
            price: 9.50,
            category: "burger",
            image: "veggie-burger.jpg",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Fish Burger",
            description: "Burger au poisson pané et sauce tartare",
            price: 9.50,
            category: "burger",
            image: "fish-burger.jpg",
            has_size_option: 1,
            is_available: 1
        }
    ]);
};
