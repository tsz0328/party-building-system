<template>
  <div :class="commonCss.commonContainer">
    <!-- 顶部导航栏 -->
    <div :class="commonCss.topTitleBar">
      <el-button :class="commonCss.backBtn" @click="$router.back()" icon="Back" link
        >返回</el-button
      >
      <div :class="commonCss.contentTitle">添加荣誉</div>
    </div>

    <div style="padding: 0 40px">
      <!-- 基本信息 -->
      <div style="margin-bottom: 40px">
        <div class="section-title">基本信息</div>
        <el-form label-width="200px" class="info-form" size="large" disabled>
          <el-form-item label="姓名*">
            <el-input :placeholder="userStore.userInfo?.name"></el-input>
          </el-form-item>
          <el-form-item label="所属学院*">
            <el-select :placeholder="userStore.userInfo?.college"> </el-select>
          </el-form-item>
        </el-form>
      </div>

      <!-- 荣誉信息 -->
      <div style="margin-bottom: 40px">
        <div class="section-title">荣誉信息</div>
        <el-form label-width="200px" class="info-form" size="large">
          <el-form-item label="荣誉名称*">
            <el-input placeholder="如：2024年第四季度思想汇报、学习XX会议精神心得体会"></el-input>
          </el-form-item>
          <el-form-item label="荣誉级别*">
            <el-select placeholder="请选择荣誉级别">
              <el-option label="校级" value="school"></el-option>
              <el-option label="院级" value="college"></el-option>
              <el-option label="省级" value="province"></el-option>
              <el-option label="国家级" value="national"></el-option>
              <el-option label="其他" value="other"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="荣誉类型*">
            <el-select placeholder="请选择荣誉类型">
              <el-option label="党建类（如优秀党员、党建竞赛等）" value="party"></el-option>
              <el-option label="学业类（如奖学金、学科竞赛等）" value="study"></el-option>
              <el-option label="综合类（如三好学生、优秀干部等）" value="comprehensive"></el-option>
              <el-option label="实践类（如志愿服务、社会实践等）" value="practice"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="获得日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              clearable
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <!-- 荣誉说明 -->
      <div style="margin-bottom: 40px">
        <div class="section-title" style="color: black">荣誉说明</div>
        <el-input
          class="honorDescription"
          :rows="6"
          type="textarea"
          placeholder="请描述荣誉获取的背景、过程或相关说明（如：2024年5月参加学校党建知识竞赛，荣获一等奖"
        />
        <div style="font-size: small; font-weight: bold; color: gray">
          非必填，可补充说明荣誉相关信息
        </div>
      </div>

      <!-- 证明材料 -->
      <div style="margin-bottom: 40px">
        <div class="section-title">证明材料</div>
        <div style="margin-bottom: 20px; font-size: 24px; font-weight: bold">
          上传荣誉证书/证明文件*
        </div>
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

      <!-- 操作按钮 -->
      <div class="btn-group">
        <el-button class="reset">重置</el-button>
        <el-button class="save" color="red">提交荣誉信息</el-button>
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

/* 荣誉说明 */
.honorDescription {
  display: flex;
  margin-bottom: 15px;
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

/* 标签样式 */
:deep(.el-form-item__label) {
  font-size: 24px;
  font-weight: bold;
  color: black;
}
/* 移除网格子元素间距 */
:deep(.el-form-item) {
  margin-bottom: 0;
}
/* 保存修改按钮 */
.el-button + .el-button {
  margin-left: 0;
}
</style>
