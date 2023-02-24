const jwt = require('jsonwebtoken')



const authUser = async (req, res, next) => {
    try {
        const getToken = req.header('authToken');
        if (!getToken) {
            return res.status(401).json({
                message: "UnAuthorized"
            })
        };

        jwt.verify(getToken, process.env.SECRECT_KEY,
            async (err, authUser) => {
                if (err) {
                    return res.status(403).json({
                        message: "Forbidden"
                    })
                }
                req.authUser = authUser;
                next();
            })
    } catch (error) {
        res.status(404).json({
            message: "not found",
            error,
        })
    }
}

module.exports = authUser;