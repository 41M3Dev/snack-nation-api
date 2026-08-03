#!/bin/sh
set -e

npx knex migrate:latest --env production
npx knex seed:run --env production

exec node app.js
