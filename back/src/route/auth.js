// Підключаємо роутер до бек-енду
const express = require('express');
const router = express.Router();

const { User } = require('../class/user');
const { Confirm } = require('../class/confirm');
const { Session } = require('../class/session');

User.create({
	email: 'gooduser1@mail.com',
	password: 'mhvjbA45',
});
	User.userConfirm('gooduser1@mail.com');
  
User.create({
	email: 'gooduser2@mail.com',
	password: 'mhvjbA44',
});
	User.userConfirm('gooduser2@mail.com');

User.create({
	email: 'plainuser@mail.com',
	password: 'mhvjbA43',
});

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

		if (user) {
			return res.status(400).json({
				message: `User with this email already exists!`,				
				field: 'email',
			})
		}

		const newUser = User.create({ email, password });
		console.log('New User: ', newUser);

    	const initSession = Session.create(user)  ;
		console.log('Current Session ', initSession.token);

			Confirm.create(newUser.email);
			console.log('Confirm with this code: ', Confirm.getCode(newUser.email));

		return res.status(200).json({
			message: `User has been successfully created!`,
			initSession,
		  })
		} catch (err) {
		  return res.status(400).json({
			message: err.message,
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
			field: 'code',
		})
	}

	try {
		const initSession = Session.get(token)  ;
		if (!initSession) {
			return res.status(400).json({
				message: `Come back and Sign In!`,				
				field: 'data',
			})
		}

		const email = Confirm.getData(Number(code));
		console.log(`Code for email: `, email)

		if (!email) {
			return res.status(400).json({
				message: `This code is wrong!`,				
				field: 'code',
			})
		}

		if (email !== initSession.user.email) {
			return res.status(400).json({
				message: `This code is wrong! `,				
				field: 'email',
			})
		}

		const user = User.getByEmail(email)
		
    	const session = Session.create(user)  ;
		console.log('Current Session ', session.token);

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
			message: `Fill in all required fields!`,	
		})
	}

	try {
		const user = User.getByEmail(email)
		console.log('Hi there, ', user.email)

		if (!user) {
			return res.status(400).json({
				message: `This user hasn't an account!`,				
				field: 'email',
			})
		}
		
		if (user.password !== password) {
			return res.status(400).json({
				message: `This password is wrong!`,		
				field: 'password',
			})
		} 

		const session = Session.create(user);
		console.log('Current Session ', session);

		
		return res.status(200).json({
			message: `Welcome!`,
			session,
			})
			
		} catch (err) {
		  return res.status(400).json({
			message: `This user hasn't an account!`,				
			field: 'email',
		  })
		}
	  })


//=================================================

router.post('/recovery', function (req, res) {	
	const { email } = req.body

	if (!email) {
		return res.status(400).json({
			message: `Enter your email!`,
			field: 'email',
		})
	}

	try {
		const user = User.getByEmail(email)
		console.log(user)

		if (!user) {
			return res.status(400).json({
				message: `User with this email doesn't exist. 
							Come back and Sign Up!`,
				field: 'email',
			})
		}

		Confirm.create(user.email);
		console.log('Recover with this code: ', Confirm.getCode(user.email));
		
		return res.status(200).json({
			message: `Check your email to find the code!`,
			})
			
	} catch (err) {
		return res.status(400).json({
			message: err.message,
		})
	}
})

//=================================================
router.post('/recovery-confirm', function (req, res) {	
	const { code, password } = req.body

	if (!code) {
		return res.status(400).json({
			message: `Enter your code!`,
		})
	}

	try {
		const email = Confirm.getData(Number(code));
		console.log(`Code for email: `, email)

		if (!email) {
			return res.status(400).json({
				message: `This code is wrong!`,				
				field: 'code',
			})
		}

		const user = User.getByEmail(email);

		console.log(`Initial: `, user);
		console.log(`NEW: `, password);

		User.updatePass(email, password);

		const updUser = User.getByEmail(email);
		console.log(`Updated: `, updUser);
		
		return res.status(200).json({
			message: `Sign In with NEW data!`,
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