import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

export default function (req: Request, res: Response, next: NextFunction) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Invalid Id')

  next()
}
