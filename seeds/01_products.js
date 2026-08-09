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
            name: "Cheese Burger",
            description: "Burger classique avec steak, salade, tomate et fromage",
            price: 8.50,
            category: "burger",
            image: "cheeseburger-fondant-simple.png",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Double Cheese Burger",
            description: "Burger avec double fromage fondant",
            price: 9.50,
            category: "burger",
            image: "double-cheeseburger-fondant.png",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Chicken Burger",
            description: "Burger au poulet croustillant",
            price: 9.00,
            category: "burger",
            image: "burger-poulet-croustillant.png",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Frites",
            description: "Frites croustillantes",
            price: 3.00,
            category: "accompagnement",
            image: "portion-de-frites-classiques.png",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Frites Chedar",
            description: "Frites croustillantes au chedar",
            price: 4.00,
            category: "accompagnement",
            image: "portion-de-frites-cheddar.png",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Crousti Cesar",
            description: "Une salades césar",
            price: 3.50,
            category: "accompagnement",
            image: "la-crousti-cesar.png",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Sprite",
            description: "Boisson gazeuse",
            price: 2.50,
            category: "boisson",
            image: "sprite.png",
            has_size_option: 1,
            is_available: 1
        },
        {
            name: "Eau",
            description: "Bouteille d'eau",
            price: 1.50,
            category: "boisson",
            image: "https://images.unsplash.com/photo-1553564552-02656d6a2390?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Ketchup",
            description: "Sauce ketchup",
            price: 0,
            category: "sauce",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdNljZTtQMKREquIg6iZyDbbAPIOqw0JzC5l9UPQnkgeI7IGzABbS8ZDw&s=10",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Mayonnaise",
            description: "Sauce mayonnaise",
            price: 0,
            category: "sauce",
            image: "https://www.yopongoelhielo.com/4105/mayonnaise-originale-heinz.jpg",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Veggie Burger",
            description: "Burger végétarien avec galette de légumes",
            price: 9.50,
            category: "burger",
            image: "spicy-avocado-black-bean-burger.png",
            has_size_option: 0,
            is_available: 1
        },
        {
            name: "Fish Burger",
            description: "Burger au poisson pané et sauce tartare",
            price: 9.50,
            category: "burger",
            image: "tresor-marin.png",
            has_size_option: 0,
            is_available: 1
        }
    ]);
};
