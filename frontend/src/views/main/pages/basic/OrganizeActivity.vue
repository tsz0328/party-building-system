<template>
  <div class="activity">
    <!-- 标题栏 -->
    <div class="title-bar">
      <span class="title">组织活动</span>
      <el-button class="more-btn" link @click="router.push({ name: 'OrganizeActivityCenter' })"
        >更多>></el-button
      >
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <!-- 活动类型筛选 -->
      <el-form-item label="活动类型：">
        <el-select v-model="activityType" placeholder="请选择活动类型" class="filter-item">
          <el-option label="理论学习" value="theory"></el-option>
          <el-option label="实践活动" value="practice"></el-option>
          <el-option label="志愿服务" value="volunteer"></el-option>
          <el-option label="专题讲座" value="lecture"></el-option>
        </el-select>
      </el-form-item>

      <!-- 活动状态筛选 -->
      <el-form-item label="活动状态：">
        <el-select v-model="activityStatus" placeholder="请选择活动状态" class="filter-item">
          <el-option label="未开始" value="not-started"></el-option>
          <el-option label="进行中" value="in-progress"></el-option>
          <el-option label="已结束" value="ended"></el-option>
        </el-select>
      </el-form-item>

      <!-- 关键词搜索 -->
      <el-form-item label="关键词：" class="input-item">
        <el-input v-model="keyword" placeholder="请输入活动名称/主题" />
      </el-form-item>

      <!-- 搜索按钮 -->
      <el-button class="search-btn" icon="Search" color="red"> 搜索 </el-button>
    </div>

    <!-- 活动列表 -->
    <div class="activity-list">
      <!-- 活动卡片 -->
      <div
        class="activity-card"
        v-for="item in activityStore.activityList.slice(0, 3)"
        :key="item.id"
      >
        <!-- 活动图片 -->
        <div class="activity-img">
          <img :src="item.imgUrl" alt="活动图片" />
        </div>
        <!-- 活动信息部分 -->
        <div class="activity-info">
          <!-- 活动标题 -->
          <div class="activity-title">{{ item.title }}</div>

          <!-- 活动元信息 -->
          <div class="activity-meta">
            <div>
              <el-icon style="color: red"><Calendar /></el-icon> {{ item.date }}
            </div>
            <div>
              <el-icon style="color: red"><Timer /></el-icon>{{ item.time }}
            </div>
            <div>
              <el-icon style="color: red"><Place /></el-icon> {{ item.location }}
            </div>
            <div>
              <el-icon style="color: red"><PriceTag /></el-icon> {{ item.type }}
            </div>
          </div>

          <!-- 活动描述 -->
          <div class="activity-desc">{{ item.content }}</div>

          <!-- 活动操作按钮 -->
          <div class="btn-group">
            <el-button class="detail-btn">查看详情</el-button>
            <el-button v-if="item.status === '未开始'" class="register-btn" color="red"> 立即报名 </el-button>
            <el-button v-else-if="item.status === '进行中'" class="register-btn" color="red" disabled> 进行中 </el-button>
            <el-button v-else class="register-btn" color="red" disabled> 已结束 </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useActivityStore } from '@/stores/activity'

const router = useRouter()
const activityStore = useActivityStore()

// 筛选条件
const activityType = ref('')
const activityStatus = ref('')
const keyword = ref('')
</script>
<script lang="ts">
export default {}
</script>

<style scoped>
/* 标题栏 */
.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 15px 30px;
  border-radius: 8px;
  background-image: linear-gradient(to right, red, white);
}

/* 标题 */
.title {
  color: white;
  font-size: 20px;
}

/* 更多按钮 */
.more-btn {
  font-size: 20px;
  color: red !important;
}
.more-btn:hover {
  color: lightcoral !important;
}
.more-btn:active {
  color: crimson !important;
}

/* 筛选栏 */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 20px;
  margin: 20px;
  background-color: #fcf4f5;
  border-radius: 8px;
}

/* 筛选项 */
.filter-item {
  width: 180px;
}

/* 搜索框 */
.input-item {
  flex: 1;
}

/* 活动列表 */
.activity-list {
  display: flex;
  justify-content: space-between;
  align-content: center;
  gap: 20px;
  padding: 20px;
}

/* 活动卡片 */
.activity-card {
  width: calc(33.333% - 15px);
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

/* 活动图片 */
.activity-img img {
  width: 100%;
  height: 250px;
}

/* 活动信息部分 */
.activity-info {
  padding: 20px;
}

/* 活动标题 */
.activity-title {
  font-weight: bold;
  color: red;
}

/* 活动元信息 */
.activity-meta {
  font-size: 12px;
  margin: 10px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* 活动描述 */
.activity-desc {
  font-size: 12px;
  margin-bottom: 10px;
  height: 80px;
  overflow: hidden;
}

/* 两个按钮 */
.btn-group {
  display: flex;
  justify-content: space-between;
}

/* 查看详情按钮 */
.detail-btn {
  color: red;
  padding: 10px;
}

/* 立即报名/已结束按钮 */
.register-btn {
  padding: 10px;
  font-size: 12px;
}

/* 标签前文字样式 */
:deep(.el-form-item__label) {
  font-size: 20px;
  color: black;
}
/* 移除表单默认底部间距 */
:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
