<template>
  <div class="growth-record">
    <div class="title">个人成长档案</div>
    <el-timeline class="record">
      <el-timeline-item
        v-for="(item, index) in growthArchiveStore.growthArchive"
        :key="index"
        :color="getColor(item.status)"
        center
        :style="{ color: getColor(item.status) }"
      >
        <template #dot>
          <div
            class="circle"
            :style="{
              backgroundColor: getColor(item.status),
            }"
          >
            {{ index + 1 }}
          </div>
        </template>
        <div class="content" :style="{ backgroundColor: getColor(item.status) }">
          <div class="growth-archive-title">
            {{ item.title }}
          </div>
          <div class="growth-archive-desc">
            {{ item.desc }}
          </div>
          <div class="growth-archive-status">
            {{ item.status }}
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts" setup>
import { useGrowthArchiveStore } from '@/stores/growth-archive'

const growthArchiveStore = useGrowthArchiveStore()

const getColor = (status: string): string => {
  switch (status) {
    case '已完成':
      return 'crimson'
    case '进行中':
      return 'red'
    case '未完成':
      return 'pink'
    default:
      return 'transparent'
  }
}
</script>

<script lang="ts">
export default {}
</script>

<style scoped>
.title {
  height: 30px;
  font-size: 20px;
  color: white;
  margin-bottom: 20px;
  padding: 15px 30px;
  border-radius: 8px;
  background-image: linear-gradient(to right, red, white);
}

.record {
  height: 420px;
  overflow: auto;
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.content {
  padding: 10px;
  border-radius: 8px;
  color: white;
}

/* 修改每节小标题字体 */
:deep(.el-timeline .activity-title) {
  font-size: 16px;
}
/* 线条对齐数字圆心 */
:deep(.el-timeline-item.is-start .el-timeline-item__tail) {
  left: 0px;
}
/* 内容完全展示出来 */
:deep(.el-timeline-item__wrapper) {
  box-sizing: content-box;
  position: relative;
  top: 0px;
}
:deep(.el-timeline-item__tail) {
  border-left: 2px solid;
  height: 100%;
  position: absolute;
}
/* 内容两边留间距 */
.el-timeline.is-start {
  padding-left: 40px;
  padding-right: 20px;
}
</style>
