// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

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
		console.log('Confirm with this code: ', (new Confirm(newUser.email)).code);

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

		if (user) {
			return res.status(200).json({
				message: `Welcome!`,
				session,
			  })
			} else {
			  return res.status(400).json({
				message: `Error! Wrong login data.`,
			  })
			}
		} catch (err) {
		  return res.status(400).json({
			message: `Error! Wrong data.`,
		  })
		}
	  })
	  
//=================================================

// Підключаємо роутер до бек-енду
module.exports = router