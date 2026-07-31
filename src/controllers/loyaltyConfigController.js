const LoyaltyConfigModel = require('../models/LoyaltyConfigModel');

const getAll = async (req, res) => {
    try {
        const config = await LoyaltyConfigModel.findAll();

        return res.status(200).json({
            success: true,
            data: config,
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

const getByKey = async (req, res) => {
    try {
        const config = await LoyaltyConfigModel.findByKey(req.params.key);

        if (!config) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Configuration non trouvée',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: config,
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
        const updated = await LoyaltyConfigModel.updateByKey(req.params.key, {
            config_value: req.body.config_value,
            updated_at: new Date(),
        });

        if (!updated) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Configuration non trouvée',
                },
            });
        }

        const config = await LoyaltyConfigModel.findByKey(req.params.key);

        return res.status(200).json({
            success: true,
            data: config,
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

module.exports = { getAll, getByKey, update };
