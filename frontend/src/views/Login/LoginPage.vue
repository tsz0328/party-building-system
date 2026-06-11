<template>
  <div class="login-container">
    <div class="login-form">
      <h2>系统登录</h2>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        size="large"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginForm.account" placeholder="请输入账号" clearable />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
            @keyup.enter="handleSubmitLogin"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            :loading="userStore.loginLoading"
            :disabled="userStore.loginLoading"
            @click="handleSubmitLogin"
            block
            size="large"
          >
            {{ userStore.loginLoading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>

      <el-divider>
        <span class="divider-text">快捷测试入口</span>
      </el-divider>

      <div class="test-buttons">
        <el-button
          class="test-btn teacher-btn"
          size="large"
          @click="handleTestLogin('teacher')"
          :disabled="userStore.isLogin"
        >
          测试教师登录
        </el-button>
        <el-button
          class="test-btn student-btn"
          size="large"
          @click="handleTestLogin('student')"
          :disabled="userStore.isLogin"
        >
          测试学生登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { UserRole } from '@/types/login'
import type { UserInfo } from '@/types/user'

// 路由实例
const router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref<FormInstance>()

// 表单绑定输入数据
const loginForm = reactive({
  account: '',
  password: '',
})

// 表单校验规则（基础必填校验）
const loginRules: FormRules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 20, message: '账号长度应为3-20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' },
  ],
}

// 测试登录方法
const handleTestLogin = async (role: UserRole) => {
  try {
    const isTeacher = role === 'teacher'

    // 模拟登录数据
    const mockLoginResult = {
      password: 'test123',
      role: isTeacher ? 1 : 2,
      account: isTeacher ? 'T001' : 'S001',
      status: 1,
      token: 'mock-token-' + role,
    }

    // 模拟用户信息
    const mockUserInfo: UserInfo = isTeacher
      ? {
          name: '张老师',
          account: 'T001',
          identity: '中共党员',
          sex: '男',
          nativePlace: '汉族',
          department: '计算机学院',
          partyBranch: '教工党支部',
          role: 'teacher',
          college: '计算机学院',
        }
      : {
          name: '李同学',
          account: 'S001',
          identity: '共青团员',
          sex: '女',
          nativePlace: '汉族',
          className: '计算机2021级1班',
          partyBranch: '学生党支部',
          college: '计算机学院',
          role: 'student',
        }

    // 直接设置 store 数据（模拟登录成功）
    userStore.token = mockLoginResult.token
    userStore.userBaseInfo = mockLoginResult
    userStore.userInfo = mockUserInfo

    ElMessage.success(`${isTeacher ? '教师' : '学生'}测试账号登录成功`)
    router.replace('/')
  } catch (err) {
    console.error('测试登录失败', err)
    ElMessage.error('测试登录失败')
  }
}

// 登录提交方法
const handleSubmitLogin = async () => {
  // 先执行表单校验
  if (!loginFormRef.value) return
  console.log('点击了登录按钮', loginForm)
  loginFormRef.value.validate(async (valid) => {
    console.log('表单验证结果:', valid)
    if (valid) {
      try {
        // 调用store的登录方法
        console.log('开始登录')
        await userStore.handleLogin(loginForm)
        console.log('登录成功')

        // 登录成功后立即获取用户信息
        if (userStore.userBaseInfo?.account) {
          console.log('开始获取用户信息')
          await userStore.fetchUserInfo(userStore.userBaseInfo.account)
          console.log('用户信息获取成功')
        }

        ElMessage.success('登录成功')
        // 登录成功跳转到首页
        router.replace('/')
      } catch (err) {
        // 错误已经在store里处理，这里无需重复逻辑
        console.error('登录失败', err)
      }
    }
  })
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 400px;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-form h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
}

.login-btn {
  margin-top: 10px;
}

.test-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.test-btn {
  flex: 1;
  font-size: 14px;
}

.teacher-btn {
  background-color: #409eff;
  border-color: #409eff;
  color: white;
}

.teacher-btn:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.student-btn {
  background-color: #67c23a;
  border-color: #67c23a;
  color: white;
}

.student-btn:hover {
  background-color: #85ce61;
  border-color: #85ce61;
}

.divider-text {
  font-size: 12px;
  color: #909399;
}
</style>
