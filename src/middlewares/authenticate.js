const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: true,
            message: "App -> Token não fornecido.",
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({
            error: true,
            message: "App -> Token inválido.",
        });
    }

    const [scheme, token] = parts;

    if (scheme.indexOf("Bearer") !== 0) {
        return res.status(401).json({
            error: true,
            message: "App -> Token mal formatado.",
        });
    }

    return jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "App -> Token inválido ou expirado.",
            });
        }

        req.userLogged = decoded;

        return next();
    });
};
