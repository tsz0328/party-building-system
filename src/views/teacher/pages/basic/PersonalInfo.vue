<template>
  <div class="personal-info">
    <div class="header">
      <img class="user2" src="@/assets/img/user2.png" alt="用户图标" />
      <div class="title">个人信息展示</div>
    </div>
    <!-- 加载状态  -->
    <div v-if="loading">正在加载个人信息...</div>
    <div v-else-if="error" class="retry">
      {{ error
      }}<el-button @click="retry" :loading="loading" icon="RefreshLeft" color="red">
        重试
      </el-button>
    </div>
    <div v-else-if="userInfo" class="info-list">
      <div class="info-item">姓名：{{ userInfo.name }}</div>
      <template v-if="userStore.isTeacher">
        <div class="info-item">工号：{{ userInfo.account }}</div>
        <div class="info-item">政治面貌：{{ userInfo.identity }}</div>
        <div class="info-item">民族：{{ userInfo.nativePlace }}</div>
        <div class="info-item">所在部门：{{ userInfo.department }}</div>
        <div class="info-item">党支部：{{ userInfo.partyBranch }}</div>
      </template>
      <template v-else-if="userStore.isStudent">
        <div class="info-item">学号：{{ userInfo.account }}</div>
        <div class="info-item">政治面貌：{{ userInfo.identity }}</div>
        <div class="info-item">民族：{{ userInfo.nativePlace }}</div>
        <div class="info-item">班级：{{ userInfo.className }}</div>
        <div class="info-item">党支部：{{ userInfo.partyBranch }}</div>
        <div class="info-item">学院：{{ userInfo.college }}</div>
      </template>
    </div>
    <!-- 跳转编辑个人信息的按钮 -->
    <el-button class="edit-btn" @click="router.push({ name: 'EditProfile' })" color="red">
      编辑个人信息
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const { userBaseInfo, userInfo, loading, error } = storeToRefs(userStore)
const { fetchUserInfo } = userStore

const currentAccount = computed(() => userBaseInfo.value?.account)

const tryFetchUserInfo = (force = false) => {
  const account = currentAccount.value
  // 基础判断：必须有账号
  if (!account) {
    ElMessage.warning('无法获取用户账号，请重新登录')
    return
  }
  // 逻辑：如果没有数据，或者是强制刷新模式，才调用接口
  if (!userInfo.value || force) {
    fetchUserInfo(account)
  }
}

onMounted(() => {
  tryFetchUserInfo()
})

const retry = () => {
  tryFetchUserInfo(true)
}
</script>
<script lang="ts">
export default {}
</script>

<style scoped>
.personal-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
}

.user2 {
  width: 60px;
  height: auto;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: red;
}

.retry {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-list {
  font-size: 24px;
}

.info-item {
  margin-bottom: 10px;
  line-height: 1.5;
}

.edit-btn {
  width: 100%;
  font-size: 20px;
  padding: 25px 0;
  margin-top: auto;
  margin-bottom: 50px;
}
</style>
