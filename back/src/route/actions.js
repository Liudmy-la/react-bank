// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { Transaction } = require('../class/transaction');

//=================================================

router.get('/balance', function (req, res) {	
	res.status(200).json(`For you *__* `)
  })

//=================================================

router.post('/transaction/:transactionId', function (req, res) {
	try {
		const {amount, recipient, transactionId} = req.body

		if (!amount || !recipient) {
			return res.status(400).json({
				message: `Fill in all fields!`,
			})
		}

		const newTransaction = Transaction.create(amount, recipient, transactionId, date)

		return res.status(200).json({
			transaction: {
				transactionId: newTransaction.transactionId,
				amount: newTransaction.amount,
				recipient: newTransaction.recipient,
				date: newTransaction.date,
			}
		})

	} catch (e) {
		return res.status(400).json({
			message: e.message,
		})
	}
})


// ==============================================


//=================================================

// Підключаємо роутер до бек-енду
module.exports = router