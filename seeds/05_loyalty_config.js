/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {


    // Reset auto increment
    await knex.raw('ALTER TABLE loyalty_config AUTO_INCREMENT = 1');

    // Insert config
    await knex('loyalty_config').insert([
        {
            config_key: "points_per_euro",
            config_value: "2",
            description: "Nombre de points gagnés par euro dépensé"
        },
        {
            config_key: "size_supplement",
            config_value: "0.50",
            description: "Supplément pour taille large"
        },
        {
            config_key: "points_expiration_months",
            config_value: "12",
            description: "Durée avant expiration des points (mois)"
        }
    ]);
};