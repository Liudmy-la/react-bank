// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

//=================================================

// Підключаємо файли роутів
const auth = require('./auth')
const actions = require('./actions')

// Об'єднуємо файли роутів
router.use('/', auth)
router.use('/', actions)

//=================================================

router.get('/', (req, res) => {
	res.status(200).json(`Let's Keep Going!`)
  })

//=================================================

// Експортуємо глобальний роутер
module.exports = router
