import { Express, json } from 'express'
import 'express-async-errors'
import error from '../middleware/error'
import auth from '../routes/auth'
import pages from '../routes/pages'
import users from '../routes/users'

const router = (app: Express) => {
  app.use(json())
  app.use('/api/pages', pages)
  app.use('/api/auth', auth)
  app.use('/api/users', users)
  app.use(error)
}

export default router
