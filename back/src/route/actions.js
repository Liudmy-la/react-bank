// Підключаємо роутер до бек-енду
const express = require('express');
const router = express.Router();

const { Transaction } = require('../class/transaction');

const { Confirm } = require('../class/confirm');
const { Session } = require('../class/session');
const { User } = require('../class/user');

Transaction.create({
	type: 'send',
	amount: 500,
	source: 'example@example.com',
})

Transaction.create({
	type: 'receive',
	amount: 1500,
	source: 'coinbase',
})

//=================================================

router.get('/balance', function (req, res) {
	res.json({
		balance: Transaction.getBalance(),
		list: Transaction.getList().reverse(),

		notifications: '4',
	});
  });
   

//=================================================

router.post('/send', function (req, res) {
	const { type, amount, source} = req.body

	if (!amount || !source) {
		return res.status(400).json({
			message: `Fill in all fields!`,
		})
	}

	try {
		const newTransaction = Transaction.create({type, amount, source});
		console.log(newTransaction);

		return res.status(200).json({
			message: `Success!`,
			newTransaction,
		})

	} catch (err) {
		return res.status(400).json({
			message: err.message,
		})
	}
})

// ===============================================

router.get('/transaction', function (req, res) {
	const id = Number(req.query.id)

	res.json({
		info: Transaction.getById(id),
	});
  });
  

//=================================================

router.post('/receive', function (req, res) {
	const { type, amount, source} = req.body

	if (!amount) {
		return res.status(400).json({
			message: `Enter the amount!`,
		})
	}

	try {
		const newTransaction = Transaction.create({type, amount, source});
		console.log(newTransaction);

		return res.status(200).json({
			message: `Success!`,
			newTransaction,
		})

	} catch (err) {
		return res.status(400).json({
			message: err.message,
		})
	}
})

// ===============================================

//=================================================

// Підключаємо роутер до бек-енду
module.exports = router