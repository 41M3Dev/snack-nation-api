/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

    const password = "$2b$10$sAP0eChQAxKgHIi0fCvhC.r8VKLrYajMpYsqPHoNeuI/MJyRYnBlC";


    // Reset auto increment
    await knex.raw('ALTER TABLE users AUTO_INCREMENT = 1');

    // Insert users
    await knex('users').insert([
        {
            name: "Admin Principal",
            email: "admin@snacknation.com",
            password: password,
            role: "administration",
            is_active: 1
        },
        {
            name: "Employé Cuisine",
            email: "cuisine@snacknation.com",
            password: password,
            role: "preparation",
            is_active: 1
        },
        {
            name: "Employé Accueil",
            email: "accueil@snacknation.com",
            password: password,
            role: "accueil",
            is_active: 1
        },
        {
            name: "Test User",
            email: "test@snacknation.com",
            password: password,
            role: "accueil",
            is_active: 0
        }
    ]);
};