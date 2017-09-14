var express = require("express");
var router = express.Router()
var controllers = require("../controllers")

router.post("/:resource", (req,res,next) =>{
  var resource = req.params.resource

  var controller = controllers[resource]
  if(controller== null){
    res.json({
      confirmation: "fail",
      message : "Resource "+resource+" not supported."
    })
    return
  }

  var formData = req.body

  controller
  .post(formData)
  .then((result) =>{
    res.json({
      confirmation:"success",
      result: result
    })
  })
  .catch((err) =>{
    res.json({
      confirmation:"fail",
      message:err
    })
  })
})

router.get("/:resource", (req,res,next) => {

  var resource = req.params.resource
  var controller = controllers[resource]
  if(controller== null){
    res.json({
      confirmation: "fail",
      message : "Resource "+resource+" not supported."
    })
    return
  }

  controller
  .get(null)
  .then((results) =>{
    res.json({
      confirmation:"success",
      results: results
    })
  })
  .catch((err) =>{
    res.json({
      confirmation:"fail",
      message: err
    })
  })

})

router.get("/:resource/:id", (req,res,next) => {

  var resource = req.params.resource
  var controller = controllers[resource]
  if(controller== null){
    res.json({
      confirmation: "fail",
      message : "Resource "+resource+" not supported."
    })
    return
  }

  var id = req.params.id
  controller
  .getById(id)
  .then((result)=>{
    res.json({
      confirmation:"success",
      result:result
    })
  })
  .catch((err)=>{
    res.json({
      confirmation:"fail",
      message: err.message
    })
  })

})

module.exports = router
