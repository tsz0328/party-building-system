<template>
  <div class="data-overview">
    <!-- 标题栏 -->
    <div class="title-bar">
      <div class="title">数据概览</div>
      <el-button link class="more-btn" @click="router.push({ name: 'DataCenter' })"
        >更多>></el-button
      >
    </div>

    <!-- 数据卡片列表 -->
    <div class="data-card-list">
      <!-- 数据卡片 -->
      <div class="data-card" v-for="(item, index) in dataList" :key="index">
        <img :src="item.icon" alt="icon" class="data-icon" />
        <div class="data-value">{{ item.value }}</div>
        <div class="data-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/data'

const router = useRouter()
const dataStore = useDataStore()

const dataList = dataStore.dataList.slice(0, 4)
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

/* 数据卡片列表 */
.data-card-list {
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 40px 20px;
  background-color: #f1f1f1;
}

/* 数据卡片 */
.data-card {
  width: 20%;
  height: 150px;
  border-top: 8px solid red;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: white;
}

/* 卡片图标 */
.data-icon {
  width: 15%;
}

/* 数据值 */
.data-value {
  font-size: 28px;
  font-weight: bold;
  color: red;
}

/* 数据标签 */
.data-label {
  font-size: 16px;
}
</style>
