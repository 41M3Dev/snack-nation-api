const LoyaltyTransactionModel = require('../models/LoyaltyTransactionModel');

const getAll = async (req, res) => {
    try {
        const transactions = await LoyaltyTransactionModel.findAll();

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

const getByCustomer = async (req, res) => {
    try {
        const transactions = await LoyaltyTransactionModel.findByCustomer(req.params.customerId);

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
        const transaction = await LoyaltyTransactionModel.createTransaction({
            ...req.body,
            created_by: req.user.id,
        });

        return res.status(201).json({
            success: true,
            data: transaction,
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

module.exports = { getAll, getByCustomer, create };
