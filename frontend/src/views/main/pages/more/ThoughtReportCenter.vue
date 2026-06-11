<template>
  <div :class="commonCss.commonContainer">
    <!-- 顶部导航 -->
    <div :class="commonCss.topTitleBar">
      <el-button :class="commonCss.backBtn" @click="$router.back()" link>
        <el-icon style="font-size: 35px"><Back /></el-icon> 返回
      </el-button>
      <div :class="commonCss.contentTitle">思想汇报管理</div>
      <el-button
        class="add-thought-report-btn"
        icon="Plus"
        @click="router.push({ name: 'AddThoughtReport' })"
        color="white"
      >
        新建思想汇报
      </el-button>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-bar">
      <!-- 汇报类型筛选 -->
      <el-select v-model="filterLevel" placeholder="全部汇报类型" class="filter-item">
        <el-option label="全部汇报类型" value="all"></el-option>
        <el-option label="季度思想汇报" value="quarterly"></el-option>
        <el-option label="月度思想汇报" value="monthly"></el-option>
        <el-option label="专题学习汇报" value="specialized"></el-option>
        <el-option label="其他" value="other"></el-option>
      </el-select>

      <!-- 审核状态筛选 -->
      <el-select v-model="filterStatus" placeholder="全部审核状态" class="filter-item">
        <el-option label="全部审核状态" value="all"></el-option>
        <el-option label="草稿" value="draft"></el-option>
        <el-option label="待审核" value="pending"></el-option>
        <el-option label="已通过" value="approved"></el-option>
        <el-option label="已驳回" value="rejected"></el-option>
      </el-select>

      <!-- 关键词搜索 -->
      <el-input placeholder="输入关键词搜索思想汇报" class="input-item" />

      <!-- 搜索按钮 -->
      <el-button class="search-btn" @click="handleSearch" color="red"> 搜索 </el-button>

      <!-- 重置按钮 -->
      <el-button class="reset-btn" @click="handleReset" color="white"> 重置 </el-button>
    </div>

    <!-- 列表 -->
    <div :class="commonCss.contentList">
      <!-- 项 -->
      <div
        class="thought-report-item"
        v-for="item in thoughtReportStore.reportList"
        :key="item.id"
        :class="`status-${item.status}`"
      >
        <!-- 内容 -->
        <div class="thought-report-content">
          <!-- 头部 -->
          <div class="header">
            <div :class="commonCss.itemHeaderTitle">{{ item.title }}</div>
            <div :class="commonCss.itemStatus" :style="getStatusStyle(item.status)">
              <el-icon style="font-size: 24px"
                ><Document v-if="item.status === '草稿'" /><CircleCheck
                  v-else-if="item.status === '已通过'" /><Warning
                  v-else-if="item.status === '待审核'" /><CircleCheck
                  v-else-if="item.status === '已驳回'" /></el-icon
              >{{ item.status }}
            </div>
          </div>

          <!-- 标签 -->
          <el-tag :style="getTagStyle(item.type)" class="type-tag">
            {{ item.type }}
          </el-tag>

          <!-- 汇报情况 -->
          <div class="details">
            <!-- 提交日期 -->
            <div class="icon-text" v-if="item.status !== '草稿'">
              <el-icon style="font-size: 20px; color: red"><Trophy /></el-icon>提交日期：{{
                item.submitDate
              }}
            </div>
            <!-- 已通过/已驳回/待审核：审核人/待审核人 -->
            <div class="icon-text" v-if="item.status !== '草稿'">
              <el-icon style="font-size: 20px; color: red"><Avatar /></el-icon>
              <div v-if="item.status === '已通过' || item.status === '已驳回'">
                审核人： {{ item.reviewer }}
              </div>
              <div v-else-if="item.status === '待审核'">待审核人： {{ item.submitter }}</div>
            </div>
            <!-- 已通过/已驳回：审核时间 -->
            <div class="icon-text" v-if="item.status === '已通过' || item.status === '已驳回'">
              <el-icon style="font-size: 20px; color: red"><Timer /></el-icon>
              审核时间：
              {{ item.reviewTime }}
            </div>
            <!-- 已通过/待审核：提交部门 -->
            <div class="icon-text" v-if="item.status === '已通过' || item.status === '待审核'">
              <el-icon style="font-size: 20px; color: red"><Building /></el-icon>
              提交部门： {{ item.submitDept }}
            </div>
            <!-- 草稿：保存日期 -->
            <div class="icon-text" v-if="item.status === '草稿'">
              <el-icon style="font-size: 20px; color: red"><Calendar /></el-icon> 保存日期：{{
                item.saveDate
              }}
            </div>
            <!-- 草稿：状态未提交 -->
            <div class="icon-text" v-if="item.status === '草稿'">
              <el-icon style="font-size: 20px; color: red"><QuestionFilled /></el-icon>状态：未提交
            </div>
          </div>

          <!-- 汇报描述 -->
          <div style="line-height: 1.5">{{ item.content }}</div>

          <!-- 操作按钮 -->
          <div style="margin-top: 20px; display: flex; gap: 10px">
            <!--  已通过显示查看详情和下载汇报 -->
            <el-button class="button" v-if="item.status === '已通过'"> 查看详情 </el-button>
            <el-button class="button" v-if="item.status === '已通过'"> 下载汇报 </el-button>
            <!-- 待审核显示编辑、删除和撤回提交 -->
            <el-button class="edit-btn" v-if="item.status === '待审核'"> 编辑 </el-button>
            <el-button class="delete-btn" v-if="item.status === '待审核'"> 删除 </el-button>
            <el-button class="button" v-if="item.status === '待审核'"> 撤回提交 </el-button>
            <!-- 已驳回显示重新编辑和查看详情 -->
            <el-button class="delete-btn" v-if="item.status === '已驳回'"> 重新编辑 </el-button>
            <el-button class="button" v-if="item.status === '已驳回'"> 查看详情 </el-button>
            <!-- 草稿显示继续编辑、提交审核和删除草稿 -->
            <el-button class="delete-btn" v-if="item.status === '草稿'"> 继续编辑 </el-button>
            <el-button class="button" v-if="item.status === '草稿'"> 提交审核 </el-button>
            <el-button class="delete-btn" v-if="item.status === '草稿'"> 删除草稿 </el-button>
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
import { useRouter } from 'vue-router'
import { useThoughtReportStore } from '@/stores/thought-report'
import { ref } from 'vue'
import commonCss from '@/assets/css/common.module.css'

const router = useRouter()
const thoughtReportStore = useThoughtReportStore()

// 筛选数据
const filterLevel = ref('all')
const filterType = ref('all')
const filterStatus = ref('all')
const currentPage = ref(1)
const pageSize = ref(1)
const total = ref(10)

// 搜索按钮
const handleSearch = () => {
  // 这里可以对接接口实现筛选查询
  console.log('筛选条件：', filterLevel.value, filterType.value, filterStatus.value)
}

// 根据状态返回对应的样式
const getStatusStyle = (status: '草稿' | '待审核' | '已通过' | '已驳回'): string => {
  switch (status) {
    case '草稿':
      return 'color: black;'
    case '待审核':
      return 'color: orange;'
    case '已通过':
      return 'color: green;'
    case '已驳回':
      return 'color: red;'
    default:
      return ''
  }
}

// 根据类型返回对应的标签样式
const getTagStyle = (type: '季度思想汇报' | '月度思想汇报' | '专题学习汇报' | '其他') => {
  const styles: Record<string, string> = {
    季度思想汇报: 'background-color: green;',
    月度思想汇报: 'background-color: #4FC3F7;',
    专题学习汇报: 'background-color: orange;',
    其他: 'background-color: #006400;',
  }
  return styles[type] || ''
}

// 重置筛选条件
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
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins.scss' as *;

/* 添加思想汇报按钮 */
.add-thought-report-btn {
  @include top-bar-right-btn;
  @include click-btn;
}

/* 筛选区域 */
.filter-bar {
  @include filter-bar;
  gap: 20px;
}

/* 前面两项筛选固定宽度 */
.filter-item {
  width: 25%;
}

/* 搜索框 */
.input-item {
  flex: 1;
}

.reset-btn {
  @include click-btn;
}

/* 每一项思想汇报 */
.thought-report-item {
  @include item;
}
/* 汇报内容 */
.thought-report-content {
  flex: 1;
  padding: 20px;
}
/* 汇报头部 */
.header {
  @include item-header;
}

/* 图标文本 */
.icon-text {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 汇报类型标签 */
.type-tag {
  color: white;
  font-size: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
}

/* 汇报详情 */
.details {
  @include item-details;
  gap: 40px;
}

.button {
  color: black;
  font-size: 16px;
}
.edit-btn {
  color: blue;
  font-size: 16px;
}
.delete-btn {
  color: red;
  font-size: 16px;
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
