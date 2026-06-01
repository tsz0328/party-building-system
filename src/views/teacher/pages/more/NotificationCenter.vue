<template>
  <div :class="commonCss.commonContainer">
    <!-- 顶部导航 -->
    <div :class="commonCss.topTitleBar">
      <el-button :class="commonCss.backBtn" @click="$router.back()" icon="Back" link>
        返回
      </el-button>
      <div :class="commonCss.contentTitle">通知中心</div>
      <el-button class="mark-all-btn" @click="handleMarkAllRead" color="white">
        标记全部已读
      </el-button>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-bar">
      <!-- 通知类型筛选 -->
      <el-select v-model="filterType" placeholder="全部通知类型" class="filter-item">
        <el-option label="全部通知类型" value="all"></el-option>
        <el-option label="荣誉审核" value="honor"></el-option>
        <el-option label="党建活动" value="activity"></el-option>
        <el-option label="思想汇报" value="report"></el-option>
        <el-option label="系统通知" value="system"></el-option>
        <el-option label="重要公告" value="notice"></el-option>
      </el-select>

      <!-- 通知状态筛选 -->
      <el-select v-model="filterStatus" placeholder="全部状态" class="filter-item">
        <el-option label="全部状态" value="all"></el-option>
        <el-option label="未读" value="unread"></el-option>
        <el-option label="已读" value="read"></el-option>
      </el-select>

      <!-- 关键词搜索 -->
      <el-input v-model="keyword" placeholder="输入关键词搜索通知标题/内容" class="input-item" />

      <!-- 搜索按钮 -->
      <el-button class="search-btn" @click="handleSearch" color="red"> 搜索 </el-button>

      <!-- 重置按钮 -->
      <el-button class="reset-btn" @click="handleReset" color="white"> 重置 </el-button>
    </div>

    <!-- 通知列表 -->
    <div :class="commonCss.contentList">
      <!-- 通知项 -->
      <div
        class="notification-item"
        v-for="item in noticeStore.noticeList"
        :key="item.id"
        :class="`status-${item.status}`"
      >
        <!-- 状态线 -->
        <div class="left-line"></div>
        <!-- 通知内容 -->
        <div class="notification-content">
          <div style="overflow: hidden">
            <!-- 通知头部 -->
            <div class="header">
              <div :class="commonCss.itemHeaderTitle" class="header-title">{{ item.title }}</div>
              <div>{{ item.time }}</div>
            </div>
            <!-- 通知类型标签 -->
            <el-tag :style="getTagStyle(item.tag)" class="type-tag">
              {{ getTagText(item.tag) }}
            </el-tag>
            <!-- 通知描述 -->
            <p class="desc">{{ item.desc }}</p>
          </div>
          <!-- 标记已读按钮 -->
          <div style="display: flex">
            <el-button
              v-if="item.status === 'unread'"
              class="mark-btn"
              @click="handleMarkRead(item.id)"
            >
              标记已读
            </el-button>
            <div v-else class="mark-btn">已读</div>
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
import { useNoticeStore } from '@/stores/notice'
import { ref } from 'vue'

const noticeStore = useNoticeStore()

// 筛选数据
const filterType = ref('all')
const filterStatus = ref('all')
const keyword = ref('')
const currentPage = ref(1)
const pageSize = ref(1)
const total = ref(10)

const getTagStyle = (type: 'honor' | 'activity' | 'report' | 'system' | 'notice') => {
  const styles: Record<string, string> = {
    honor: 'background-color: red',
    activity: 'background-color: orange',
    report: 'background-color: green',
    system: 'background-color: blue',
    notice: 'background-color: crimson',
  }
  return styles[type] || ''
}

const getTagText = (tag: string) => {
  const tagMap = {
    honor: '荣誉审核',
    activity: '党建活动',
    report: '思想汇报',
    system: '系统通知',
    notice: '重要公告',
  }
  // 兜底：若状态值异常，显示“状态未知”，避免页面空白
  return tagMap[tag as keyof typeof tagMap] || '其他'
}

// 标记全部已读
const handleMarkAllRead = () => {
  noticeStore.noticeList.forEach((item) => {
    item.status = 'read'
  })
}

// 标记单条已读
const handleMarkRead = (id: string) => {
  const item = noticeStore.noticeList.find((item) => item.id === id)
  if (item) item.status = 'read'
}

// 搜索
const handleSearch = () => {
  console.log('搜索条件：', filterType.value, filterStatus.value, keyword.value)
  // 这里可以对接接口实现真实搜索
}

// 重置筛选
const handleReset = () => {
  filterType.value = 'all'
  filterStatus.value = 'all'
  keyword.value = ''
}

// 分页切换
const handlePageChange = (page: number) => {
  currentPage.value = page
  // 这里可以对接接口实现分页查询
}
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins.scss' as *;

/* 标记全部已读按钮 */
.mark-all-btn {
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

//重置按钮
.reset-btn {
  @include click-btn;
}
/* 每一项通知 */
.notification-item {
  @include item;
}
/* 左侧状态线 */
.left-line {
  width: 10px;
  border-radius: 8px 0 0 8px;
}
/* 未读状态下的左侧状态线 */
.status-unread .left-line {
  background-color: red;
}
/* 已读状态下的左侧状态线 */
.status-read .left-line {
  background-color: lightgray;
}

/* 通知内容 */
.notification-content {
  flex: 1;
  padding: 20px;
}

/* 未读通知背景色 */
.status-unread .notification-content {
  background-color: lightgray;
}

/* 通知头部 */
.header {
  @include item-header;
}

/* 未读通知标题 */
.status-unread .header-title {
  color: red;
}

/* 通知类型标签 */
.type-tag {
  color: white;
  font-size: 16px;
  border-radius: 8px;
}

/* 通知描述 */
.desc {
  line-height: 1.5;
  margin: 15px 0;
}

/* 标记按钮 */
.mark-btn {
  color: blue;
  padding: 10px;
  margin: 0 0 0 auto;
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
