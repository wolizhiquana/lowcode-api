import { Request, Response, NextFunction } from 'express'

const error = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)
  res.status(500).send('Something failed')
}

export default error
