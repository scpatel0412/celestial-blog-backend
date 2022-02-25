const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

let userSchema = new mongoose.Schema(
    {
          email: {
            type: String,
            unique: true,
            required: true,
          },
          password: {
            type: String,
            required: true
          }   
    },
    {
        timestamps:true
    }
)
const data1 = new mongoose.Schema({
  star_name: {
      type: String,
      
      required: true
  },
  description: {
      type: String,
      
      required: true
  },
  setId:{
      type:String,
      
      required: true
  },    
  image: {
      type: String,
      trim: true,
      required: true
  }
}, {
  timestamps: true
}
)
const dailyfeeddata = new mongoose.Schema({
  star_name: {
      type: String,
      
      required: true
  },
  description: {
      type: String,
      
      required: true
  },
  set_id:{
      type:String,
      
      required: true
  }, 
  imageLink: {
      type: String,
      trim: true,
      required: true
  },
  userEmail:{
      type:String,
      required:true
  }
}, {
  timestamps: true
}
)
const like = new mongoose.Schema({
email:{
  type:String,
  required:true
},
set_id:{
  type:String,
  required:true
}
}, {
  timestamps: true
}
)
const comment = new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  set_id:{
    type:String,
    required:true
  },
  comment:{
    type:String,
    required:true
  }
  }, {
    timestamps: true
  }
  )

userSchema.plugin(uniqueValidator,{message:"Email already exists"});
const user = mongoose.model("registerUser",userSchema)
const likes = mongoose.model("like-post",like)
const blogdata = mongoose.model("blog",data1)
const dailyfeed = mongoose.model("dailyfeed",dailyfeeddata)
const comments = mongoose.model("post-comment",comment)
module.exports = {user,blogdata,dailyfeed,likes,comments}