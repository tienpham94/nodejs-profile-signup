var Profile = require("../models/Profile")
var Promise = require("bluebird")

module.exports = {

  get: (params)=>{
    return new Promise((resolve, reject) =>{
      Profile.find(params, (err, profiles) =>{
        if(err){
          reject(err)
          return
        }

        resolve(profiles)
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

        resolve(profile)
      })
    })
  }
  ,
  post: (body)=>{
    return new Promise((resolve, reject) =>{
      Profile.create(body,(err, profile)=>{
        if(err){
          reject(err)
          return
        }

        resolve(profile)
      })
    })
  }
}
