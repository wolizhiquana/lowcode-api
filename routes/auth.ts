import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/user'

const auth = express.Router()

auth.post('/', async (req, res) => {
  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('用户名或密码错误')

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('用户名或密码错误')

  const token = user.generateAuthToken()

  res.send(token)
})

export default auth
