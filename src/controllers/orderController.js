const OrderModel = require('../models/OrderModel');

const getSizeSupplement = (size) => {
    return size === 'large' ? 0.5 : 0;
};

const create = async (req, res) => {
    const { source, customer_id, total, items } = req.body;

    try {
        const orderNumber = `SN-${Date.now()}`;

        const result = await OrderModel.create({
            order_number: orderNumber,
            source,
            customer_id,
            total,
        });

        const orderId = result[0];

        for (const item of items) {
            if (item.type === 'product') {
                const product = await OrderModel.db('products')
                    .where({ id: item.product_id })
                    .first();

                if (!product) {
                    return res.status(404).json({
                        success: false,
                        error: {
                            code: 404,
                            message: 'Produit non trouvé',
                        },
                    });
                }

                const unitPrice = Number(product.price) + getSizeSupplement(item.size);
                const lineTotal = unitPrice * item.quantity;

                await OrderModel.db('order_lines').insert({
                    order_id: orderId,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    size: item.size,
                    unit_price: unitPrice,
                    line_total: lineTotal,
                });
            }

            if (item.type === 'menu') {
                const menu = await OrderModel.db('menus')
                    .where({ id: item.menu_id })
                    .first();

                if (!menu) {
                    return res.status(404).json({
                        success: false,
                        error: {
                            code: 404,
                            message: 'Menu non trouvé',
                        },
                    });
                }

                let sizeSupplement = 0;

                for (const product of item.products) {
                    sizeSupplement += getSizeSupplement(product.size);
                }

                const unitPrice = Number(menu.price_base) + sizeSupplement;
                const lineTotal = unitPrice * item.quantity;

                const menuResult = await OrderModel.db('order_menus').insert({
                    order_id: orderId,
                    menu_id: item.menu_id,
                    quantity: item.quantity,
                    unit_price: unitPrice,
                    line_total: lineTotal,
                });

                const orderMenuId = menuResult[0];

                const menuProducts = item.products.map((product) => ({
                    order_menu_id: orderMenuId,
                    product_id: product.product_id,
                    size: product.size,
                }));

                if (menuProducts.length > 0) {
                    await OrderModel.db('order_menu_items').insert(menuProducts);
                }
            }
        }

        return res.status(201).json({
            success: true,
            data: {
                id: orderId,
                order_number: orderNumber,
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

const getAll = async (req, res) => {
    try {
        const orders = await OrderModel.findAll();

        return res.status(200).json({
            success: true,
            data: orders,
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
        const order = await OrderModel.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Commande non trouvée',
                },
            });
        }
        
        order.products = await OrderModel.db('order_lines')
            .join('products', 'order_lines.product_id', 'products.id')
            .where('order_lines.order_id', req.params.id)
            .select('order_lines.*', 'products.name');

        order.menus = await OrderModel.db('order_menus')
            .join('menus', 'order_menus.menu_id', 'menus.id')
            .where('order_menus.order_id', req.params.id)
            .select('order_menus.*', 'menus.name');

        for (const menu of order.menus) {
            menu.products = await OrderModel.db('order_menu_items')
                .join('products', 'order_menu_items.product_id', 'products.id')
                .where('order_menu_items.order_menu_id', menu.id)
                .select('order_menu_items.*', 'products.name');
        }

        return res.status(200).json({
            success: true,
            data: order,
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

const updateStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const updated = await OrderModel.update(req.params.id, { status });

        if (!updated) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    message: 'Commande non trouvée',
                },
            });
        }

        const order = await OrderModel.findById(req.params.id);

        return res.status(200).json({
            success: true,
            data: order,
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
    create,
    getAll,
    getById,
    updateStatus,
};