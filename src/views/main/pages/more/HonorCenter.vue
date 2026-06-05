<template>
  <div :class="commonCss.commonContainer">
    <!-- 顶部导航 -->
    <div :class="commonCss.topTitleBar">
      <el-button :class="commonCss.backBtn" @click="$router.back()" icon="Back" link>
        返回
      </el-button>
      <div :class="commonCss.contentTitle">个人荣誉墙</div>
      <el-button
        class="addHonor-btn"
        icon="Plus"
        @click="router.push({ name: 'AddHonor' })"
        color="white"
      >
        添加荣誉
      </el-button>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-bar">
      <!-- 荣誉级别筛选 -->
      <el-select v-model="filterLevel" placeholder="全部荣誉级别" class="filter-item">
        <el-option label="全部荣誉级别" value="all"></el-option>
        <el-option label="校级" value="school"></el-option>
        <el-option label="院级" value="college"></el-option>
        <el-option label="省级" value="province"></el-option>
        <el-option label="国家级" value="national"></el-option>
      </el-select>

      <!-- 荣誉类型筛选 -->
      <el-select v-model="filterType" placeholder="全部荣誉类型" class="filter-item">
        <el-option label="全部荣誉类型" value="all"></el-option>
        <el-option label="党建类" value="party"></el-option>
        <el-option label="学业类" value="study"></el-option>
        <el-option label="综合类" value="comprehensive"></el-option>
        <el-option label="实践类" value="practice"></el-option>
      </el-select>

      <!-- 审核状态筛选 -->
      <el-select v-model="filterStatus" placeholder="全部审核状态" class="filter-item">
        <el-option label="全部审核状态" value="all"></el-option>
        <el-option label="待审核" value="pending"></el-option>
        <el-option label="已通过" value="approved"></el-option>
        <el-option label="未通过" value="rejected"></el-option>
      </el-select>

      <!-- 筛选按钮 -->
      <el-button @click="handleSearch" color="red"> 筛选 </el-button>

      <!-- 重置按钮 -->
      <el-button @click="handleReset" color="lightgray" style="border: 1px solid red">
        重置
      </el-button>
    </div>

    <!-- 列表 -->
    <div :class="commonCss.contentList">
      <!-- 项 -->
      <div
        class="honor-item"
        v-for="item in honorStore.honorList"
        :key="item.id"
        :class="`status-${item.status}`"
      >
        <!-- 内容 -->
        <div class="honor-content">
          <!-- 头部 -->
          <div class="header">
            <div :class="commonCss.itemHeaderTitle">{{ item.name }}</div>
            <div :class="commonCss.itemStatus" :style="getStatusStyle(item.status)">
              <el-icon style="font-size: 24px"
                ><CircleCheck v-if="item.status === 'approved'" /><Warning
                  v-else-if="item.status === 'pending'" /><CircleClose
                  v-else-if="item.status === 'rejected'" /></el-icon
              >{{ getStatusText(item.status) }}
            </div>
          </div>

          <!-- 标签 -->
          <el-tag :style="getTypeStyle(item.type)" class="type-tag">
            {{ getTypeText(item.type) }}
          </el-tag>

          <!-- 详情 -->
          <div class="details">
            <!-- 荣誉级别 -->
            <div class="icon-text">
              <el-icon style="font-size: 20px; color: red"><Trophy /></el-icon>荣誉级别：{{
                getLevelText(item.level)
              }}
            </div>
            <!-- 获得日期/申报日期 -->
            <div class="icon-text">
              <el-icon style="font-size: 20px; color: red"><Calendar /></el-icon>
              <div v-if="item.status === 'approved'">获得日期：</div>
              <div v-else>申报日期：</div>
              {{ item.date }}
            </div>
            <!-- 待审核人/审核人 -->
            <div class="icon-text">
              <el-icon style="font-size: 20px; color: red"><User /></el-icon>
              <div v-if="item.status === 'pending'">待审核人：</div>
              <div v-else>审核人：</div>
              {{ item.reviewer }}
            </div>
            <!-- 审核时间 -->
            <div class="icon-text">
              <el-icon v-if="item.status !== 'pending'" style="font-size: 20px; color: red"
                ><Timer
              /></el-icon>
              <div v-if="item.status !== 'pending'">审核时间：</div>
              {{ item.reviewTime }}
            </div>
          </div>

          <!-- 荣誉描述 -->
          <div class="desc">{{ item.description }}</div>

          <!--  已通过显示查看荣誉证书附件 -->
          <div v-if="item.status === 'approved'" style="margin: 10px 0">
            <el-button
              @click="handleViewAttachment(item)"
              type="primary"
              icon="Link"
              link
              style="font-size: large"
            >
              查看荣誉证书附件
            </el-button>
          </div>

          <!--  待审核显示编辑、删除按钮 -->
          <div
            v-else-if="item.status === 'pending'"
            style="margin: 10px 0; display: flex; gap: 20px"
          >
            <el-button @click="handleEdit(item)" type="primary" icon="Edit"> 编辑 </el-button>
            <el-button @click="handleDelete(item)" type="danger" icon="Delete"> 删除 </el-button>
          </div>

          <!-- 已驳回显示驳回原因、重新提交按钮 -->
          <div v-else-if="item.status === 'rejected'" style="margin: 10px 0">
            <!-- 驳回原因 -->
            <div style="color: red">驳回原因：{{ item.rejectReason }}</div>
            <!-- 重新申报按钮 -->
            <el-button
              @click="handleReSubmit(item)"
              type="primary"
              icon="RefreshLeft"
              style="margin-top: 10px"
            >
              重新申报
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页组件 -->
    <div class="pagination">
      <el-pagination
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        background
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import commonCss from '@/assets/css/common.module.css'
import type { HonorList } from '@/stores/honor'
import { useHonorStore } from '@/stores/honor'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const honorStore = useHonorStore()

// 筛选数据
const filterLevel = ref('all')
const filterType = ref('all')
const filterStatus = ref('all')
const currentPage = ref(1)
const pageSize = ref(1)
const total = ref(10)

const handleSearch = () => {
  // 这里可以对接接口实现筛选查询
  console.log('筛选条件：', filterLevel.value, filterType.value, filterStatus.value)
}

const getStatusStyle = (status: 'approved' | 'pending' | 'rejected'): string => {
  switch (status) {
    case 'approved':
      return 'color: green;'
    case 'pending':
      return 'color: orange;'
    case 'rejected':
      return 'color: red;'
    default:
      return ''
  }
}

const getTypeStyle = (type: 'party' | 'study' | 'comprehensive' | 'practice') => {
  const styles: Record<string, string> = {
    party: 'background-color: red;',
    study: 'background-color: green;',
    comprehensive: 'background-color: blue;',
    practice: 'background-color: orange;',
  }
  return styles[type] || ''
}

// 查看附件
const handleViewAttachment = (item: HonorList) => {
  if (item.attachmentUrl) {
    window.open(item.attachmentUrl, '_blank')
  } else {
    alert('无附件可查看')
  }
}

// 编辑荣誉
const handleEdit = (item: HonorList) => {
  console.log('编辑荣誉：', item)
  // 这里可以跳转到编辑页面或弹出编辑对话框
}

// 删除荣誉
const handleDelete = (item: HonorList) => {
  console.log('删除荣誉：', item)
  // 这里可以弹出确认对话框，确认后执行删除操作
}

// 重新提交审核
const handleReSubmit = (item: HonorList) => {
  console.log('重新提交审核：', item)
  // 这里可以跳转到重新提交页面或弹出重新提交对话框
}

// 重置筛选
const handleReset = () => {
  filterLevel.value = 'all'
  filterType.value = 'all'
  filterStatus.value = 'all'
}

// 分页切换
const handlePageChange = (page: number) => {
  currentPage.value = page
  // 这里可以对接接口实现分页查询
}

// 荣誉状态英文转中文
const getStatusText = (status: string) => {
  const statusMap = {
    pending: '待审核',
    approved: '已通过',
    rejected: '未通过',
  }
  // 兜底：若状态值异常，显示“状态未知”，避免页面空白
  return statusMap[status as keyof typeof statusMap] || '其他'
}

// 荣誉类型英文转中文
const getTypeText = (type: string) => {
  const typeMap = {
    party: '党建类',
    study: '学业类',
    comprehensive: '综合类',
    practice: '实践类',
  }
  // 兜底：若类型值异常，显示“类型未知”
  return typeMap[type as keyof typeof typeMap] || '其他'
}

// 荣誉级别英文转中文
const getLevelText = (level: string) => {
  const levelMap = {
    school: '校级',
    college: '院级',
    province: '省级',
    national: '国家级',
  }
  // 兜底：若级别值异常，显示“级别未知”
  return levelMap[level as keyof typeof levelMap] || '其他'
}
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins.scss' as *;

/* 添加荣誉按钮 */
.addHonor-btn {
  @include top-bar-right-btn;
  @include click-btn;
}

/* 筛选区域 */
.filter-bar {
  @include filter-bar;
}
/* 筛选框固定宽度 */
.filter-item {
  width: 25%;
}

/* 每一项荣誉 */
.honor-item {
  @include item;
}
/* 荣誉内容 */
.honor-content {
  flex: 1;
  padding: 20px;
}
/* 荣誉头部 */
.header {
  @include item-header;
}

/* 图标文本 */
.icon-text {
  width: 20%;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 荣誉类型标签 */
.type-tag {
  color: white;
  font-size: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
}

/* 荣誉详情 */
.details {
  @include item-details;
  justify-content: space-between;
}

/* 荣誉描述 */
.desc {
  line-height: 1.5;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
}

/* 消除重置按钮默认间距 */
.el-button + .el-button {
  margin-left: 0px;
}
</style>
