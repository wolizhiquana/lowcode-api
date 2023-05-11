import { Model, default as mongoose } from 'mongoose'
import jwt from 'jsonwebtoken'
import config from 'config'
import joi from 'joi'
import { joiPasswordExtendCore } from 'joi-password'
import { Validator } from '../middleware/validate'

const joiPassword = joi.extend(joiPasswordExtendCore)

export interface User {
  name: string
  email: string
  password: string
  isAdmin: boolean
}

interface UserMethods {
  generateAuthToken: () => string
}

type UserModel = Model<User, {}, UserMethods>

export const userSchema = new mongoose.Schema<User, UserModel, UserMethods>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    config.get('jwtPrivateKey')
  )
  return token
}

export const User = mongoose.model<User, UserModel>('User', userSchema)

export const validateUser: Validator<Omit<User, 'isAdmin'>> = (value) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().min(5).max(255).email().required(),
    password: joiPassword.string().min(5).max(255).required()
  })

  return schema.validate(value)
}
