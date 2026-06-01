import request from '@/utils/request'
import type { UserInfo } from '@/types/user'
import type { ApiResponse } from '@/types/index'

// 获取用户信息接口
export const getUserInfo = (account: string) => {
  return request<ApiResponse<UserInfo>>({
    url: '/user/info',
    method: 'get',
    params: { account },
  })
}
