import { Request, Response, NextFunction } from 'express'
import { fail } from '../types/response'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('[Error]', err.message)
  res.status(500).json(fail(err.message || '服务器内部错误', 500))
}
