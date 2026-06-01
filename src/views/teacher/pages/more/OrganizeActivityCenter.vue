<template>
  <div :class="commonCss.commonContainer">
    <!-- 顶部导航 -->
    <div :class="commonCss.topTitleBar">
      <el-button :class="commonCss.backBtn" @click="$router.back()" link>
        <el-icon style="font-size: 35px"><Back /></el-icon> 返回
      </el-button>
      <div :class="commonCss.contentTitle">组织活动管理</div>
      <el-button class="all-activity-btn" color="white"> 全部活动 </el-button>
      <el-button class="my-activity-btn" color="white">我的报名</el-button>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-bar">
      <!-- 活动类型筛选 -->
      <el-select v-model="filterType" placeholder="全部活动类型" class="filter-item">
        <el-option label="理论学习" value="theoretical"></el-option>
        <el-option label="实践活动" value="practical"></el-option>
        <el-option label="支部会议" value="branch-meeting"></el-option>
        <el-option label="党建竞赛" value="party-competition"></el-option>
      </el-select>

      <!-- 活动状态筛选 -->
      <el-select v-model="filterStatus" placeholder="全部活动状态" class="filter-item">
        <el-option label="未开始" value="not-started"></el-option>
        <el-option label="进行中" value="in-progress"></el-option>
        <el-option label="已报名" value="signed-up"></el-option>
        <el-option label="已结束" value="ended"></el-option>
      </el-select>

      <!-- 关键词搜索 -->
      <el-input placeholder="输入活动名称关键词搜索组织活动" class="input-item" />

      <!-- 搜索按钮 -->
      <el-button class="search-btn" @click="handleSearch" color="red"> 搜索 </el-button>

      <!-- 重置按钮 -->
      <el-button class="reset-btn" @click="handleReset" color="white"> 重置 </el-button>
    </div>

    <!-- 组织活动列表 -->
    <div :class="commonCss.contentList">
      <!-- 组织活动项 -->
      <div
        class="activity-item"
        v-for="item in activityStore.activityList"
        :key="item.id"
        :class="`status-${item.status}`"
      >
        <!-- 活动内容 -->
        <div class="activity-content">
          <!-- 活动头部 -->
          <div class="header">
            <div :class="commonCss.itemHeaderTitle">{{ item.title }}</div>
            <div :class="commonCss.itemStatus" :style="getStatusStyle(item.status)">
              <el-icon style="font-size: 24px"
                ><Clock v-if="item.status === '未开始'" /><RefreshLeft
                  v-else-if="item.status === '进行中'" /><CircleCheck
                  v-else-if="item.status === '已报名'" /><RemoveFilled
                  v-else-if="item.status === '已结束'" /></el-icon
              >{{ item.status }}
            </div>
          </div>

          <!-- 活动类型标签 -->
          <el-tag :style="getTagStyle(item.type)" class="type-tag">
            {{ item.type }}
          </el-tag>

          <!-- 活动情况 -->
          <div class="details">
            <!-- 活动时间 -->
            <div class="icon-text">
              <el-icon style="font-size: 20px; color: red"><Calendar /></el-icon>活动时间：{{
                item.date + ' ' + item.time
              }}
            </div>
            <!-- 活动地点 -->
            <div class="icon-text">
              <el-icon style="font-size: 20px; color: red"><LocationFilled /></el-icon>活动地点：{{
                item.location
              }}
            </div>
            <!-- 组织方 -->
            <div class="icon-text">
              <el-icon style="font-size: 20px; color: red"><User /></el-icon>
              组织方： {{ item.organizer }}
            </div>
            <!-- 联系人 -->
            <div class="icon-text" v-if="item.status === '未开始'">
              <el-icon style="font-size: 20px; color: red"><Building /></el-icon>
              联系人： {{ item.contact }}
            </div>
            <!-- 活动时长 -->
            <div class="icon-text" v-if="item.status === '进行中'">
              <el-icon style="font-size: 20px; color: red"><Calendar /></el-icon> 服务时长：{{
                item.activityDuration
              }}
            </div>
            <!-- 报名时间 -->
            <div class="icon-text" v-if="item.status === '已报名'">
              <el-icon style="font-size: 20px; color: red"><Calendar /></el-icon>报名时间：{{
                item.registrationTime
              }}
            </div>
          </div>

          <!-- 活动描述 -->
          <div style="line-height: 1.5">{{ item.content }}</div>

          <!-- 操作按钮 -->
          <div style="margin-top: 20px; display: flex; gap: 10px">
            <!--  立即报名 -->
            <el-button color="red" v-if="item.status === '未开始' || item.status === '进行中'">
              立即报名
            </el-button>
            <!-- 取消报名 -->
            <el-button color="red" v-if="item.status === '已报名'"> 取消报名 </el-button>
            <!-- 查看详情 -->
            <el-button style="color: blue"> 查看详情 </el-button>
            <!-- 活动签到 -->
            <el-button style="color: blue" v-if="item.status === '进行中'"> 活动签到 </el-button>
            <!-- 下载竞赛资料 -->
            <el-button style="color: red" v-if="item.status === '已报名'"> 下载竞赛资料 </el-button>
            <!-- 查看活动总结 -->
            <el-button style="color: red" v-if="item.status === '已结束'"> 查看活动总结 </el-button>
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
import { useActivityStore } from '@/stores/activity'
import { Calendar } from '@element-plus/icons-vue'
import { ref } from 'vue'

const activityStore = useActivityStore()

// 筛选数据
const filterType = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const pageSize = ref(1)
const total = ref(10)

// 搜索按钮
const handleSearch = () => {
  // 这里可以对接接口实现筛选查询
  console.log('筛选条件：', filterType.value, filterStatus.value)
}

// 根据状态返回对应的样式
const getStatusStyle = (status: '未开始' | '进行中' | '已报名' | '已结束'): string => {
  switch (status) {
    case '未开始':
      return 'color: blue;'
    case '进行中':
      return 'color: orange;'
    case '已报名':
      return 'color: green;'
    case '已结束':
      return 'color: gray;'
    default:
      return ''
  }
}

// 根据标签返回对应的标签样式
const getTagStyle = (type: '理论学习' | '志愿服务' | '党建竞赛' | '实践活动') => {
  const styles: Record<string, string> = {
    理论学习: 'background-color: red;',
    志愿服务: 'background-color: green;',
    党建竞赛: 'background-color: orange;',
    实践活动: 'background-color: blue;',
  }
  return styles[type] || ''
}

// 重置筛选条件
const handleReset = () => {
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

/* 全部活动按钮 */
.all-activity-btn,
.my-activity-btn {
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

/* 每一项活动 */
.activity-item {
  @include item;
}
/* 活动内容 */
.activity-content {
  flex: 1;
  padding: 20px;
}
/* 活动头部 */
.header {
  @include item-header;
}

/* 图标文本 */
.icon-text {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 活动类型标签 */
.type-tag {
  color: white;
  font-size: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
}

/* 活动详情 */
.details {
  @include item-details;
  gap: 40px;
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
