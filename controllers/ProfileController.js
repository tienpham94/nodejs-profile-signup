var Profile = require("../models/Profile")
var Promise = require("bluebird")
var bcrypt = require("bcryptjs")

module.exports = {

  get: (params, isRaw)=>{
    return new Promise((resolve, reject) =>{
      if(isRaw == null) isRaw = false

      Profile.find(params, (err, profiles) =>{
        if(err){
          reject(err)
          return
        }

        if(isRaw == true){
          resolve(profiles)
          return
        }

        var results = []
        profiles.forEach((profile, i) =>{
          results.push(profile.summary())
        })
        resolve(results)
      })
    })
  },

  getById: (id)=>{
    return new Promise((resolve,reject)=>{
      Profile.findById(id,(err,profile)=>{
        if(err){
          reject(new Error("Profile not found!"))
          return
        }
        if(profile==null){
          reject(new Error("Profile not found!"))
          return
        }

        resolve(profile.summary())
      })
    })
  }
  ,
  post: (body)=>{
    return new Promise((resolve, reject) =>{

      if(body.password != null){
        var password = body.password // plain
        var hashed = bcrypt.hashSync(password)
        body["password"] = hashed
      }

      Profile.create(body,(err, profile)=>{
        if(err){
          reject(err)
          return
        }

        resolve(profile.summary())
      })
    })
  }
}
