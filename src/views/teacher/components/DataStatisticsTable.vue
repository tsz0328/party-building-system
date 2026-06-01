<template>
  <el-table :data="tableData" :span-method="spanMethod" border>
    <el-table-column prop="category" label="数据类别" align="center" />
    <el-table-column prop="item" label="统计项" align="center" />
    <el-table-column prop="currentValue" label="当前值" align="center" />
    <el-table-column prop="lastValue" label="上周期值" align="center" />
    <el-table-column prop="changeRange" label="变化幅度" align="center" />
    <el-table-column prop="completionRate" label="完成率" align="center" />
  </el-table>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TableColumnCtx } from 'element-plus'

// 定义表格数据项类型
interface TableItem {
  category: string
  item: string
  currentValue: string
  lastValue: string
  changeRange: string
  completionRate?: string
}

// 定义表格合并方法参数类型
interface SpanMethodProps {
  row: TableItem
  column: TableColumnCtx<TableItem>
  rowIndex: number
  columnIndex: number
}

const tableData = ref<TableItem[]>([
  {
    category: '思想汇报',
    item: '提交数量',
    currentValue: '5篇',
    lastValue: '4篇',
    changeRange: '+1篇 (25%)',
    completionRate: '100%',
  },
  {
    category: '思想汇报',
    item: '按时提交率',
    currentValue: '92%',
    lastValue: '89%',
    changeRange: '+3%',
    completionRate: '-',
  },
  {
    category: '思想汇报',
    item: '平均得分',
    currentValue: '88分',
    lastValue: '86分',
    changeRange: '+2分',
    completionRate: '-',
  },
  {
    category: '思想汇报',
    item: '优秀次数',
    currentValue: '3次',
    lastValue: '2次',
    changeRange: '+1次',
    completionRate: '-',
  },
  {
    category: '党建活动',
    item: '参与次数',
    currentValue: '4次',
    lastValue: '2次',
    changeRange: '+2次 (100%)',
    completionRate: '80%',
  },
  {
    category: '党建活动',
    item: '志愿服务时长',
    currentValue: '8小时',
    lastValue: '5小时',
    changeRange: '+3小时 (60%)',
    completionRate: '67%',
  },
  {
    category: '党建活动',
    item: '党课出勤率',
    currentValue: '98%',
    lastValue: '99%',
    changeRange: '-1%',
    completionRate: '98%',
  },
  {
    category: '党建活动',
    item: '待参与活动',
    currentValue: '2次',
    lastValue: '1次',
    changeRange: '+1次',
    completionRate: '-',
  },
  {
    category: '积分荣誉',
    item: '累计积分',
    currentValue: '589分',
    lastValue: '544分',
    changeRange: '+45分 (8%)',
    completionRate: '-',
  },
  {
    category: '积分荣誉',
    item: '荣誉数量',
    currentValue: '1个',
    lastValue: '1个',
    changeRange: '0',
    completionRate: '-',
  },
  {
    category: '积分荣誉',
    item: '支部排名',
    currentValue: '12名',
    lastValue: '15名',
    changeRange: '+3名',
    completionRate: '-',
  },
])

// 存储每一行的合并配置：[rowspan, colspan]，0表示不渲染该单元格
const spanArr = ref<number[][]>([])
// 预处理数据，生成合并规则
const calculateSpanArr = () => {
  spanArr.value = []
  if (tableData.value.length === 0) return
  let sameCategoryCount = 1 // 记录当前category连续出现的次数
  let currentCategory: string | undefined = tableData.value[0]?.category // 初始当前类别，允许 undefined

  // 遍历所有行，统计同类别行数
  for (let i = 0; i < tableData.value.length; i++) {
    const current = tableData.value[i]!
    const next = tableData.value[i + 1]
    // 不是最后一行，且当前行和下一行category相同 → 计数+1
    if (next && current.category === next.category) {
      sameCategoryCount++
    } else {
      // 是最后一行/类别不同 → 生成当前类别的合并规则
      for (let j = 0; j < sameCategoryCount; j++) {
        if (j === 0) {
          // 同类别第一行：rowspan=总次数，colspan=1（正常显示并合并下方）
          spanArr.value.push([sameCategoryCount, 1])
        } else {
          // 同类别其他行：rowspan=0，colspan=1（隐藏，由第一行合并覆盖）
          spanArr.value.push([0, 1])
        }
      }
      // 重置计数和当前类别，处理下一个类别
      sameCategoryCount = 1
      currentCategory = next?.category
    }
  }
}

// 初始化执行合并规则计算
calculateSpanArr()
// 监听tableData变化，重新计算合并规则（适配外部数据更新）
watch(() => tableData.value, calculateSpanArr, { deep: true })

// 表格合并方法
const spanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
  // 只对第一列根据预处理的spanArr返回合并配置
  if (columnIndex === 0) {
    return spanArr.value[rowIndex] ?? [1, 1]
  }
  return [1, 1]
}
</script>
<script lang="ts">
export default {}
</script>

<style scoped></style>
