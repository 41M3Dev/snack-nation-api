const RewardModel = require('../models/RewardModel');

const getAll = async (req, res) => {
    try {
        const rewards = await RewardModel.findAllActive();

        return res.status(200).json({
            success: true,
            data: rewards,
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

const getAllAdmins = async (req, res) => {
    try {
        const rewards = await RewardModel.findAll();

        return res.status(200).json({
            success: true,
            data: rewards,
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
}

const getById = async (req, res) => {
    try {
        const reward = await RewardModel.findById(req.params.id);

        if (!reward) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Récompense non trouvée',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: reward,
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
        const result = await RewardModel.create(req.body);

        return res.status(201).json({
            success: true,
            data: {
                id: result[0],
                ...req.body,
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
        const updated = await RewardModel.update(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Récompense non trouvée',
                },
            });
        }

        const reward = await RewardModel.findById(req.params.id);

        return res.status(200).json({
            success: true,
            data: reward,
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

const remove = async (req, res) => {
    try {
        const deleted = await RewardModel.update(req.params.id, {
            is_active: 0,
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Récompense non trouvée',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                message: 'Récompense désactivée',
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

module.exports = {getAll, getById, create, update, remove, getAllAdmins};
