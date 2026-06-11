<template>
  <div :class="commonCss.commonContainer">
    <!-- 顶部导航 -->
    <div :class="commonCss.topTitleBar">
      <el-button :class="commonCss.backBtn" @click="$router.back()" icon="Back" link>
        返回
      </el-button>
      <div :class="commonCss.contentTitle">数据展示</div>
      <el-button class="all-activity-btn" color="white"> 全部活动 </el-button>
      <el-button class="my-activity-btn" color="white">我的报名</el-button>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-bar">
      <!-- 活动时间筛选 -->
      <el-select placeholder="全部活动时间" class="filter-item" v-model="timeFilter" clearable>
        <el-option label="2025年度" value="2025"></el-option>
        <el-option label="2024年度" value="2024"></el-option>
      </el-select>
      <!-- 活动数据筛选 -->
      <el-select placeholder="全部活动数据" class="filter-item" v-model="dataTypeFilter" clearable>
        <el-option label="党建活动相关" value="party-related"></el-option>
        <el-option label="积分荣誉相关" value="points-honors"></el-option>
      </el-select>
      <!-- 查询按钮 -->
      <el-button color="red"> 查询 </el-button>
      <!-- 重置按钮 -->
      <el-button class="reset-btn" color="white"> 导出数据 </el-button>
    </div>

    <!-- 核心数据总览 -->
    <div>
      <div class="title-bar">核心数据总览</div>
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

    <!-- 数据趋势统计图分析 -->
    <div>
      <div class="title-bar">数据趋势分析</div>
      <div class="subheading">党建积分月度趋势图</div>
      <div>
        <BarChart
          :x-data="barChartData.months"
          :series="barChartData.series"
          :color-pool="colorPool"
        />
      </div>
      <div class="subheading">思想汇报提交完成率季度趋势图</div>
      <div>
        <LineChart
          :x-data="lineChartData.quarters"
          :series="lineChartData.series"
          :color-pool="colorPool"
        />
      </div>
    </div>

    <!-- 详细数据统计 -->
    <div>
      <div class="title-bar">详细数据统计</div>
      <div style="padding: 20px"><DataStatisticsTable /></div>
    </div>

    <div>
      <div class="title-bar">数据的总结与建议</div>
      <div style="padding: 20px">
        <div v-for="item in summaryAndSuggestions" :key="item.key" class="summary-item">
          <h3>{{ item.key }}</h3>
          <div>{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BarChart from '@/views/main/components/BarChart.vue'
import LineChart from '@/views/main/components/LineChart.vue'
import DataStatisticsTable from '@/views/main/components/DataStatisticsTable.vue'
import commonCss from '@/assets/css/common.module.css'
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'

const dataStore = useDataStore()
const {
  colorPool,
  timeFilter,
  dataTypeFilter,
  barChartData,
  lineChartData,
  dataList,
  summaryAndSuggestions,
} = storeToRefs(dataStore)
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
  width: 40%;
}

.reset-btn {
  @include click-btn;
}

/* 标题栏 */
.title-bar {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 15px 30px;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  background-image: linear-gradient(to right, red, white);
}

/* 数据卡片列表 */
.data-card-list {
  display: flex;
  flex-wrap: wrap;
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

/* 小标题 */
.subheading {
  border-left: 8px solid red;
  border-radius: 8px;
  padding: 10px;
  margin: 20px 0;
  color: red;
  font-size: 20px;
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

/* 消除两个按钮默认间距 */
.el-button + .el-button {
  margin-left: 0px;
}
</style>
