const jwt = require('jsonwebtoken');
const AUTH_SECRET_KEY = require('../configs/authConfig');
const { ServerError, ErrorCode} = require('../error');

function verifyToken(req, res, next) {
    if (req.path === 'auth/login' || req.path === 'auth/register') {
        return next();
    }
    
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json(ServerError[ErrorCode.INVALID_TOKEN]);
    }
    
    jwt.verify(token, AUTH_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json(ServerError[ErrorCode.INVALID_TOKEN]);
        }
        console.log("Verify token for userId = ", decoded.userId);
        req.userId = decoded.userId;
        next();
    });
}

function generateToken(userId) {
    return jwt.sign({ userId: userId }, AUTH_SECRET_KEY);
}
  
module.exports = { verifyToken, generateToken } ;