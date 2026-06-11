// 统一 API 响应格式（与前端 ApiResponse<T> 对齐）
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  msg: string
  timestamp: string
}

export const success = <T>(data: T, msg = 'success'): ApiResponse<T> => ({
  code: 200,
  data,
  msg,
  timestamp: new Date().toISOString(),
})

export const fail = (msg: string, code = 400): ApiResponse<null> => ({
  code,
  data: null,
  msg,
  timestamp: new Date().toISOString(),
})
