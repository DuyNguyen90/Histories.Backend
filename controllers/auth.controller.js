const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const { ServerError, ErrorCode} = require('../error');
const { generateToken } = require('../middleware/verification.middleware');
const { use } = require("../routes");
const roundSalt = 10;


exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, roundSalt);
        const newUser = { username, password: hashedPassword };
        User.add(newUser, (error, storedUser) => {
            if (error) {
                return res
                    .status(401)
                    .json(error);
            } else {
                const token = generateToken(storedUser.id);
                res.status(201)
                    .json({ 
                        authToken: token,
                        user: storedUser,
                        message: "auth.register.success"
                });
            }
        })
    } catch (error) {
        res.status(500).json(ServerError[ErrorCode.INTERNAL]);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        User.get(username, async (error, user) => {
            if (error) {
                return res
                .status(401)
                .json(error);
            } 
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res
                    .status(401)
                    .json(ServerError[ErrorCode.INVALID_USERNAME_PASSWORD])
            }
            const token = generateToken(user.id);
            res.status(201).json({ 
                authToken: token,
                user: user,
                message: "auth.login.success"
            })
        })
    } catch (error) {
        res.status(500).json(ServerError[ErrorCode.INTERNAL]);
    }
};