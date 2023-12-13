// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { Transaction } = require('../class/transaction');


//=================================================

router.get('/balance', function (req, res) {	
	res.status(200).json(`For you *-* `)
  })

//=================================================

router.post('/send', function (req, res) {
	try {
		const {amount, source, type} = req.body

		console.log(Number(amount))
		console.log(source)
		console.log(type)

		// if (!amount || !recipient) {
		// 	return res.status(400).json({
		// 		message: `Fill in all fields!`,
		// 	})
		// }

		const newTransaction = Transaction.create({amount, source, type});
		  
		console.log(newTransaction);

		return res.status(200).json({
				date: newTransaction.date,
				transactionId: newTransaction.transactionId,
				amount: newTransaction.amount,
				recipient: newTransaction.source,			
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