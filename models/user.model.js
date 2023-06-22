const { ServerError, ErrorCode} = require('../error');

const User = function(user) {
    this.username = user.username;
    this.hashedPassword = user.hashedPassword;
    this.balance = user.balance;
};

var users = [];
var idFakeGenerator = 0;

User.add = (newUser, result) => {
    const isUserExist = users.find((user) => user.username = username);
    if (isUserExist) {
        console.log(ErrorCode.USER_ALREADY_EXIST);
        return result(ServerError[ErrorCode.USER_ALREADY_EXIST], null);
    }
    idFakeGenerator += 1
    const storedUser = { id: idFakeGenerator, balance: 0, ...newUser }
    console.log("User successfully registered!")
    users.push(storedUser);
    result(null, storedUser);
};

User.get = (userId, result) => {
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return result(ServerError[ErrorCode.NOT_FOUND], null);
    } else result(null, user);
}

User.deposit = (userId, amount, result) => {
    const index = users.findIndex((user) => user.id == userId);
    if (index == -1) {
        console.log('User not found');
        return result(ServerError[ErrorCode.NOT_FOUND], null);
    } else {
        const user = users[index];
        user.balance += amount;
        users[index] = user;
        result(null, user);
    }
};

User.balance = (userId, result) => {
    const user = users.find((user) => user.id == userId);
    if (!user) {
        return result(ServerError[ErrorCode.NOT_FOUND], null);
    } else 
        result(null, user.balance);
};

module.exports = User;