const CustomerModel = require('../models/CustomerModel');
const LoyaltyTransactionModel = require('../models/LoyaltyTransactionModel');
const RewardModel = require('../models/RewardModel');

const getAll = async (req, res) => {
    try {
        const customers = await CustomerModel.findAll();

        return res.status(200).json({
            success: true,
            data: customers,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: 500,
                message: error.message,
            },
        });
    }
};

const getByPhone = async (req, res) => {
    try {
        const customer = await CustomerModel.findByPhone(req.params.phone);

        if (!customer) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Client non trouvé',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: customer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: 500,
                message: error.message,
            },
        });
    }
};

const getById = async (req, res) => {
    try {
        const customer = await CustomerModel.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Client non trouvé',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: customer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: 500,
                message: error.message,
            },
        });
    }
};

const getTransactions = async (req, res) => {
    try {
        const customer = await CustomerModel.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Client non trouvé',
                },
            });
        }

        const transactions = await LoyaltyTransactionModel.findByCustomer(req.params.id);

        return res.status(200).json({
            success: true,
            data: transactions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: 500,
                message: error.message,
            },
        });
    }
};

const create = async (req, res) => {
    try {
        const existingCustomer = await CustomerModel.findByPhone(req.body.phone);

        if (existingCustomer) {
            return res.status(409).json({
                success: false,
                error: {
                    code: 409,
                    message: 'Ce numéro de téléphone existe déjà',
                },
            });
        }

        const result = await CustomerModel.create({
            firstname: req.body.firstname,
            phone: req.body.phone,
        });

        const newCustomer = await CustomerModel.findById(result[0]);
        return res.status(201).json({
            success: true,
            data: {
                id: newCustomer.id,
                firstname: newCustomer.firstname,
                phone: newCustomer.phone,
                points_balance: newCustomer.points_balance,
                created_at: newCustomer.created_at,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: 500,
                message: error.message,
            },
        });
    }
};

const update = async (req, res) => {
    try {
        const updated = await CustomerModel.update(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Client non trouvé',
                },
            });
        }

        const customer = await CustomerModel.findById(req.params.id);

        return res.status(200).json({
            success: true,
            data: customer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: 500,
                message: error.message,
            },
        });
    }
};

/**
 * Applique une récompense : débite les points du client et enregistre
 * la transaction de type 'redeem'.
 */
const redeem = async (req, res) => {
    try {
        const customer = await CustomerModel.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Client non trouvé',
                },
            });
        }

        const reward = await RewardModel.findById(req.body.reward_id);

        if (!reward) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Récompense non trouvée',
                },
            });
        }

        if (!reward.is_active) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 400,
                    message: 'Cette récompense n\'est plus disponible',
                },
            });
        }

        const transaction = await LoyaltyTransactionModel.createTransaction({
            customer_id: customer.id,
            order_id: req.body.order_id,
            reward_id: reward.id,
            type: 'redeem',
            points: reward.points_required,
            description: `Récompense utilisée : ${reward.name}`,
            created_by: req.user.id,
        });

        const updatedCustomer = await CustomerModel.findById(customer.id);

        return res.status(201).json({
            success: true,
            data: {
                transaction,
                reward,
                points_balance: updatedCustomer.points_balance,
            },
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: {
                code: 400,
                message: error.message,
            },
        });
    }
};

/**
 * Modification manuelle des points (Administration).
 * Les points sont ajoutés (valeur positive) ou retirés (valeur négative)
 * et l'opération est tracée dans les transactions de type 'adjust'.
 */
const updatePoints = async (req, res) => {
    try {
        const customer = await CustomerModel.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Client non trouvé',
                },
            });
        }

        const transaction = await LoyaltyTransactionModel.createTransaction({
            customer_id: customer.id,
            type: 'adjust',
            points: req.body.points,
            description: req.body.description || 'Ajustement manuel des points',
            created_by: req.user.id,
        });

        const updatedCustomer = await CustomerModel.findById(customer.id);

        return res.status(200).json({
            success: true,
            data: {
                transaction,
                points_balance: updatedCustomer.points_balance,
            },
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: {
                code: 400,
                message: error.message,
            },
        });
    }
};

module.exports = { getAll, getByPhone, getById, getTransactions, create, update, redeem, updatePoints };
