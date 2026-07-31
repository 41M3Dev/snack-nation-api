const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: {
                code: 400,
                message: errors.array()[0].msg,
            },
        });
    }
    next();
};

module.exports = validate;