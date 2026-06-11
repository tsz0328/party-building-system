import type { UserRole } from './login'

// 教师用户信息
export interface TeacherInfo {
  role: 'teacher' // 教师角色
  name: string // 姓名
  sex: string // 性别
  nativePlace: string // 民族
  account: string // 工号
  idCard: string // 身份证号码
  phone: string // 联系电话
  email: string // 电子邮箱
  identity: string // 政治面貌
  partyBranch: string // 党支部
  department: string // 所在部门
  joinPartyTime: string // 入党时间
}

// 学生用户信息
export interface StudentInfo {
  role: 'student' // 学生角色
  name: string // 姓名
  sex: string // 性别
  nativePlace: string // 民族
  account: string // 学号
  idCard: string // 身份证号码
  phone: string // 联系电话
  email: string // 电子邮箱
  college: string // 学院
  major: string // 专业
  className: string // 班级
  identity: string // 政治面貌
  partyBranch: string // 党支部
  joinPartyTime: string // 入党时间
  emergencyContact: string // 紧急联系人姓名
  emergencyRelation: string // 关系
  emergencyPhone: string // 紧急联系人电话
}

// 通用用户信息数据结构
export interface UserInfo {
  college?: string
  nation?: string
  identity: string
  sex?: string
  name: string
  branch?: string
  account: string
  age?: number
  role?: UserRole
  nativePlace?: string
  department?: string
  partyBranch?: string
  className?: string
  idCard?: string
  phone?: string
  email?: string
  joinPartyTime?: string
  major?: string
  emergencyContact?: string
  emergencyRelation?: string
  emergencyPhone?: string
}
