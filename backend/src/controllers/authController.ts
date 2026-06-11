import { Request, Response } from 'express'
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
  const { account, password } = req.body

  if (!account || !password) {
    res.json(fail('账号和密码不能为空'))
    return
  }

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
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )

  res.json(success({
    token,
    account: user.account,
    role: user.role,
    password: '',  // 前端 LoginResult 接口要求
    status: 1,
  }))
}
