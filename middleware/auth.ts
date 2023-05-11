import config from 'config'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
  _id: string
  name: string
  isAdmin?: boolean
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).send('Access denied. No token provided.')
  }

  try {
    const decoded = jwt.verify(
      token,
      config.get('jwtPrivateKey')
    ) as UserPayload
    req.user = decoded
    next()
  } catch (ex) {
    return res.status(400).send('Invalid token.')
  }
}

export default auth
