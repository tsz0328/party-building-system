import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { success, fail } from '../types/response'

// TODO: 替换为真实数据库查询
// 示例用户数据（开发期临时使用）
const mockUsers = [
  { id: 1, account: 'teacher001', password: bcrypt.hashSync('123456', 10), role: 1, name: '张老师' },
  { id: 2, account: 'student001', password: bcrypt.hashSync('123456', 10), role: 2, name: '李同学' },
]

export const login = async (req: Request, res: Response): Promise<void> => {
  // 校验请求参数
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json(fail(errors.array()[0].msg))
    return
  }

  const { account, password } = req.body

  const user = mockUsers.find(u => u.account === account)
  if (!user) {
    res.json(fail('账号不存在'))
    return
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    res.json(fail('密码错误'))
    return
  }

  const token = jwt.sign(
    { id: user.id, account: user.account, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )

  res.json(success({
    token,
    account: user.account,
    role: user.role,
    status: 1,
  }))
}
