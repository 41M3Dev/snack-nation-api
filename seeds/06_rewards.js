/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

    // Reset auto increment
    await knex.raw('ALTER TABLE rewards AUTO_INCREMENT = 1');

    // Insert fake data
    await knex('rewards').insert([
        {
            name: "Boisson offerte",
            description: "Une boisson taille normale offerte",
            points_required: 100,
            reward_type: "product",
            is_active: 1
        },
        {
            name: "Accompagnement offert",
            description: "Un accompagnement taille normale offert",
            points_required: 200,
            reward_type: "product",
            is_active: 1
        },
        {
            name: "Menu offert",
            description: "Un menu offert",
            points_required: 500,
            reward_type: "product",
            is_active: 1
        },
        {
            name: "Réduction 10€",
            description: "10 € de réduction sur la commande",
            points_required: 1000,
            reward_type: "discount",
            reward_value: 10.00,
            is_active: 1
        }
    ]);
};
