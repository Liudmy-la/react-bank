// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

//=================================================

router.get('/balance', function (req, res) {	
	res.status(200).json(`For you *__* `)
  })

//=================================================



//=================================================

// Підключаємо роутер до бек-енду
module.exports = router