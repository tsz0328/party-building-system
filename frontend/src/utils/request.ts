import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  // 明确指定请求体格式为 JSON
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 从 Pinia Store 中获取当前登录用户的 token
    const userStore = useUserStore()
    // 如果有 token，就自动加到请求头里
    // 格式：Authorization: Bearer <token>（这是行业通用的 Bearer Token 规范）
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 200) {
      return res // 返回 ApiResponse<T>
    } else {
      return Promise.reject(new Error(res.msg || '请求失败'))
    }
  },
  (error) => {
    const userStore = useUserStore()
    let errMsg = '网络连接异常，请稍后重试'
    // 【新增】判断是否为 401（未登录/Token过期）
    if (error.response?.status === 401) {
      errMsg = '登录已失效，请重新登录'
      ElMessage.error(errMsg) // 给用户一个提示
      userStore.handleLogout() // 调用 Store 的方法清空登录状态
      window.location.href = '/login' // 强制跳转到登录页
      return Promise.reject(new Error(errMsg))
    }
    //超时判断逻辑
    if (error.message.includes('timeout')) errMsg = '请求超时，请检查网络'
    ElMessage.error(errMsg)
    return Promise.reject(new Error(errMsg))
  },
)

// 封装自定义请求函数，直接返回拦截器处理后的类型
const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return instance(config) as Promise<T>
}

export default request
