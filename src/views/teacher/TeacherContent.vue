<template>
  <div class="home-container">
    <!-- 页面提示语 -->
    <div class="tips">
      祝贺你迎来政治生日！望你时刻以党员标准严格要求自己，坚守信仰、砥砺前行，在平凡岗位上书写不平凡的答卷！
    </div>

    <!-- 核心网格布局 -->
    <div class="grid-layout">
      <!-- 左侧：个人信息展示 -->
      <div class="grid-item left">
        <PersonalInfo />
      </div>

      <!-- 右上左：个人成长档案 -->
      <div class="grid-item top-left">
        <GrowthRecord />
      </div>

      <!-- 右上右：通知栏 -->
      <div class="grid-item top-right">
        <NoticeBar />
      </div>

      <!-- 底部：个人荣誉墙 -->
      <div class="grid-item bottom">
        <HonorWall />
      </div>
    </div>

    <!-- 思想汇报 -->
    <div class="grid-item" style="margin: 40px 20px">
      <ThoughtReport />
    </div>

    <!-- 组织活动 -->
    <div class="grid-item" style="margin: 40px 20px">
      <Activity />
    </div>

    <!-- 数据概览 -->
    <div class="grid-item" style="margin: 40px 20px">
      <DataOverview />
    </div>
  </div>
</template>

<script setup lang="ts">
import PersonalInfo from '@/views/teacher/pages/basic/PersonalInfo.vue'
import GrowthRecord from '@/views/teacher/pages/basic/GrowthRecord.vue'
import NoticeBar from '@/views/teacher/pages/basic/NoticeBar.vue'
import HonorWall from '@/views/teacher/pages/basic/HonorWall.vue'
import ThoughtReport from '@/views/teacher/pages/basic/ThoughtReport.vue'
import Activity from '@/views/teacher/pages/basic/OrganizeActivity.vue'
import DataOverview from '@/views/teacher/pages/basic/DataOverview.vue'
</script>

<style scoped>
.home-container {
  width: 100%;
}

.tips {
  color: red;
  background-color: #e6e6e6;
  text-align: center;
  padding: 20px 0;
}

.grid-layout {
  display: grid;
  grid-template-columns: 350px 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  margin: 20px;
}

.grid-item {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

/* 左侧区块：占2行 */
.left {
  grid-row: 1 / 3;
}

/* 右上左区块 */
.top-left {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

/* 右上右区块 */
.top-right {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}

/* 底部宽区块：占2列 */
.bottom {
  grid-column: 2 / 4;
  grid-row: 2 / 3;
}
</style>
