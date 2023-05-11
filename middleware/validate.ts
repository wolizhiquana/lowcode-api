import { Request, Response, NextFunction } from 'express'
import Joi, { ValidationResult } from 'joi'

export type Validator<T> = (value: T) => ValidationResult<T>

export default function <T>(validator: Validator<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    next()
  }
}
