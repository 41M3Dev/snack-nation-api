const jwt = require('jsonwebtoken');

const authenticate =(req, res,next) => {
    const authHeader  = req.headers.authorization;
    if (!authHeader ) {
        return res.status(401).json({
            success: false,
            error: {
                code: 401,
                message: 'Token manquant',
            },
        });
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({
            success: false,
            error: {
                code: 401,
                message: 'Token invalide',
            },
        })
    }
}
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 401,
                    message: 'Non authentifié',
                },
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: {
                    code: 403,
                    message: 'Accès interdit',
                },
            });
        }

        next();
    };
};
module.exports = {authenticate,authorize};