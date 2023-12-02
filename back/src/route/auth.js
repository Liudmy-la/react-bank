// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/user');
const { Confirm } = require('../class/confirm');
const { Session } = require('../class/session');

User.create({
	email: 'gooduser1@mail.com',
	password: mhvjbA45,
  })
  
  User.create({
	email: 'gooduser2@mail.com',
	password: mhvjbA44,
  })

//=================================================

router.get('/signin', function (req, res) {	
	res.status(200).json(`Signin !!`)
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
			'option-heading',
		],
	
		title: 'Signup Page',
		data: "",
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

		if (user) {
			return res.status(400).json({
				message: `User with this email already exists!`,
			})
		}

		const newUser = User.create({ email, password })
    	const session = Session.create(newUser)

		Confirm.create(newUser.email)

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

// Підключаємо роутер до бек-енду
module.exports = router