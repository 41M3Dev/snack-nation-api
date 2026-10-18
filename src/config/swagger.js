const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Snack Nation API',
            version: '1.0.0',
            description:
                "API REST pour Snack Nation, une borne de commande self-service (kiosque) avec gestion des produits, menus, commandes, clients et programme de fidelite.",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api`,
                description: 'Serveur local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        error: {
                            type: 'object',
                            properties: {
                                code: { type: 'integer', example: 400 },
                                message: { type: 'string', example: 'Message d\'erreur' },
                            },
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Admin Principal' },
                        email: { type: 'string', format: 'email', example: 'admin@snacknation.com' },
                        role: { type: 'string', enum: ['Administration', 'Préparation', 'Accueil'] },
                        is_active: { type: 'integer', enum: [0, 1], example: 1 },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' },
                    },
                },
                UserInput: {
                    type: 'object',
                    required: ['name', 'email', 'password', 'role'],
                    properties: {
                        name: { type: 'string', example: 'Employé Cuisine' },
                        email: { type: 'string', format: 'email', example: 'cuisine@snacknation.com' },
                        password: { type: 'string', format: 'password', minLength: 6, example: 'motdepasse' },
                        role: { type: 'string', enum: ['Administration', 'Préparation', 'Accueil'] },
                    },
                },
                Product: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Cheeseburger' },
                        description: { type: 'string', nullable: true },
                        price: { type: 'number', format: 'float', example: 6.5 },
                        category: { type: 'string', enum: ['burger', 'accompagnement', 'boisson', 'sauce'] },
                        image: { type: 'string', nullable: true },
                        has_size_option: { type: 'integer', enum: [0, 1] },
                        is_available: { type: 'integer', enum: [0, 1] },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' },
                    },
                },
                ProductInput: {
                    type: 'object',
                    required: ['name', 'price', 'category'],
                    properties: {
                        name: { type: 'string', example: 'Cheeseburger' },
                        description: { type: 'string' },
                        price: { type: 'number', format: 'float', example: 6.5 },
                        category: { type: 'string', enum: ['burger', 'accompagnement', 'boisson', 'sauce'] },
                        image: { type: 'string' },
                        has_size_option: { type: 'integer', enum: [0, 1] },
                        is_available: { type: 'integer', enum: [0, 1] },
                    },
                },
                Menu: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Menu Classique' },
                        price_base: { type: 'number', format: 'float', example: 9.9 },
                        image: { type: 'string', nullable: true },
                        is_active: { type: 'integer', enum: [0, 1] },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' },
                    },
                },
                MenuInput: {
                    type: 'object',
                    required: ['name', 'price_base', 'products'],
                    properties: {
                        name: { type: 'string', example: 'Menu Classique' },
                        price_base: { type: 'number', format: 'float', example: 9.9 },
                        image: { type: 'string' },
                        is_active: { type: 'integer', enum: [0, 1] },
                        products: {
                            type: 'array',
                            minItems: 1,
                            items: {
                                type: 'object',
                                properties: {
                                    product_id: { type: 'integer', example: 1 },
                                    is_default: { type: 'integer', enum: [0, 1] },
                                },
                            },
                        },
                    },
                },
                Customer: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        firstname: { type: 'string', nullable: true, example: 'Julie' },
                        phone: { type: 'string', example: '0612345678' },
                        points_balance: { type: 'integer', example: 120 },
                        is_active: { type: 'integer', enum: [0, 1] },
                        last_activity_at: { type: 'string', format: 'date-time', nullable: true },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' },
                    },
                },
                CustomerInput: {
                    type: 'object',
                    required: ['firstname', 'phone'],
                    properties: {
                        firstname: { type: 'string', example: 'Julie' },
                        phone: { type: 'string', example: '0612345678' },
                    },
                },
                CustomerRedeemInput: {
                    type: 'object',
                    required: ['reward_id'],
                    properties: {
                        reward_id: { type: 'integer', example: 1 },
                        order_id: { type: 'integer', nullable: true, example: 42 },
                    },
                },
                CustomerPointsInput: {
                    type: 'object',
                    required: ['points'],
                    properties: {
                        points: { type: 'integer', example: -20, description: 'Positif pour créditer, négatif pour retirer' },
                        description: { type: 'string', example: 'Correction manuelle' },
                    },
                },
                Reward: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Boisson offerte' },
                        description: { type: 'string', nullable: true },
                        points_required: { type: 'integer', example: 50 },
                        reward_type: { type: 'string', enum: ['product', 'discount'] },
                        reward_value: { type: 'number', format: 'float', nullable: true },
                        product_id: { type: 'integer', nullable: true },
                        is_active: { type: 'integer', enum: [0, 1] },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' },
                    },
                },
                RewardInput: {
                    type: 'object',
                    required: ['name', 'points_required', 'reward_type'],
                    properties: {
                        name: { type: 'string', example: 'Boisson offerte' },
                        description: { type: 'string' },
                        points_required: { type: 'integer', example: 50 },
                        reward_type: { type: 'string', enum: ['product', 'discount'] },
                        reward_value: { type: 'number', format: 'float' },
                        product_id: { type: 'integer' },
                        is_active: { type: 'integer', enum: [0, 1] },
                    },
                },
                LoyaltyConfig: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        config_key: { type: 'string', example: 'points_per_euro' },
                        config_value: { type: 'string', example: '2' },
                        description: { type: 'string', nullable: true },
                        updated_at: { type: 'string', format: 'date-time' },
                    },
                },
                LoyaltyConfigInput: {
                    type: 'object',
                    required: ['config_value'],
                    properties: {
                        config_value: { type: 'string', example: '2' },
                    },
                },
                LoyaltyTransaction: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        customer_id: { type: 'integer', example: 1 },
                        order_id: { type: 'integer', nullable: true },
                        reward_id: { type: 'integer', nullable: true },
                        type: { type: 'string', enum: ['earn', 'redeem', 'adjust'] },
                        points: { type: 'integer', example: 20 },
                        balance_after: { type: 'integer', example: 140 },
                        description: { type: 'string', nullable: true },
                        created_by: { type: 'integer', nullable: true },
                        created_at: { type: 'string', format: 'date-time' },
                    },
                },
                LoyaltyTransactionInput: {
                    type: 'object',
                    required: ['customer_id', 'type', 'points'],
                    properties: {
                        customer_id: { type: 'integer', example: 1 },
                        type: { type: 'string', enum: ['earn', 'redeem', 'adjust'] },
                        points: { type: 'integer', example: 20 },
                        order_id: { type: 'integer' },
                        reward_id: { type: 'integer' },
                        description: { type: 'string' },
                    },
                },
                OrderItemProduct: {
                    type: 'object',
                    required: ['type', 'product_id', 'quantity'],
                    properties: {
                        type: { type: 'string', enum: ['product'], example: 'product' },
                        product_id: { type: 'integer', example: 1 },
                        quantity: { type: 'integer', example: 2 },
                        size: { type: 'string', enum: ['normal', 'large'], example: 'normal' },
                    },
                },
                OrderItemMenu: {
                    type: 'object',
                    required: ['type', 'menu_id', 'quantity', 'products'],
                    properties: {
                        type: { type: 'string', enum: ['menu'], example: 'menu' },
                        menu_id: { type: 'integer', example: 1 },
                        quantity: { type: 'integer', example: 1 },
                        products: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    product_id: { type: 'integer', example: 3 },
                                    size: { type: 'string', enum: ['normal', 'large'] },
                                },
                            },
                        },
                    },
                },
                OrderInput: {
                    type: 'object',
                    required: ['total', 'source', 'items'],
                    properties: {
                        source: { type: 'string', enum: ['kiosk', 'counter', 'phone'] },
                        customer_id: { type: 'integer', nullable: true, example: 1 },
                        total: { type: 'number', format: 'float', example: 15.4 },
                        items: {
                            type: 'array',
                            items: {
                                oneOf: [
                                    { $ref: '#/components/schemas/OrderItemProduct' },
                                    { $ref: '#/components/schemas/OrderItemMenu' },
                                ],
                            },
                        },
                    },
                },
                Order: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        order_number: { type: 'string', example: 'SN-1735000000000' },
                        status: { type: 'string', enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'] },
                        total: { type: 'number', format: 'float', example: 15.4 },
                        source: { type: 'string', enum: ['kiosk', 'counter', 'phone'] },
                        user_id: { type: 'integer', nullable: true },
                        customer_id: { type: 'integer', nullable: true },
                        points_earned: { type: 'integer', example: 30 },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time', nullable: true },
                    },
                },
                OrderStatusInput: {
                    type: 'object',
                    required: ['status'],
                    properties: {
                        status: { type: 'string', enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'] },
                    },
                },
                LoginInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'admin@snacknation.com' },
                        password: { type: 'string', format: 'password', example: 'motdepasse' },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
        tags: [
            { name: 'Auth', description: 'Authentification' },
            { name: 'Produits', description: 'Gestion des produits' },
            { name: 'Menus', description: 'Gestion des menus' },
            { name: 'Commandes', description: 'Gestion des commandes' },
            { name: 'Clients', description: 'Gestion des clients et de la fidélité' },
            { name: 'Récompenses', description: 'Gestion des récompenses' },
            { name: 'Configuration fidélité', description: 'Paramètres du programme de fidélité' },
            { name: 'Transactions fidélité', description: 'Historique des mouvements de points' },
            { name: 'Utilisateurs', description: 'Gestion des utilisateurs (staff)' },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
