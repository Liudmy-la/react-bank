// Підключаємо роутер до бек-енду
const express = require('express');
const router = express.Router();

const { User } = require('../class/user');
const { Confirm } = require('../class/confirm');
const { Session } = require('../class/session');

User.create({
	email: 'gooduser1@mail.com',
	password: 'mhvjbA45',
})
  
User.create({
	email: 'gooduser2@mail.com',
	password: 'mhvjbA44',
})


//=================================================

router.get('/signup', function (req, res) {	
	return res.render('signup', {
		name: 'signup',
		component: [
			'page',
			'column',
			'button',
			'input',
			'heading',
		],
	
		title: 'Signup Page',
		
	  });
  });

  //=================================================

router.post('/signup', function (req, res) {	
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({
			message: `Fill in the required fields!`,
		})
	}

	try {
		const user = User.getByEmail(email)

		console.log(user)

		if (user) {
			return res.status(400).json({
				message: `User with this email already exists!`,
			})
		}

		const newUser = User.create({ email, password });
		console.log('New User: ', newUser);

    	const session = Session.create(newUser)  ;
		console.log('Current Session ', session.token);

			Confirm.create(newUser.email);
			console.log('Confirm with this code: ', Confirm.getList().reverse()[0].code);

		return res.status(200).json({
			message: `User has been successfully created!`,
			session,
		  })
		} catch (err) {
		  return res.status(400).json({
			message: `Error! Wrong confirmation code.`,
		  })
		}
	  })

//=================================================	  

router.get('/signup-confirm', function (req, res) {	
	return res.render('signup', {
		name: 'signup',
		component: [
			'page',
			'column',
			'button',
			'input',
			'heading',
		],
	
		title: 'Signup-confirm Page',
		
	  });
  });

//=================================================
router.post('/signup-confirm', function (req, res) {	
	const { code, token } = req.body

	if (!code) {
		return res.status(400).json({
			message: `Enter your code!`,
		})
	}

	try {
		const session = Session.get(token)  ;
		if (!session) {
			return res.status(400).json({
				message: `Come back and Log in!`
			})
		}

		const email = Confirm.getList().reverse()[0].data
		if (!email) {
			return res.status(400).json({
				message: `This code is wrong!`
			})
		}

		if (email !== session.user.email) {
			return res.status(400).json({
				message: `Ask new code for confirmation!`
			})
		}

		const user = User.getByEmail(session.user.email)
		user.isConfirm = true;
		session.user.isConfirm = true;

		console.log(user)
		
		return res.status(200).json({
			message: `Welcome!`,
			session,
			})
			
	} catch (err) {
		return res.status(400).json({
			message: err.message,
		})
	}
})
//=================================================

router.get('/signin', function (req, res) {	
	return res.render('signup', {
		name: 'signin',
		component: [
			'page',
			'column',
			'button',
			'input',
			'heading',
		],
	
		title: 'Signin Page',
		
	  });
  });

//=================================================

router.post('/signin', function (req, res) {	
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({
			message: `Fill in the required fields!`,
		})
	}

	try {
		const user = User.getByEmail(email)

		if (!user) {
			return res.status(400).json({
				message: `This user hasn't an account!`
			})
		}
		
		if (user.password !== password) {
			return res.status(400).json({
				message: `This password is wrong!`
			})
		}

		const session = Session.create(user)  ;
		console.log('Current Session ', session.token, session.email);

		
		return res.status(200).json({
			message: `Welcome!`,
			session,
			})
			
		} catch (err) {
		  return res.status(400).json({
			message: err.message,
		  })
		}
	  })


//=================================================

//=================================================

// Підключаємо роутер до бек-енду
module.exports = router