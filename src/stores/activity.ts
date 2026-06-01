import { defineStore } from 'pinia'
import { reactive } from 'vue'

export interface ActivityList {
  id: string
  title: string
  type: '理论学习' | '志愿服务' | '党建竞赛' | '实践活动'
  status: '未开始' | '进行中' | '已报名' | '已结束'
  date: string // 日期
  time: string // 时间
  location: string // 地点
  organizer: string // 组织方
  content: string // 活动内容
  participantCount?: number //报名名额
  participantNumber: number //参与人数
  contact?: string // 联系人
  activityDuration?: string // 活动时长
  registrationTime?: string // 报名时间
  imgUrl: string // 图片URL
}

const MOCK_ACTIVITY_LIST: ActivityList[] = [
  {
    id: '1',
    title: '学习二十大精神主题党日活动',
    type: '理论学习',
    status: '未开始',
    date: '2024-11-01',
    time: '14:30-16:30',
    imgUrl: new URL('@/assets/activity/1.png', import.meta.url).href,
    location: '学校党建活动室',
    organizer: '计算机学院学生第一党支部',
    participantCount: 120,
    participantNumber: 200,
    content:
      '本次主题党日活动聚焦党的二十大精神中关于青年成长的重要论述，通过专题讲座、分组讨论、心得分享等形式，引导学生党员深刻领会二十大精神的核心要义，将理论学习成果转化为实际行动。活动要求参会人员携带学习笔记本，提前预习二十大报告相关内容。',
    contact: '张老师 123-4567-8901',
  },
  {
    id: '2',
    title: '社区党建宣传志愿服务活动',
    type: '志愿服务',
    status: '进行中',
    date: '2024-10-15',
    time: '09:00-12:00',
    imgUrl: new URL('@/assets/activity/2.png', import.meta.url).href,
    location: 'XX 社区党群服务中心',
    organizer: '校团委党建服务部',
    participantCount: 85,
    participantNumber: 100,
    content:
      '本次活动以党建引领基层治理为核心，组织学生党员深入社区开展党建知识宣传。通过发放宣传资料、设置咨询台、开展互动问答等形式，提升社区居民对党建工作的认识和参与度。活动期间，志愿者们将协助社区工作人员进行环境卫生整治，营造良好的社区氛围。',
    activityDuration: '3小时',
  },
  {
    id: '3',
    title: '全校党建知识竞赛',
    type: '党建竞赛',
    status: '已报名',
    date: '2024-09-20',
    time: '13:00-15:00',
    imgUrl: new URL('@/assets/activity/3.png', import.meta.url).href,

    location: '学校大礼堂',
    organizer: '学校党委组织部',
    participantCount: 200,
    participantNumber: 200,
    content:
      '为深入贯彻落实党的二十大精神，提升学生党员的党建知识水平，学校党委组织部特举办全校党建知识竞赛。竞赛内容涵盖党的历史、理论、方针政策等方面，旨在激发学生党员的学习热情，增强党性修养。参赛选手需提前报名，并进行相关知识的复习准备。',
    registrationTime: '2024-09-01 至 2024-09-10',
  },
  {
    id: '4',
    title: '红色教育基地实践研学活动',
    type: '实践活动',
    status: '已结束',
    date: '2024-08-05',
    time: '08:00-18:00',
    imgUrl: new URL('@/assets/activity/3.png', import.meta.url).href,

    location: 'XX 红色教育基地',
    organizer: '文学院学生党支部',
    participantNumber: 150,
    content:
      '本次实践研学活动旨在通过参观红色教育基地，深入了解革命历史，感悟革命精神。活动安排了专题讲解、现场教学和心得交流等环节，帮助学生党员增强历史使命感和责任感。参与者需提前准备相关学习资料，并在活动结束后提交心得体会。',
  },
]

export const useActivityStore = defineStore('activity', () => {
  const activityList = reactive<ActivityList[]>([...MOCK_ACTIVITY_LIST])

  return {
    activityList,
  }
})
