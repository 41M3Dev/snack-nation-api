const MenuModel = require('../models/MenuModel');
const db = require('../config/database');

const getAllAdmin = async (req, res) => {
    try {
        const menus = await MenuModel.findAll();

        for (const menu of menus) {
            menu.products = await db('menus_has_products')
                .join('products', 'menus_has_products.product_id', 'products.id')
                .where('menus_has_products.menu_id', menu.id)
                .select('products.*');
        }

        return res.status(200).json({
            success: true,
            data: menus,
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
const getAll = async (req, res) => {
    try {
        const menus = await MenuModel.findAllAvailable();

        for (const menu of menus) {
            menu.products = await db('menus_has_products')
                .join('products', 'menus_has_products.product_id', 'products.id')
                .where('menus_has_products.menu_id', menu.id)
                .select('products.*');
        }

        return res.status(200).json({
            success: true,
            data: menus,
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
        const menu = await MenuModel.findById(req.params.id);

        if (!menu) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Menu non trouvé',
                },
            });
        }

        menu.products = await db('menus_has_products')
            .join('products', 'menus_has_products.product_id', 'products.id')
            .where('menus_has_products.menu_id', menu.id)
            .select('products.*');

        return res.status(200).json({
            success: true,
            data: menu,
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
    const { products, ...menuData } = req.body;

    try {
        const result = await MenuModel.create(menuData);
        const menuId = result[0];

        if (products && products.length > 0) {
            const menuProducts = products.map((productId) => ({
                menu_id: menuId,
                product_id: productId,
            }));

            await db('menus_has_products').insert(menuProducts);
        }

        const menu = await MenuModel.findById(menuId);

        menu.products = await db('menus_has_products')
            .join('products', 'menus_has_products.product_id', 'products.id')
            .where('menus_has_products.menu_id', menuId)
            .select('products.*');

        return res.status(201).json({
            success: true,
            data: menu,
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
    const { products, ...menuData } = req.body;

    try {
        const updated = await MenuModel.update(req.params.id, menuData);

        if (!updated) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Menu non trouvé',
                },
            });
        }

        if (products) {
            await db('menus_has_products').where({ menu_id: req.params.id }).del();

            if (products.length > 0) {
                const menuProducts = products.map((productId) => ({
                    menu_id: req.params.id,
                    product_id: productId,
                }));

                await db('menus_has_products').insert(menuProducts);
            }
        }

        const menu = await MenuModel.findById(req.params.id);

        menu.products = await db('menus_has_products')
            .join('products', 'menus_has_products.product_id', 'products.id')
            .where('menus_has_products.menu_id', req.params.id)
            .select('products.*');

        return res.status(200).json({
            success: true,
            data: menu,
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
        const deleted = await MenuModel.update(req.params.id, {
            is_active: 0,
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Menu non trouvé',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                message: 'Menu désactivé',
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

module.exports = {
    getAll,
    getAllAdmin,
    getById,
    create,
    update,
    remove,
};