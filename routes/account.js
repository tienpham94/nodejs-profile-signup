var express = require("express");
var router = express.Router()
var controllers = require("../controllers")

router.post("/register", (req,res,next) => {

  var formData = req.body

  controllers.profile
  .post(formData)
  .then((profile) => {
    res.redirect("/profile")
    return
  })
  .catch((err) => {
    next(err)
  })
})


module.exports = router
