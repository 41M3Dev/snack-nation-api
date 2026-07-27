const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const getAllAdmin = async (req, res) => {
    try {
        const users = await UserModel.findAllActive();

        return res.status(200).json({
            success: true,
            data: users,
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
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Utilisateur non trouvé',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
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

const getByEmail = async (req, res) => {
    try {
        const user = await UserModel.findByEmail(req.params.email);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Email disponible',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
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
        const existingUser = await UserModel.findByEmail(req.body.email);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: {
                    code: 409,
                    message: 'Cet email existe déjà',
                },
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = {
            ...req.body,
            password: hashedPassword,
        };

        const result = await UserModel.create(userData);

        return res.status(201).json({
            success: true,
            data: {
                id: result[0],
                email: userData.email,
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
        const updated = await UserModel.update(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Utilisateur non trouvé',
                },
            });
        }

        const user = await UserModel.findById(req.params.id);

        return res.status(200).json({
            success: true,
            data: user,
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
        const deleted = await UserModel.update(req.params.id, {
            is_active : 0,
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Utilisateur non trouvé',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                message: 'Utilisateur désactivé',
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

module.exports = {getAllAdmin,getById, create, update, remove, getByEmail};