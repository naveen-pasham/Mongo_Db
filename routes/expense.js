const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/add-expense', expenseController.postAddExpense);

router.get('/get-expense', expenseController.getExpenses);

router.get('/edit-expense/:Id', expenseController.getEditExpense);
router.post('/edit-expense', expenseController.postEditExpense);

router.get('/delete/:Id', expenseController.DeleteExpense);

module.exports = router;
