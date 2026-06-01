<template>
  <div class="honor-wall">
    <!-- 个人荣誉墙头部 -->
    <div class="title-bar">
      <span class="title">个人荣誉墙</span>
      <el-button class="more-btn" @click="router.push({ name: 'HonorCenter' })" link
        >更多>></el-button
      >
    </div>

    <!-- 荣誉列表 -->
    <div class="honor-list">
      <!-- 荣誉卡片 -->
      <div class="honor-card" v-for="item in honorStore.honorList.slice(0, 3)" :key="item.id">
        <div class="trophy">
          <img src="@/assets/img/trophy.png" style="width: 60%" />
        </div>
        <el-text class="honor-card-name" truncated>{{ item.name }}</el-text>
        <div class="honor-time">获得时间：{{ item.date }}</div>
      </div>
      <!-- 添加荣誉卡片 -->
      <div class="add-honor-card">
        <el-button
          color="red"
          icon="Plus"
          style="font-size: 16px"
          @click="router.push({ name: 'AddHonor' })"
        >
          添加荣誉
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHonorStore } from '@/stores/honor'
import { useRouter } from 'vue-router'
const router = useRouter()
const honorStore = useHonorStore()
</script>
<script lang="ts">
export default {}
</script>

<style scoped>
/* 荣誉墙头部 */
.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 15px 30px;
  border-radius: 8px;
  background-image: linear-gradient(to right, red, white);
}

/* 荣誉墙标题 */
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

/* 荣誉列表 */
.honor-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 190px;
  padding: 0 20px;
}

/* 荣誉卡片 */
.honor-card {
  width: 20%;
  height: 60%;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.trophy {
  border-radius: 50%;
  background-color: red;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 荣誉名称 */
.honor-card-name {
  color: black;
  font-weight: bold;
  text-align: center;
}

/* 荣誉时间 */
.honor-time {
  font-size: 16px;
  color: gray;
}

/* 添加荣誉卡片 */
.add-honor-card {
  width: 20%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
