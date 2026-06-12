import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { fail } from '../types/response'

export interface AuthRequest extends Request {
  user?: {
    id: number
    account: string
    role: number
  }
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json(fail('未授权，请先登录', 401))
    return
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number
      account: string
      role: number
    }
    req.user = decoded
    next()
  } catch {
    res.status(401).json(fail('Token 已过期或无效', 401))
  }
}
