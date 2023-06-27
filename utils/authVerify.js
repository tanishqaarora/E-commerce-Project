const db = require('../models/index.js');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // Get token
        const token = req.header("auth-token");

        // No token
        if(!token) return res.status(401).json({
            msg: "Access denied"
        })

        // Verify token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;

        // Authorization --> who the user is
        const findUser = await db.user.findOne({
            where: { id: req.user.id }
        })

        if(findUser.role === 'admin') {
            req.user.role = findUser.role;
            next();
        }
        else if(findUser.role === 'seller') {
            req.user.role = findUser.role;
            next();
        }
        else if(findUser.role === 'user') {
            req.user.role = findUser.role;
            next();
        }
        else {
            return res.status(200).json({
                msg: "Invalid role"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}