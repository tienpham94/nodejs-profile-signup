var express = require("express");
var router = express.Router()
var Profile = require("../models/Profile")

router.post("/:resource", (req,res,next) =>{
  var resource = req.params.resource
  if (resource == "profile"){//create profile

    var formData = req.body
    Profile.create(formData, (err, profile) => {
      if(err){
        res.json({
          confirmation: "fail",
          message: err
        })

        return
      }

      res.json({
        confirmation: "success",
        result: profile
      })

    })

    return
  }

  res.json({
    confirmation: "fail",
    message : "Resource "+resource+" not supported."
  })
})

router.get("/:resource", (req,res,next) => {

  var resource = req.params.resource
  if (resource == "profile"){ //request for profile
    Profile.find(null, (err,profiles) => {

      if(err){
        res.json({
          confirmation: "fail",
          message: err
        })

        return
      }

      res.json({
        confirmation:"success",
        results: profiles
      })
    })

    return
  }

  res.json({
    confirmation: "fail",
    message : "Resource "+resource+" not supported."
  })


})

router.get("/:resource/:id", (req,res,next) => {

  var resource = req.params.resource
  var id = req.params.id
  if (resource == "profile"){//fetch a specific profile
    Profile.findById(id, (err, profile) => {
      if(err){
        res.json({
          confirmation:"fail",
          message: "Profile not found"
        })

        return
      }

      if(profile == null){
        res.json({
          confirmation: "fail",
          message:"Profile not found"
        })

        return
      }

      res.json({
        confirmation:"success",
        result: profile
      })
    })

    return
  }

  res.json({
    confirmation: "fail",
    message : "Resource "+resource+" not supported."
  })
})

module.exports = router
