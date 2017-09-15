var Comment = require("../models/Comment")
var Promise = require("bluebird")

module.exports = {

  get: (params)=>{
    return new Promise((resolve, reject) =>{
      Comment.find(params, (err, comments) =>{
        if(err){
          reject(err)
          return
        }

        var results = []
        comments.forEach((comment, i) =>{
          results.push(comment.summary())
        })

        resolve(comments)
      })
    })
  },

  getById: (id)=>{
    return new Promise((resolve,reject)=>{
      Comment.findById(id,(err,comment)=>{
        if(err){
          reject(new Error("Comment not found!"))
          return
        }
        if(comment==null){
          reject(new Error("Comment not found!"))
          return
        }

        resolve(comment.summary())
      })
    })
  }
  ,
  post: (body)=>{
    return new Promise((resolve, reject) =>{
      Comment.create(body,(err, comment)=>{
        if(err){
          reject(err)
          return
        }

        resolve(comment.summary())
      })
    })
  }
}
