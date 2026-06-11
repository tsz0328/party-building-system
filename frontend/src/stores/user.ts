import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login } from '@/api/login'
import { getUserInfo } from '@/api/user'
import type { UserInfo } from '@/types/user'
import type { LoginParams, LoginResult, UserRole } from '@/types/login'

export const useUserStore = defineStore(
  'user',
  () => {
    // 状态：用户信息
    const userInfo = ref<UserInfo | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null) // 新增：错误信息

    //状态：登录
    const token = ref<string>('') // Token：后端返回的核心登录凭证，后续所有接口都要靠它识别身份
    const userBaseInfo = ref<LoginResult | null>(null) // 登录接口返回的基础信息
    const loginLoading = ref(false) // 登录按钮的 loading：防止用户重复点击登录
    const loginError = ref<string | null>(null) // 登录专属错误：比如"账号密码错误"

    //计算属性
    // 是否登录：刷新页面后 token 还在，就保持登录状态
    const isLogin = computed(() => !!token.value)

    // 用户类型：教师或学生（1=教师，2=学生）
    const userRole = computed<UserRole | null>(() => {
      if (!userBaseInfo.value) return null
      return userBaseInfo.value.role === 1 ? 'teacher' : 'student'
    })

    // 判断是否为教师
    const isTeacher = computed(() => userRole.value === 'teacher')

    // 判断是否为学生
    const isStudent = computed(() => userRole.value === 'student')

    // 动作：获取用户信息
    const fetchUserInfo = async (account: string) => {
      // 优化：如果本地已有数据且不是强制刷新，可以直接返回
      if (userInfo.value) return
      loading.value = true
      error.value = null // 重置错误
      try {
        const res = await getUserInfo(account)
        // 拦截器已经处理了 code !== 200 的情况，这里直接赋值
        userInfo.value = res.data
      } catch (err) {
        // 捕获拦截器抛出的错误
        const errMsg = err instanceof Error ? err.message : '未知错误'
        error.value = errMsg
        console.error('获取用户信息失败:', errMsg)
        // 不抛出错误，允许路由跳转，即使获取用户信息失败
      } finally {
        loading.value = false // 无论成功失败，关闭 loading
      }
    }

    //动作：登录方法
    const handleLogin = async (params: LoginParams) => {
      loginLoading.value = true
      loginError.value = null
      try {
        const res = await login(params)
        // 接口返回成功（拦截器已经处理 code !== 200 的情况，这里直接处理成功逻辑）
        token.value = res.data.token // 核心：保存 token
        userBaseInfo.value = res.data // 保存登录返回的基础信息
        return Promise.resolve(res) // 给登录页返回成功结果，方便页面做跳转
      } catch (err) {
        // 捕获拦截器抛出的错误（比如“账号密码错误”）
        console.error('登录错误详情:', err)
        const errMsg = err instanceof Error ? err.message : '登录请求异常'
        loginError.value = errMsg
        return Promise.reject(new Error(errMsg))
      } finally {
        loginLoading.value = false
      }
    }

    //动作：退出登录方法（清空状态）
    const handleLogout = () => {
      token.value = ''
      userBaseInfo.value = null
      userInfo.value = null
      loginError.value = null
      error.value = null
    }

    return {
      userInfo,
      loading,
      error,
      token,
      userBaseInfo,
      loginLoading,
      loginError,

      isLogin,
      userRole,
      isTeacher,
      isStudent,

      fetchUserInfo,
      handleLogin,
      handleLogout,
    }
  },
  {
    // 开启持久化
    persist: {
      key: 'user-store', // 存储在 LocalStorage 中的 Key 名
      storage: localStorage, // 明确指定使用 localStorage
      pick: ['token', 'userBaseInfo', 'userInfo'], // 持久化关键数据
    },
  },
)
