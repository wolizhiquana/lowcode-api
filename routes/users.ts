import auth from '../middleware/auth'
import express from 'express'
const router = express.Router()
import _ from 'lodash'
import bcrypt from 'bcryptjs'
import { User, validateUser } from '../models/user'
import validate from '../middleware/validate'

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user?._id).select('-password')
  res.send(user)
})

router.post('/', validate(validateUser), async (req, res) => {
  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('该邮箱已经注册')

  user = new User(_.pick(req.body, ['name', 'email', 'password']))
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  await user.save()

  res
    .header('x-auth-token', user.generateAuthToken())
    .header('access-control-expose-headers', 'x-auth-token')
    .send(_.pick(user, ['_id', 'name', 'email']))
})

export default router
