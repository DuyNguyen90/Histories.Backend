var express = require('express');
var router = express.Router();
var historyRouter = require('./history');
const user = require('../controllers/user.controller');

router.use('/history', historyRouter);

// Deposit money
router.post('/deposit', user.deposit);

// Current balance
router.get('/balance', user.getBalance);

// Current user
router.get('/', user.get);

module.exports = router;
