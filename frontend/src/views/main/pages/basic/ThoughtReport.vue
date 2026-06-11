<template>
  <div class="thought-report">
    <!-- 标题栏 -->
    <div class="title-bar">
      <span class="title">思想汇报</span>
      <el-button class="more-btn" link @click="router.push({ name: 'ThoughtReportCenter' })"
        >更多>></el-button
      >
    </div>

    <!-- 待办提醒 -->
    <div style="padding: 20px">
      <div class="reminder">
        <div class="reminder-title">
          <img src="@/assets/img/remind.png" style="width: 20px" />待办提醒
        </div>
        <ul class="reminder-list">
          <li>你有1篇2025年第3季度思想汇报需修改重提（截止时间：2025-09-20）；</li>
          <li>2025年第4季度思想汇报提交截止时间为2025-12-15，请提前准备。</li>
        </ul>
      </div>

      <!-- 我的思想汇报 -->
      <div class="report-table">
        <!-- 思想汇报头部 -->
        <div class="report-header">
          <div style="font-size: large">我的思想汇报</div>
          <el-button
            type="danger"
            style="border: none"
            color="red"
            @click="router.push({ name: 'AddThoughtReport' })"
          >
            新建思想汇报
          </el-button>
        </div>

        <!-- 思想汇报表 -->
        <el-table
          :data="reportList"
          style="width: 100%; color: black"
          :header-cell-style="{ background: '#FAFAFA' }"
          stripe
        >
          <el-table-column prop="period" label="汇报周期" />
          <el-table-column prop="submitTime" label="提交时间" />
          <el-table-column prop="status" label="审核状态">
            <template #default="scope">
              <el-tag
                :style="getStatusTagStyle(scope.row.status)"
                style="color: white; border: none; width: 80px; font-size: 14px"
              >
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="reviewer" label="审核人" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                style="color: white; width: 80px"
                color="red"
                @click="handleOperation(scope.row)"
              >
                {{ getOperationText(scope.row.status) }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useThoughtReportStore } from '@/stores/thought-report'
import { computed } from 'vue'

const router = useRouter()
const thoughtReportStore = useThoughtReportStore()

// 将 store 数据映射为组件需要的格式
const reportList = computed(() => {
  return thoughtReportStore.reportList.slice(0, 3).map((item) => {
    // 状态映射
    const statusMap: Record<string, string> = {
      草稿: '草稿',
      待审核: '待审核',
      已通过: '已通过',
      已驳回: '需修改',
    }

    return {
      id: item.id,
      period: item.title,
      submitTime: item.submitDate || item.saveDate || '未提交',
      status: statusMap[item.status] || item.status,
      reviewer: item.reviewer || '待分配',
    }
  })
})

// 自定义标签样式
const getStatusTagStyle = (status: string) => {
  const styles: Record<string, string> = {
    需修改: 'background-color: red',
    已通过: 'background-color: pink',
    草稿: 'background-color: orange',
    待审核: 'background-color: blue',
  }
  return styles[status] || ''
}

// 根据状态获取操作文本
const getOperationText = (status: string) => {
  switch (status) {
    case '需修改':
      return '查看/修改'
    case '已通过':
      return '查看'
    case '草稿':
      return '编辑/提交'
    case '待审核':
      return '查看'
    default:
      return '操作'
  }
}

// 模拟操作处理
const handleOperation = (row: { id: number; period: string; status: string }) => {
  console.log('操作：', row)
}
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

/* 待办提醒 */
.reminder {
  background-color: #fcf4f5;
  border-left: 8px solid red;
  padding: 10px 20px;
  border-radius: 8px;
}

/* 代办标题 */
.reminder-title {
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 500;
  margin-bottom: 8px;
  color: red;
}

/* 代办列表 */
.reminder-list {
  padding-left: 20px;
  font-size: 16px;
  color: black;
}

/* 代办表列 */
.reminder-list li {
  margin-bottom: 5px;
}

/* 思想汇报头部 */
.report-header {
  background-color: #fcf4f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 8px solid red;
  border-radius: 8px;
  margin: 20px 0;
  padding-left: 20px;
}

/* 使 Element Plus 表格表头文字为黑色，仅作用于组件内的 .report-table */
.report-table ::v-deep .el-table__header-wrapper th .cell {
  color: black !important;
}
</style>
