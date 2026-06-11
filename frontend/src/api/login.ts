import request from '@/utils/request'
import type { LoginParams, LoginResult } from '@/types/login'
import type { ApiResponse } from '@/types/index'

// 登录接口
export const login = (data: LoginParams) => {
  return request<ApiResponse<LoginResult>>({
    url: '/api/login',
    method: 'POST',
    data, // 自动转为json格式，符合接口要求
  })
}
