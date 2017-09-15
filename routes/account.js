var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var bcrypt = require('bcryptjs')

router.get('/currentuser', (req, res, next)=>{

	if (req.session == null){
		res.json({
			confirmation:'success',
			user: null
		})

		return
	}

	if (req.session.user == null){
		res.json({
			confirmation:'success',
			user: null
		})

		return
	}

	res.json({
		confirmation:'success',
		user: req.session.user
	})


})

router.post('/register', (req, res, next)=>{

	var formData = req.body

	controllers.profile
	.post(formData)
	.then((profile)=>{
		res.redirect('/profile')
		return
	})
	.catch((err)=>{
		next(err)
	})
})

router.post('/login', (req, res, next)=>{

	var formData = req.body // email, password

	controllers.profile
	.get({email: formData.email}, true)
	.then((profiles)=>{
		if (profiles.length == 0){
			res.json({
				confirmation:'fail',
				message: 'Profile not found.'
			})
			return
		}

		var profile = profiles[0]

		var passwordCorrect = bcrypt.compareSync(formData.password, profile.password)
		if (passwordCorrect == false){
			req.session.reset()
			res.json({
				confirmation: 'fail',
				message: 'Wrong Password'
			})

			return
		}

		req.session.user = profile._id.toString() // attach session
		res.redirect('/profile')
	})
	.catch((err) => {
		res.json({
			confirmation:'fail',
			message: err
		})

	})
})



module.exports = router
