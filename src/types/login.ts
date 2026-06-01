// 用户角色类型
export type UserRole = 'teacher' | 'student'

// 登录接口入参类型
export interface LoginParams {
  account: string
  password: string
}

// 登录接口返回的data字段类型
export interface LoginResult {
  password: string //密码
  role: number //角色
  account: string //账号
  status: number //账号状态
  token: string //token值
}
