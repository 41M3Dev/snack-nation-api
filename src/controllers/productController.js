const ProductModel = require('../models/ProductModel');

const getAll = async (req, res) => {
    try {
        const products = await ProductModel.findAllAvailable();

        return res.status(200).json({
            success: true,
            data: products,
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
        const products = await ProductModel.findAll();

        return res.status(200).json({
            success: true,
            data: products,
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
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Produit non trouvé',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
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
        const result = await ProductModel.create(req.body);

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
        const updated = await ProductModel.update(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Produit non trouvé',
                },
            });
        }

        const product = await ProductModel.findById(req.params.id);

        return res.status(200).json({
            success: true,
            data: product,
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
        const deleted = await ProductModel.update(req.params.id, {
            is_available: 0,
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Produit non trouvé',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                message: 'Produit désactivé',
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

module.exports = {getAll,getById, create, update, remove,getAllAdmins};