<template>
  <div class="navbar">
    <div class="navbar-left">
      <img src="@/assets/img/party-logo.png" alt="党建logo" class="logo" />
      <span class="system-name">党建系统</span>
    </div>
    <div class="navbar-right">
      <span class="welcome"
        >欢迎您：{{ userStore.userInfo?.name }}
        <template v-if="userStore.isTeacher"> | 工号：{{ userStore.userInfo?.account }} </template>
        <template v-else-if="userStore.isStudent">
          | 学号：{{ userStore.userInfo?.account }}
        </template>
        | {{ userStore.userInfo?.identity }}</span
      >
      <el-button class="logout" @click="handleLogout" icon="RefreshLeft" link>退出登录</el-button>
      <img src="@/assets/img/user1.png" alt="用户头像" class="logo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    userStore.handleLogout()
    ElMessage.success('退出登录成功')
    router.replace('/login')
  } catch (error) {
    // 用户点击取消，不做任何操作
  }
}
</script>
<script lang="ts">
export default {}
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 80px;
  background-color: crimson;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.navbar-left {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.welcome {
  font-size: 20px;
}

.logout {
  font-size: 20px;
  color: white !important;
}
.logout:hover {
  color: lightgray !important;
}
.logout:active {
  color: gray !important;
}
</style>
