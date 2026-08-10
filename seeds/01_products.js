/**
 * @param { import("knex").Knex } knex
 * @returns { Promise }
 */
exports.seed = async function(knex) {

    await knex('products').del();

    // Reset auto increment
    await knex.raw('ALTER TABLE products AUTO_INCREMENT = 1');

    // Insert fake data
    await knex('products').insert([
        {
            name: "Cheese Burger",
            description: "Burger classique avec steak, salade, tomate et fromage",
            price: 8.50,
            category: "burger",
            image: "cheeseburger-fondant-simple.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Double Cheese Burger",
            description: "Burger avec double fromage fondant",
            price: 9.50,
            category: "burger",
            image: "double-cheeseburger-fondant.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Chicken Burger",
            description: "Burger au poulet croustillant",
            price: 9.00,
            category: "burger",
            image: "burger-poulet-croustillant.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Big Chief",
            description: "Burger signature avec steak, fromage et sauce spéciale",
            price: 10.50,
            category: "burger",
            image: "burger-signature-big-chief.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Gourmet BBQ Bacon Burger",
            description: "Burger gourmet avec bacon croustillant et sauce barbecue",
            price: 11.00,
            category: "burger",
            image: "gourmet-bbq-bacon-burger.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Mushroom Swiss Burger",
            description: "Burger avec champignons et fromage suisse",
            price: 10.50,
            category: "burger",
            image: "mushroom-swiss-burger.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Veggie Burger",
            description: "Burger végétarien avec galette de légumes",
            price: 9.50,
            category: "burger",
            image: "spicy-avocado-black-bean-burger.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Fish Burger",
            description: "Burger au poisson pané et sauce tartare",
            price: 9.50,
            category: "burger",
            image: "tresor-marin.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Frites",
            description: "Frites croustillantes",
            price: 3.00,
            category: "accompagnement",
            image: "portion-de-frites-classiques.webp",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Frites Cheddar",
            description: "Frites croustillantes au cheddar",
            price: 4.00,
            category: "accompagnement",
            image: "portion-de-frites-cheddar.webp",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Crousti Cesar",
            description: "Salade César croustillante",
            price: 3.50,
            category: "accompagnement",
            image: "la-crousti-cesar.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Nuggets",
            description: "Nuggets de poulet croustillants",
            price: 5.00,
            category: "accompagnement",
            image: "nuggets.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Sprite",
            description: "Boisson gazeuse Sprite",
            price: 2.50,
            category: "boisson",
            image: "sprite.webp",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Coca-Cola",
            description: "Boisson gazeuse Coca-Cola",
            price: 2.50,
            category: "boisson",
            image: "coca.webp",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Oasis",
            description: "Boisson fruitée Oasis",
            price: 2.50,
            category: "boisson",
            image: "Oasis.webp",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Capri-Sun",
            description: "Boisson fruitée Capri-Sun",
            price: 2.00,
            category: "boisson",
            image: "capri-sun.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Eau",
            description: "Bouteille d'eau",
            price: 1.50,
            category: "boisson",
            image: "eau.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Ketchup",
            description: "Sauce ketchup",
            price: 0,
            category: "sauce",
            image: "ketchup.webp",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Mayonnaise",
            description: "Sauce mayonnaise",
            price: 0,
            category: "sauce",
            image: "mayonnaise.webp",
            has_size_option: 0,
            is_available: 1
        }
    ]);
};