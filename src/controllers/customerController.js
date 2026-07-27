const CustomerModel = require('../models/CustomerModel');

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

        return res.status(201).json({
            success: true,
            data: {
                id: result[0],
                firstname: req.body.firstname,
                phone: req.body.phone,
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

module.exports = { getAll, getByPhone, create, update };
