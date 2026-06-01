import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface GrowthArchiveType {
  desc: string
  title: string
  status: '已完成' | '进行中' | '未完成'
}

export const useGrowthArchiveStore = defineStore(
  'growth-archive',
  () => {
    const growthArchive = ref<GrowthArchiveType[]>([
      {
        title: '提交入党申请书',
        desc: '年满18周岁的中国公民，自愿向所在单位、社区、学校等党组织提交入党申请书，表明自己的入党愿望和决心。申请书应结合自身实际，真实表达自己的入党动机和对党的认识，以及个人思想、工作、学习情况。',
        status: '已完成',
      },
      {
        title: '确定入党积极分子',
        desc: '党组织收到入党申请书后，会派人同申请人谈话了解情况，经过党员推荐、群团组织推优等方式，由支部委员会研究确定入党积极分子，并上报上级党委备案，同时指定1-2名正式党员作为培养联系人。',
        status: '已完成',
      },
      {
        title: '确定发展对象',
        desc: '对经过一年以上培养教育和考察、基本具备党员条件的入党积极分子，在听取党小组、培养联系人、党员和群众意见的基础上，党支部委员会讨论同意并报上级党委备案后，可列为发展对象。发展对象需参加党组织的集中培训。',
        status: '进行中',
      },
      {
        title: '接收预备党员',
        desc: '党组织长期的培养教育和全面考察，经支部党员大会充分讨论、民主表决，并报请上级党组织严格审核批准，相关同志的入党/任职等事宜已正式获批。',
        status: '未完成',
      },
      {
        title: '成为正式党员',
        desc: '预备党员预备期为一年，自支部大会通过之日起算。党组织对其开展教育考察，预备党员需定期汇报思想工作。预备期满后，经本人申请、支部大会表决通过并报上级党委批准，即可转为正式党员。',
        status: '未完成',
      },
    ])

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

    const updateActivityStatus = (index: number, status: GrowthArchiveType['status']) => {
      if (index >= 0 && index < growthArchive.value.length) {
        const item = growthArchive.value[index]
        if (item) {
          item.status = status
        }
      }
    }

    const addGrowthArchive = (activity: GrowthArchiveType) => {
      growthArchive.value.push(activity)
    }

    const removeGrowthArchive = (index: number) => {
      if (index >= 0 && index < growthArchive.value.length) {
        growthArchive.value.splice(index, 1)
      }
    }

    return {
      growthArchive,
      getColor,
      updateActivityStatus,
      addGrowthArchive,
      removeGrowthArchive,
    }
  },
  {
    persist: {
      key: 'growth-archive-store',
      storage: localStorage,
      pick: ['growthArchive'],
    },
  },
)
