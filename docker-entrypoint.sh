#!/bin/sh
set -e

# Vider la base si elle contient déjà des données, puis reconstruire
npx knex migrate:rollback --all --env production
npx knex migrate:latest --env production
npx knex seed:run --env production

exec node app.js