import { defineStore } from 'pinia'
import { reactive } from 'vue'

// 荣誉数据接口
export interface HonorList {
  id: number
  name: string
  type: 'party' | 'study' | 'comprehensive' | 'practice'
  status: 'pending' | 'approved' | 'rejected'
  level: 'school' | 'college' | 'province' | 'national'
  date: string // 获得时间
  reviewer: string // 审核人
  reviewTime: string // 审核时间
  description: string // 荣誉描述
  rejectReason?: string // 驳回原因
  attachmentUrl?: string // 附件链接
  actions?: string[] // 可执行操作
}

const MOCK_HONOR_LIST: HonorList[] = [
  {
    id: 1,
    name: '校级优秀党员',
    type: 'party',
    status: 'approved',
    level: 'school',
    date: '2024-10-15',
    reviewer: '张老师',
    reviewTime: '2024-10-15 09:23',
    description:
      '2024年度校级优秀党员荣誉，经学院推荐、学校党委审核，符合校级优秀党员评选条件，授予校级优秀党员称号。',
    attachmentUrl: '#',
    actions: [],
  },
  {
    id: 2,
    name: '国家奖学金',
    type: 'study',
    status: 'approved',
    level: 'national',
    date: '2024-09-01',
    reviewer: '李老师',
    reviewTime: '2024-09-05 14:10',
    description:
      '2023-2024学年国家奖学金，综合成绩专业排名前1%，无违纪违规记录，符合国家奖学金评选标准。',
    attachmentUrl: '#',
    actions: [],
  },
  {
    id: 3,
    name: '校级三好学生',
    type: 'comprehensive',
    status: 'pending',
    level: 'school',
    date: '2024-10-20',
    reviewer: '王老师',
    reviewTime: '',
    description:
      '申报2024年度校级三好学生荣誉，综合测评成绩优异，积极参与学校各项活动，符合三好学生申报条件。',
    attachmentUrl: '#',
    actions: [],
  },
  {
    id: 4,
    name: '优秀志愿者',
    type: 'practice',
    status: 'rejected',
    level: 'college',
    date: '2024-10-18',
    reviewer: '赵老师',
    reviewTime: '2024-10-19 11:30',
    description:
      '申报院级优秀志愿者荣誉，参与志愿服务时长未达到申报要求（需满80小时，实际申报65小时），审核未通过。',
    rejectReason: '志愿服务时长未达到申报标准，补充相关证明材料后可重新申报。',
    attachmentUrl: '#',
    actions: [],
  },
]

export const useHonorStore = defineStore('honor', () => {
  const honorList = reactive<HonorList[]>([...MOCK_HONOR_LIST])

  return {
    honorList,
  }
})
