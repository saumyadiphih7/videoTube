import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    required: false
    
  },
  coverImage: {
    type: String,

  },
  watchHistory: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Video"
    }
  ],
  refreshToken: {
    type:String
  }
  

},
  
  { timestamps: true }
)


userSchema.pre("save", async function (next) {
  if (!this.modified("password")) return next()
  
  this.password= bcrypt.hash(this.password,10)

  next()
})


userSchema.methods.isPasswordCorrect = async function (password) {
 return  await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = async function () {
 return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d"
    }
  )
}

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign({
    _id: this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: "7d"
  })
}
const User=mongoose.model("User",userSchema)

export default User