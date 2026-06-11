import { Response } from 'express'
import { AuthRequest } from '../middlewares/auth'
import { success, fail } from '../types/response'

// TODO: 替换为真实数据库查询
const mockProfiles: Record<string, object> = {
  teacher001: {
    role: 'teacher',
    name: '张老师',
    sex: '男',
    nativePlace: '广东省',
    account: 'teacher001',
    idCard: '',
    phone: '13800000001',
    email: 'teacher001@example.com',
    identity: '中共党员',
    partyBranch: '计算机学院党支部',
    department: '计算机学院',
    joinPartyTime: '2015-07-01',
  },
  student001: {
    role: 'student',
    name: '李同学',
    sex: '女',
    nativePlace: '湖南省',
    account: 'student001',
    idCard: '',
    phone: '13800000002',
    email: 'student001@example.com',
    college: '计算机学院',
    major: '软件工程',
    className: '2021级1班',
    identity: '预备党员',
    partyBranch: '计算机学院学生党支部',
    joinPartyTime: '2023-06-01',
    emergencyContact: '李父',
    emergencyRelation: '父子',
    emergencyPhone: '13900000001',
  },
}

export const getUserInfo = (req: AuthRequest, res: Response): void => {
  const account = req.query.account as string
  if (!account) {
    res.json(fail('缺少 account 参数'))
    return
  }

  const profile = mockProfiles[account]
  if (!profile) {
    res.json(fail('用户不存在'))
    return
  }

  res.json(success(profile))
}

export const updateUserInfo = (req: AuthRequest, res: Response): void => {
  const account = req.user?.account
  if (!account) {
    res.json(fail('未授权', 401))
    return
  }
  // TODO: 实现真实更新逻辑
  res.json(success(null, '更新成功'))
}
