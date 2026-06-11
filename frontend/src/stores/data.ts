import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export interface DataItem {
  icon: string
  value: string
  label: string
}

interface ChartSeries {
  name: string
  values: number[]
}

export interface BarChartData {
  months: string[]
  series: ChartSeries[]
}

export interface LineChartData {
  quarters: string[]
  series: ChartSeries[]
}

export interface SummaryItem {
  key: string
  value: string
}

export const useDataStore = defineStore('data', () => {
  const colorPool = ref(['#ff6b6b', '#c81623', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'])

  const timeFilter = ref<string | null>('year')
  const dataTypeFilter = ref<string | null>('all')

  const barChartData = reactive<BarChartData>({
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    series: [
      { name: '2024年', values: [100, 140, 230, 100, 130, 90, 180, 200, 150, 120, 160, 210] },
      { name: '2025年', values: [120, 160, 250, 110, 150, 100, 200, 220, 170, 140, 180, 230] },
    ],
  })

  const lineChartData = reactive<LineChartData>({
    quarters: ['第一季度', '第二季度', '第三季度', '第四季度'],
    series: [
      { name: '2024年', values: [140, 110, 180, 150] },
      { name: '2025年', values: [160, 130, 200, 170] },
    ],
  })

  const dataList = reactive<DataItem[]>([
    {
      icon: new URL('@/assets/img/dataIcon/book.png', import.meta.url).href,
      value: '5',
      label: '已提交思想汇报',
    },
    {
      icon: new URL('@/assets/img/dataIcon/stars.png', import.meta.url).href,
      value: '4',
      label: '已参与党建活动',
    },
    {
      icon: new URL('@/assets/img/dataIcon/trophy.png', import.meta.url).href,
      value: '1',
      label: '已获得荣誉数量',
    },
    {
      icon: new URL('@/assets/img/dataIcon/calendar.png', import.meta.url).href,
      value: '2',
      label: '待参与党建活动',
    },
    {
      icon: new URL('@/assets/img/dataIcon/ranking.png', import.meta.url).href,
      value: '12名',
      label: '支部积分排名',
    },
    {
      icon: new URL('@/assets/img/dataIcon/study.png', import.meta.url).href,
      value: '32小时',
      label: '累计学习时长',
    },
    {
      icon: new URL('@/assets/img/dataIcon/rate.png', import.meta.url).href,
      value: '92%',
      label: '思想汇报提交率',
    },
    {
      icon: new URL('@/assets/img/dataIcon/star.png', import.meta.url).href,
      value: '88分',
      label: '思想汇报平均得分',
    },
    {
      icon: new URL('@/assets/img/dataIcon/check.png', import.meta.url).href,
      value: '3',
      label: '优秀思想汇报次数',
    },
    {
      icon: new URL('@/assets/img/dataIcon/funnel.png', import.meta.url).href,
      value: '8小时',
      label: '志愿服务时长',
    },
    {
      icon: new URL('@/assets/img/dataIcon/percent.png', import.meta.url).href,
      value: '98%',
      label: '党课出勤率',
    },
    {
      icon: new URL('@/assets/img/dataIcon/card.png', import.meta.url).href,
      value: '589',
      label: '累计党建积分',
    },
  ])

  const summaryAndSuggestions = reactive<SummaryItem[]>([
    {
      key: '总结评价',
      value:
        '数据显示，学生在思想汇报和党建活动方面表现积极，提交率和参与度较高，平均得分也较为理想。',
    },
    {
      key: '优势项',
      value: '思想汇报提交率达到92 %，平均得分88分，显示出学生对思想政治教育的重视。',
    },
    {
      key: '待改进项',
      value: '党课出勤率虽高但有下降趋势，需加强管理和激励措施，确保学生按时参加党课学习。',
    },
    {
      key: '下一步建议',
      value:
        '继续推广优秀思想汇报经验，鼓励更多学生参与党建活动，同时关注个别学生的参与情况，提供个性化指导和支持。',
    },
  ])

  return {
    colorPool,
    timeFilter,
    dataTypeFilter,
    barChartData,
    lineChartData,
    dataList,
    summaryAndSuggestions,
  }
})
