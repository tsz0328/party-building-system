<template>
  <div class="bar-chart-container" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, defineProps } from 'vue'
import * as echarts from 'echarts'

type ChartSeriesItem = {
  name: string;
  values: number[];
};

// 定义接收的 props
const props = defineProps({
  xData: {
    type: Array as () => string[], // TS类型断言，保留编译时提示
    required: true,
  },
  series: {
    type: Array as () => { name: string; values: number[] }[], // TS类型断言
    required: true,
    // 自定义运行时校验器，确保每一项结构正确
    validator: (val: unknown) => {
      if (!Array.isArray(val)) return false;
      return val.every((item: unknown) =>
        !!item && typeof (item as ChartSeriesItem).name === 'string' && Array.isArray((item as ChartSeriesItem).values)
      );
    },
  },
  colorPool: {
    type: Array as () => string[],
    required: true,
  },
});

// 图表容器的引用
const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null

// 自定义 tooltip 项类型，避免使用 any
type TooltipParamItem = {
  name?: string
  seriesName?: string
  value?: number | string
}

// 计算Y轴最大值
const getYMax = (series: { name: string; values: number[] }[]) => {
  if (!series || series.length === 0) return 10; // 兜底series为空
  const allValues = series.flatMap((item) => item?.values || []); // 防止item.values为undefined
  if (allValues.length === 0) return 10; // 显式判空flatMap后的数组
  const maxValue = Math.max(...allValues);
  return Math.max(Math.ceil(maxValue * 1.1), 10);
};

// 初始化图表
const initChart = () => {
  if (!props.xData || !props.series || !props.colorPool) return;
  if (!chartRef.value) return
  if (chartInstance) chartInstance.dispose()
  chartInstance = echarts.init(chartRef.value as HTMLDivElement);

  const yMax = getYMax(props.series)
  const series = props.series.map((item, index) => ({
    name: item.name,
    type: 'bar' as const,
    data: item.values,
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
      color: props.colorPool[index % props.colorPool.length],
    },
    barWidth: `${100 / (props.series.length + 1)}%`,
  }))

  const option: echarts.EChartsOption = {
    color: props.colorPool,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        if (!params || !Array.isArray(params) || params.length === 0) return '';
        const arr = params as unknown as TooltipParamItem[]
        const month = arr[0]?.name ?? ''
        let content = `${month}<br/>`
        arr.forEach((item) => {
          content += `${item?.seriesName ?? '未知'}：${item?.value ?? 0}<br/>`
        })
        return content
      },
    },
    legend: { data: props.series.map((item) => item.name), top: '0%' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: props.xData,
      axisLine: { lineStyle: { color: '#ccc' } },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: yMax,
      interval: yMax / 5,
      axisLine: { lineStyle: { color: '#ccc' } },
      splitLine: { lineStyle: { color: '#eee' } },
      axisLabel: { fontSize: 16 },
    },
    series,
  }
  chartInstance.setOption(option, true)
}

// 窗口自适应
const resizeChart = () => chartInstance?.resize()
// 生命周期
onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  chartInstance?.dispose()
  window.removeEventListener('resize', resizeChart)
  chartInstance = null
})

// 监听数据变化，重新渲染
watch([() => props.xData, () => props.series], initChart, { deep: true })
</script>
<script lang="ts">
export default {}
</script>

<style scoped>
.bar-chart-container {
  height: 400px;
}
</style>
