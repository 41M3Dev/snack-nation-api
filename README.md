# Snack Nation API

API REST pour Snack Nation, une borne de commande self-service (kiosque) avec gestion des produits, menus, commandes, clients et programme de fidelite.

Construite avec Node.js, Express 5 et MySQL (via Knex.js).

## Sommaire

1. Stack technique
2. Architecture du projet
3. Prerequis
4. Installation
5. Configuration (.env)
6. Base de donnees : migrations et seeds
7. Lancer le projet
8. Docker
9. Authentification et roles
10. Documentation de l'API
11. Format des reponses
12. Securite

## Stack technique

- Runtime : Node.js
- Framework HTTP : Express 5
- Base de donnees : MySQL 8
- Query builder / migrations : Knex.js
- Authentification : JSON Web Token (jsonwebtoken)
- Hash des mots de passe : bcrypt
- Validation : express-validator
- Securite HTTP : helmet, cors, express-rate-limit, xss-clean
- Logs : morgan
- Dev : nodemon

## Architecture du projet

    snack-nation-api/
    |-- app.js                    Point d'entree Express
    |-- knexfile.js               Config Knex (dev/production)
    |-- docker-entrypoint.sh      Migration + seed + demarrage (Docker)
    |-- migrations/               Schema de la base (Knex)
    |-- seeds/                    Donnees de demonstration
    `-- src/
        |-- config/
        |   `-- database.js       Instance Knex connectee a MySQL
        |-- controllers/          Logique metier par ressource
        |-- models/               Acces aux donnees (herite de BaseModel)
        |-- routes/                Declaration des routes Express par ressource
        `-- middlewares/
            |-- auth.js            authenticate (JWT) + authorize (roles)
            |-- validate.js        Gestion des erreurs express-validator
            `-- validators/        Regles de validation par ressource

## Prerequis

- Node.js version 18 ou superieure
- MySQL version 8 ou superieure
- npm

## Installation

    git clone https://github.com/41M3Dev/snack-nation-api.git
    cd snack-nation-api
    npm install

## Configuration (.env)

Copier le fichier d'exemple puis renseigner vos valeurs :

    cp .env.example .env

Variables disponibles :

- PORT : port d'ecoute de l'API (ex: 3000)
- NODE_ENV : environnement, "development" ou "production"
- DB_HOST : hote MySQL (ex: localhost)
- DB_PORT : port MySQL (ex: 3306)
- DB_USER : utilisateur MySQL
- DB_PASSWORD : mot de passe MySQL
- DB_NAME : nom de la base (ex: snack_nation)
- JWT_SECRET : cle secrete de signature des tokens JWT (chaine aleatoire forte)
- JWT_EXPIRES_IN : duree de validite du token (ex: 24h)
- KIOSK_URL : URL du front-end borne (kiosque)
- BACK_OFFICE_URL : URL du front-end back-office

## Base de donnees : migrations et seeds

Creer au prealable la base MySQL vide (nom = DB_NAME), puis executer les migrations :

    npx knex migrate:latest

Charger les donnees de demonstration (produits, menus, utilisateurs, config fidelite, recompenses) :

    npx knex seed:run

Autres commandes utiles :

    npx knex migrate:rollback   annule la derniere migration
    npx knex migrate:status     affiche l'etat des migrations

Tables principales : users, products, menus, menus_has_products, customers, orders, order_lines, order_menus, order_menu_items, rewards, loyalty_config, loyalty_transactions.

## Lancer le projet

Mode developpement (rechargement automatique avec nodemon) :

    npm run dev

Mode production :

    npm start

L'API est alors disponible sur http://localhost:3000 (ou le PORT configure).

## Docker

Le Dockerfile fourni construit une image Node 20 Alpine. Au demarrage du conteneur, docker-entrypoint.sh execute automatiquement les migrations et les seeds en environnement "production", puis lance le serveur.

    docker build -t snack-nation-api .
    docker run -p 3000:3000 --env-file .env snack-nation-api

Attention : le conteneur doit pouvoir joindre une base MySQL via les variables DB_HOST / DB_PORT / DB_USER / DB_PASSWORD / DB_NAME (par exemple un conteneur MySQL sur le meme reseau Docker).

## Authentification et roles

L'authentification se fait par JWT. Apres connexion (POST /api/auth/login), le token doit etre transmis dans l'en-tete :

    Authorization: Bearer <token>

Trois roles existent :

- Administration : acces complet (gestion produits, menus, utilisateurs, recompenses, config fidelite).
- Preparation : gestion des commandes (suivi, changement de statut).
- Accueil : gestion des clients, points de fidelite et commandes.

Chaque route protegee precise les roles autorises via le middleware authorize(...roles).

## Documentation de l'API

Une documentation interactive Swagger est disponible sur :

    http://localhost:3000/api-docs

Base URL : /api

### Auth (/api/auth)

| Methode | Route  | Acces  | Description                              |
|---------|--------|--------|-------------------------------------------|
| POST    | /login | Public | Connexion (email + mot de passe), retourne un JWT |

### Produits (/api/products)

| Methode | Route      | Acces          | Description                          |
|---------|------------|----------------|---------------------------------------|
| GET     | /          | Public         | Liste des produits disponibles       |
| GET     | /admin/    | Administration | Liste complete des produits (admin)  |
| GET     | /:id       | Public         | Detail d'un produit                  |
| POST    | /admin/    | Administration | Creer un produit                     |
| PUT     | /:id       | Administration | Modifier un produit                  |
| DELETE  | /:id       | Administration | Supprimer un produit                 |

### Menus (/api/menus)

| Methode | Route   | Acces          | Description                       |
|---------|---------|----------------|-------------------------------------|
| GET     | /       | Public         | Liste des menus disponibles        |
| GET     | /admin  | Administration | Liste complete des menus (admin)   |
| GET     | /:id    | Public         | Detail d'un menu                   |
| POST    | /       | Administration | Creer un menu                      |
| PUT     | /:id    | Administration | Modifier un menu                   |
| DELETE  | /:id    | Administration | Supprimer un menu                  |

### Commandes (/api/orders)

| Methode | Route          | Acces                                  | Description                        |
|---------|----------------|-----------------------------------------|-------------------------------------|
| POST    | /              | Public                                  | Creer une commande (borne)         |
| GET     | /              | Administration, Preparation, Accueil    | Liste des commandes                |
| GET     | /:id           | Administration, Preparation, Accueil    | Detail d'une commande              |
| PATCH   | /:id/status    | Administration, Preparation, Accueil    | Mettre a jour le statut d'une commande |

### Clients (/api/customers)

| Methode | Route              | Acces                       | Description                                  |
|---------|--------------------|-------------------------------|------------------------------------------------|
| GET     | /phone/:phone      | Public                       | Rechercher un client par telephone            |
| POST    | /                  | Public                       | Creer un client                               |
| GET     | /                  | Administration, Accueil      | Liste des clients                             |
| GET     | /:id               | Administration, Accueil      | Detail d'un client                            |
| GET     | /:id/transactions  | Administration, Accueil      | Historique de fidelite d'un client            |
| POST    | /:id/redeem        | Administration, Accueil      | Echanger des points contre une recompense     |
| PUT     | /:id               | Administration, Accueil      | Modifier un client                            |
| PUT     | /:id/points        | Administration                | Ajuster manuellement les points d'un client   |

### Recompenses (/api/rewards)

| Methode | Route      | Acces          | Description                            |
|---------|------------|----------------|-------------------------------------------|
| GET     | /          | Public         | Liste des recompenses disponibles        |
| GET     | /admin/    | Administration | Liste complete des recompenses (admin)   |
| GET     | /:id       | Public         | Detail d'une recompense                  |
| POST    | /admin/    | Administration | Creer une recompense                     |
| PUT     | /:id       | Administration | Modifier une recompense                  |
| DELETE  | /:id       | Administration | Supprimer une recompense                 |

### Configuration fidelite (/api/loyalty-config)

| Methode | Route  | Acces          | Description                       |
|---------|--------|----------------|-------------------------------------|
| GET     | /      | Public         | Liste des parametres de fidelite   |
| GET     | /:key  | Public         | Detail d'un parametre              |
| PUT     | /:key  | Administration | Modifier un parametre              |

### Transactions fidelite (/api/loyalty-transactions)

| Methode | Route                 | Acces           | Description                          |
|---------|------------------------|-----------------|-----------------------------------------|
| GET     | /                      | Administration  | Liste de toutes les transactions       |
| GET     | /customer/:customerId  | Authentifie     | Transactions d'un client donne         |
| POST    | /                      | Administration  | Creer une transaction de fidelite      |

### Utilisateurs (/api/users)

| Methode | Route         | Acces          | Description                          |
|---------|---------------|----------------|-----------------------------------------|
| GET     | /             | Administration | Liste de tous les utilisateurs         |
| GET     | /active       | Administration | Liste des utilisateurs actifs          |
| GET     | /noactive     | Administration | Liste des utilisateurs inactifs        |
| GET     | /email/:email | Administration | Rechercher un utilisateur par email    |
| GET     | /:id          | Administration | Detail d'un utilisateur                |
| POST    | /             | Administration | Creer un utilisateur                   |
| PUT     | /:id          | Administration | Modifier un utilisateur                |
| DELETE  | /:id          | Administration | Supprimer un utilisateur               |

## Format des reponses

Les reponses suivent une structure homogene.

Succes :

    {
      "success": true,
      "data": { }
    }

Erreur :

    {
      "success": false,
      "error": {
        "code": 401,
        "message": "Token invalide"
      }
    }

## Securite

- Mots de passe hashes avec bcrypt.
- Authentification par JWT (en-tete Authorization: Bearer <token>).
- Autorisation par role sur chaque route sensible.
- En-tetes HTTP securises via helmet.
- Protection contre les injections XSS via xss-clean.
- Limitation du debit de requetes via express-rate-limit.
- Validation stricte des entrees via express-validator.
