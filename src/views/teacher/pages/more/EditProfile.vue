<template>
  <div :class="commonCss.commonContainer">
    <!-- 顶部导航栏 -->
    <div :class="commonCss.topTitleBar">
      <el-button :class="commonCss.backBtn" @click="$router.back()" icon="Back" link>
        返回
      </el-button>
      <div :class="commonCss.contentTitle">编辑个人信息</div>
    </div>

    <div style="padding: 0 40px">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="200px"
        class="info-form"
        size="large"
      >
        <!-- 基本信息（教师和学生共用） -->
        <div style="margin-bottom: 40px">
          <div class="section-title">基本信息</div>
          <el-form label-width="200px" class="info-form" size="large">
            <el-form-item label="姓名*" prop="name">
              <el-input v-model="formData.name" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别*" prop="sex">
              <el-select v-model="formData.sex" placeholder="请选择" clearable style="width: 100%">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
            <el-form-item label="民族*" prop="nativePlace">
              <el-input v-model="formData.nativePlace" placeholder="如：汉族" clearable></el-input>
            </el-form-item>
            <el-form-item :label="userStore.isTeacher ? '工号*' : '学号*'" prop="account">
              <el-input
                v-model="formData.account"
                placeholder="请输入工号/学号"
                clearable
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号码*" prop="idCard">
              <el-input
                v-model="formData.idCard"
                placeholder="请输入身份证号码"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话*" prop="phone">
              <el-input v-model="formData.phone" placeholder="请输入联系电话" clearable></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱*" prop="email">
              <el-input v-model="formData.email" placeholder="请输入电子邮箱" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>

        <!-- 学生学籍信息 -->
        <template v-if="userStore.isStudent">
          <div style="margin-bottom: 40px">
            <div class="section-title">学籍信息</div>
            <el-form label-width="200px" class="info-form" size="large">
              <el-form-item label="学院*" prop="college">
                <el-input v-model="formData.college" placeholder="请输入学院" clearable></el-input>
              </el-form-item>
              <el-form-item label="专业*" prop="major">
                <el-input v-model="formData.major" placeholder="请输入专业" clearable></el-input>
              </el-form-item>
              <el-form-item label="班级*" prop="className">
                <el-input
                  v-model="formData.className"
                  placeholder="请输入班级"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </template>

        <!-- 党建信息 -->
        <div style="margin-bottom: 40px">
          <div class="section-title">党建信息</div>
          <el-form label-width="200px" class="info-form" size="large">
            <el-form-item label="政治面貌*" prop="identity">
              <el-select
                v-model="formData.identity"
                placeholder="请选择政治面貌"
                clearable
                style="width: 100%"
              >
                <el-option label="中共党员" value="中共党员" />
                <el-option label="中共预备党员" value="中共预备党员" />
                <el-option label="共青团员" value="共青团员" />
                <el-option label="群众" value="群众" />
              </el-select>
            </el-form-item>
            <el-form-item label="党支部*" prop="partyBranch">
              <el-input
                v-model="formData.partyBranch"
                placeholder="请输入党支部"
                clearable
              ></el-input>
            </el-form-item>

            <!-- 教师专属字段 -->
            <template v-if="userStore.isTeacher">
              <el-form-item label="所在部门*" prop="department">
                <el-input
                  v-model="formData.department"
                  placeholder="请输入所在部门"
                  clearable
                ></el-input>
              </el-form-item>
            </template>

            <el-form-item label="入党时间*" prop="joinPartyTime">
              <el-date-picker
                v-model="formData.joinPartyTime"
                type="date"
                placeholder="请选择入党时间"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>

        <!-- 学生紧急联系人 -->
        <template v-if="userStore.isStudent">
          <div style="margin-bottom: 40px">
            <div class="section-title">紧急联系人</div>
            <el-form label-width="200px" class="info-form" size="large">
              <el-form-item label="紧急联系人姓名*" prop="emergencyContact">
                <el-input
                  v-model="formData.emergencyContact"
                  placeholder="请输入紧急联系人姓名"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="关系*" prop="emergencyRelation">
                <el-input
                  v-model="formData.emergencyRelation"
                  placeholder="请输入与本人关系"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="联系电话*" prop="emergencyPhone">
                <el-input
                  v-model="formData.emergencyPhone"
                  placeholder="请输入紧急联系人电话"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </template>

        <!-- 操作按钮 -->
        <div class="btn-group">
          <el-button class="reset" @click="resetForm">重置</el-button>
          <el-button class="save" color="red" @click="saveForm">保存修改</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import commonCss from '@/assets/css/common.module.css'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance>()

// 表单数据
const formData = reactive({
  name: '',
  sex: '',
  nativePlace: '',
  account: '',
  idCard: '',
  phone: '',
  email: '',
  identity: '',
  partyBranch: '',
  department: '',
  joinPartyTime: '',
  college: '',
  major: '',
  className: '',
  emergencyContact: '',
  emergencyRelation: '',
  emergencyPhone: '',
})

// 表单验证规则
const rules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  nativePlace: [{ required: true, message: '请输入民族', trigger: 'blur' }],
  account: [{ required: true, message: '请输入工号/学号', trigger: 'blur' }],
  idCard: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }],
  identity: [{ required: true, message: '请选择政治面貌', trigger: 'change' }],
  partyBranch: [{ required: true, message: '请输入党支部', trigger: 'blur' }],
  department: [{ required: true, message: '请输入所在部门', trigger: 'blur' }],
  joinPartyTime: [{ required: true, message: '请选择入党时间', trigger: 'change' }],
  college: [{ required: true, message: '请输入学院', trigger: 'blur' }],
  major: [{ required: true, message: '请输入专业', trigger: 'blur' }],
  className: [{ required: true, message: '请输入班级', trigger: 'blur' }],
  emergencyContact: [{ required: true, message: '请输入紧急联系人姓名', trigger: 'blur' }],
  emergencyRelation: [{ required: true, message: '请输入与本人关系', trigger: 'blur' }],
  emergencyPhone: [{ required: true, message: '请输入紧急联系人电话', trigger: 'blur' }],
}

// 初始化表单数据
const initFormData = () => {
  if (userStore.userInfo) {
    const info = userStore.userInfo
    formData.name = info.name || ''
    formData.sex = info.sex || ''
    formData.nativePlace = info.nativePlace || ''
    formData.account = info.account || ''
    formData.idCard = info.idCard || ''
    formData.phone = info.phone || ''
    formData.email = info.email || ''
    formData.identity = info.identity || ''
    formData.partyBranch = info.partyBranch || ''
    formData.department = info.department || ''
    formData.joinPartyTime = info.joinPartyTime || ''
    formData.college = info.college || ''
    formData.major = info.major || ''
    formData.className = info.className || ''
    formData.emergencyContact = info.emergencyContact || ''
    formData.emergencyRelation = info.emergencyRelation || ''
    formData.emergencyPhone = info.emergencyPhone || ''
  }
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  initFormData()
}

// 保存表单
const saveForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    // 更新 store 中的用户信息
    if (userStore.userInfo) {
      const info = userStore.userInfo
      info.name = formData.name
      info.sex = formData.sex
      info.nativePlace = formData.nativePlace
      info.account = formData.account
      info.idCard = formData.idCard
      info.phone = formData.phone
      info.email = formData.email
      info.identity = formData.identity
      info.partyBranch = formData.partyBranch
      info.joinPartyTime = formData.joinPartyTime

      if (userStore.isTeacher) {
        info.department = formData.department
      }
      if (userStore.isStudent) {
        info.college = formData.college
        info.major = formData.major
        info.className = formData.className
        info.emergencyContact = formData.emergencyContact
        info.emergencyRelation = formData.emergencyRelation
        info.emergencyPhone = formData.emergencyPhone
      }
    }
    ElMessage.success('保存成功')
    router.back()
  } catch (error) {
    console.error('表单验证失败', error)
  }
}

onMounted(() => {
  initFormData()
})
</script>

<style scoped>
/* 信息标题 */
.section-title {
  font-size: 24px;
  font-weight: bold;
  color: red;
  margin-bottom: 30px;
}

/* 按钮组 */
.btn-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.btn-group .reset {
  padding: 8px 30px;
}

.btn-group .save {
  padding: 8px 30px;
}
</style>
