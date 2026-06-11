<template>
  <div :class="commonCss.commonContainer">
    <!-- 顶部导航栏 -->
    <div :class="commonCss.topTitleBar">
      <el-button :class="commonCss.backBtn" @click="$router.back()" icon="Back" link
        >返回</el-button
      >
      <div :class="commonCss.contentTitle">新建思想汇报</div>
    </div>

    <div style="padding: 20px 40px">
      <!-- 基本信息 -->
      <div style="margin-bottom: 40px">
        <div class="section-title">基本信息</div>
        <el-form label-width="200px" class="info-form" size="large" disabled>
          <el-form-item label="姓名*">
            <el-input :placeholder="userStore.userInfo?.name"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 思想汇报内容 -->
      <div style="margin-bottom: 40px">
        <div class="section-title">思想汇报内容</div>
        <el-form label-width="200px" class="info-form" size="large">
          <el-form-item label="汇报标题*">
            <el-input placeholder="如：2024年第四季度思想汇报、学习XX会议精神心得体会"></el-input>
          </el-form-item>
          <el-form-item label="汇报日期*">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              clearable
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <!-- 思想汇报材料 -->
      <div style="margin-bottom: 40px">
        <div class="section-title">材料上传</div>
        <div style="margin-bottom: 20px; font-size: 24px; font-weight: bold">上传思想汇报材料*</div>
        <el-upload
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div style="color: black">上传荣誉证书/证明文件</div>
          <div style="color: black">支持JPG、PNG、PDF格式，单个文件不超过10MB</div>
        </el-upload>
      </div>

      <!-- 提交信息 -->
      <div style="margin-bottom: 40px">
        <div class="section-title">提交信息</div>
        <el-form label-width="200px" class="info-form" size="large">
          <!-- 提交至（审核人） -->
          <el-form-item label="提交至（审核人）">
            <el-select placeholder="请选择审核党支部/审核人">
              <el-option label="教育学院党支部-张老师" value=""></el-option>
              <el-option label="文学院党支部-王老师" value=""></el-option>
              <el-option label="马克思主义学院党支部-李老师" value=""></el-option>
              <el-option label="外国语学院党支部-刘老师" value=""></el-option>
              <el-option label="历史文化与旅游学院党支部-王老师" value=""></el-option>
              <el-option label="经济与管理学院党支部-张老师" value=""></el-option>
              <el-option label="数学与计算机科学学院党支部-王老师" value=""></el-option>
              <el-option label="物理与电子工程学院党支部-李老师" value=""></el-option>
              <el-option label="化学与环境工程学院党支部-刘老师" value=""></el-option>
            </el-select>
          </el-form-item>

          <!-- 汇报类型 -->
          <el-form-item label="汇报类型">
            <el-select placeholder="请选择汇报类型">
              <el-option label="季度思想汇报" value="quarterly"></el-option>
              <el-option label="月度思想汇报" value="monthly"></el-option>
              <el-option label="专题学习汇报" value="special"></el-option>
              <el-option label="其他" value="other"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="btn-group">
        <el-button class="reset">重置</el-button>
        <el-button class="save" color="red">提交思想汇报</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import commonCss from '@/assets/css/common.module.css'

const userStore = useUserStore()
</script>

<style scoped>
/* 信息标题 */
.section-title {
  font-size: 24px;
  font-weight: bold;
  color: red;
  margin-bottom: 30px;
}

/* 每个表单 */
.info-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

/* 操作按钮部分 */
.btn-group {
  margin-top: 100px;
  display: flex;
  gap: 100px;
  justify-content: center;
}

/* 重置按钮 */
.reset {
  font-size: 24px;
  padding: 25px 25px;
}

/* 保存修改按钮 */
.save {
  font-size: 24px;
  padding: 25px 25px;
}

/* 标签前文字样式 */
:deep(.el-form-item__label) {
  font-size: 24px;
  font-weight: bold;
  color: black;
}
/* 移除表单默认底部间距 */
:deep(.el-form-item) {
  margin-bottom: 0;
}
/* 保存修改按钮 */
.el-button + .el-button {
  margin-left: 0;
}
</style>
