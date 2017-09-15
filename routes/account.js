var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

router.get('/logout', function(req, res, next){
	req.session.reset()
	res.json({
		confirmation: 'success',
		user: null
	})
})

router.get('/currentuser', function(req, res, next){
	if (req.session == null){
		res.json({
			confirmation:'success',
			user: null
		})

		return
	}

	if (req.session.token == null){
		res.json({
			confirmation:'success',
			user: null
		})

		return
	}

	jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err, decode){
		if (err){
			req.session.reset()
			res.json({
				confirmation: 'fail',
				message: 'Invalid token'
			})

			return
		}

		controllers.profile
		.getById(decode.id)
		.then(function(profile){
			res.json({
				confirmation: 'success',
				user: profile
			})
		})
		.catch(function(err){
			res.json({
				confirmation:'fail',
				message: err
			})
		})
	})
})

router.post('/register', function(req, res, next){

	var formData = req.body

	controllers.profile
	.post(formData)
	.then(function(profile){
		req.session.token = jwt.sign({id: profile.id}, process.env.TOKEN_SECRET, {expiresIn:4000})
		res.redirect('/profile')
		return
	})
	.catch(function(err){
		next(err)
	})
})

router.post('/login', function(req, res, next){

	var formData = req.body // email, password

	controllers.profile
	.get({email: formData.email}, true)
	.then(function(profiles){
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

		req.session.token = jwt.sign({id: profile._id.toString()}, process.env.TOKEN_SECRET, {expiresIn:4000})
		res.redirect('/profile')
	})
	.catch(function(err){
		res.json({
			confirmation:'fail',
			message: err
		})

	})
})

router.post("/comment", (req,res) => {

  if(req.session == null){
    res.json({
      confirmation: "fail",
      message:"not logged in"
    })
  }

  if(req.session.token == null){
    res.json({
      confirmation: "fail",
      message:"not logged in"
    })
  }

  var token = req.session.token
  jwt.verify(token, process.env.TOKEN_SECRET, (err,decode) =>{
    if(err){
      res.json({
        confirmation:"fail",
        message:"Invalid Token"
      })

      return
    }

    //Success!
      var commentData = req.body
      commentData["profile"] = decode.id

      controllers.comment
      .post(commentData)
      .then((result) =>{
        res.json({
          confirmation:"success",
          comment: result
        })
      })
      .catch((err) => {

      })
  })


})

module.exports = router
