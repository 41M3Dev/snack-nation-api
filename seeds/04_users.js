/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

    const password = "$2b$10$bb2z8ga0U6BUaj4K2BvZduIgK.4WTr2H7msCmV9ktK3isx8qAXRc.";

    // Supprime tout
    await knex('users').del();

    // Reset auto increment
    await knex.raw('ALTER TABLE users AUTO_INCREMENT = 1');

    // Insert users
    await knex('users').insert([
        {
            name: "Admin Principal",
            email: "admin@wakdo.com",
            password: password,
            role: "administration",
            is_active: 1
        },
        {
            name: "Employé Cuisine",
            email: "cuisine@wakdo.com",
            password: password,
            role: "preparation",
            is_active: 1
        },
        {
            name: "Employé Accueil",
            email: "accueil@wakdo.com",
            password: password,
            role: "accueil",
            is_active: 1
        },
        {
            name: "Test User",
            email: "test@wakdo.com",
            password: password,
            role: "accueil",
            is_active: 0
        }
    ]);
};