// Підключаємо роутер до бек-енду
const express = require('express');
const router = express.Router();

const { Transaction } = require('../class/transaction');
const { User } = require('../class/user');
const { Notification } = require('../class/notification');

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

Notification.create({
	action:'notification', 
	name:'BANK' , 
	info: 'Congradulations! Your Welcome bonus is $50'
})
Notification.create({
	action:'sign up', 
	name:'gooduser1@mail.com' , 
	info: `(Windows 007)`
})
Notification.create({
	action:'recovery',
	name:'gooduser1@mail.com',
	info: `(Windows 008)`
})


//=================================================

router.get('/balance', function (req, res) {
	res.json({
		balance: Transaction.getBalance(),
		list: Transaction.getList().reverse(),

		notifications: Notification.getUnread().length,
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

	try {const balance = Transaction.getBalance();

		if (type === 'send' && amount > balance) {
			return res.status(400).json({
				message: `Your balance is insufficient. Enter a lower amount.`,			
				field: 'data',
			});
		}

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
			message: `Error. Transaction is not completed.`,			
			field: 'data',
		})
	}
})
//=================================================

router.post('/settings', function (req, res) {	

	const { currentData, typeNewData, newData, customerId } = req.body
	console.log(currentData, newData, customerId)

	try {
		const user = User.getByData(customerId)
		console.log(user)

		if (!user) {
			return res.status(400).json({
				message: `User with this data is absent in DB.`,
				field: 'data',
			})
		} else if (user.password !== currentData) {			
			return res.status(400).json({
				message: `Current Data is not correct.`,
				field: 'password',
			})
		}

		User.updateData(user, typeNewData, newData)
		console.log('Updated user: ', user);
		
		return res.status(200).json({
			message: `Updated successful!`,
			})
			
	} catch (err) {
		return res.status(400).json({
			message: `Fault Data Updating`,
			field: 'data',
		})
	}
})

// ===============================================

router.get('/notifications', function (req, res) {
	res.json(Notification.getList());
  });

// ===============================================

router.get('/notifications/update', function (req, res) {
	const id = Number(req.query.id)
	
	try {
		const updated = Notification.update(id);
		if (!updated) {
		  throw new Error('Notification not found');
		}
	
		res.json({ success: true });
	} catch (error) {
			console.error('Error updating ifUnread status:', error);
	}
});

//=================================================

// Підключаємо роутер до бек-енду
module.exports = router