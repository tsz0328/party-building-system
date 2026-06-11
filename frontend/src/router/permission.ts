import router from '@/router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

// 白名单：不需要登录就能访问的页面
const whiteList = ['/login']

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const hasToken = userStore.token

  // 有token（已登录）
  if (hasToken) {
    // 已登录的用户，访问登录页，直接跳转到首页，不让重复登录
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 如果还没有用户信息，先去后端获取
      if (!userStore.userInfo) {
        // 尝试获取用户信息
        if (userStore.userBaseInfo?.account) {
          try {
            await userStore.fetchUserInfo(userStore.userBaseInfo.account)
          } catch (error) {
            console.error('获取用户信息失败:', error)
            // 即使获取失败也放行，避免阻塞用户访问
          }
        }
      }
      next() // 无论获取成功与否，都放行
    }
  }
  // 无token（未登录）
  else {
    // 访问的页面在白名单里，直接放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 非白名单页面，跳转到登录页，携带当前页面路径，登录后可以跳回来
      ElMessage.warning('请先登录')
      next(`/login?redirect=${to.fullPath}`)
    }
  }
})

export default router
