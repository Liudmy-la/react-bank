// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()


//=================================================

router.get('/signin', function (req, res) {	
	res.status(200).json(`Signin !!`)
  })

//=================================================

router.get('/signup', function (req, res) {	
	res.status(200).json(`Signup!`)

	// res.render('signup', {
	// 	name: 'signup',
	// 	// component: [],
	
	// 	title: 'Signup Page',
	// 	data: "NEW page",
	//   })
  })
//=================================================

// Підключаємо роутер до бек-енду
module.exports = router