const User = require("../models/user.model");

exports.get = (req, res) => {
    const userId = req.userId;
    User.get(userId, (error, user) => {
        if (error) {
            return res
                .status(400)
                .json(error);
        } else res.status(200).json(user);
    });
};

exports.getBalance = (req, res) => {
    const userId = req.userId;
    console.log("Get balance userId = ", userId);
    User.balance(userId, (error, balance) => {
        if (error) {
            return res
                .status(400)
                .json(error);
        } else {
            return res.status(200).json({ balance: balance });
        }
    });
};

exports.deposit = (req, res) => {
    const userId = req.userId;
    const deposit = req.body.deposit;
    console.log("Deposit balance for userId = ", userId);
    console.log("Deposit = ", deposit);
    User.deposit(userId, deposit, (error, user) => {
        if (error) {
            return res
                .status(400)
                .json(error);
        } else {
            return res.status(200).json(user);
        }
    });
};