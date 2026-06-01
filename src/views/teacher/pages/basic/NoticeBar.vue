<template>
  <div class="notice-bar">
    <!-- 通知栏头部 -->
    <div class="title-bar">
      <div class="title">通知栏</div>
      <el-button class="more-btn" @click="router.push({ name: 'NotificationCenter' })" link
        >更多>></el-button
      >
    </div>
    <!-- 通知列表 -->
    <div class="notice-list">
      <div class="notice-item" v-for="item in noticeList" :key="item.id">
        <div class="notice-title">{{ item.title }}</div>
        <div class="notice-meta">
          <div>发布时间：{{ item.time }}</div>
        </div>
        <div class="notice-desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useNoticeStore } from '@/stores/notice'

const router = useRouter()
const noticeStore = useNoticeStore()

// 只展示前3条通知
const noticeList = noticeStore.noticeList.slice(0, 3)
</script>

<script lang="ts">
export default {}
</script>

<style scoped>
.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-bottom: 20px;
  padding: 15px 30px;
  border-radius: 8px;
  background-image: linear-gradient(to right, red, white);
}

.title {
  color: white;
  font-size: 20px;
}

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

.notice-list {
  height: 420px;
  overflow: auto;
  padding: 0 20px;
}

.notice-item {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
}

.notice-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.notice-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.notice-meta {
  color: gray;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
}
</style>
