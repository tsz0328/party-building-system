import { defineStore } from 'pinia'
import { reactive } from 'vue'

// 通知接口
export interface NoticeList {
  id: string
  title: string
  time: string
  tag: 'honor' | 'activity' | 'report' | 'system' | 'notice'
  desc: string
  status: 'unread' | 'read'
  publishTime?: string
  trainTime?: string
}

const MOCK_NOTICE_LIST: NoticeList[] = [
  {
    id: '1',
    title: '【荣誉审核】你的"校级优秀党员"荣誉申报已通过',
    time: '2024-10-15 09:23',
    tag: 'honor',
    desc: '恭喜你！你于2024-10-10提交的"校级优秀党员"荣誉申报已通过学院审核，审核意见：材料齐全，符合申报条件。荣誉信息已录入系统，可在个人荣誉列表查看。',
    status: 'unread',
  },
  {
    id: '2',
    title: '【党建活动】关于开展"学习二十大精神"主题党日活动的通知',
    time: '2024-10-12 14:00',
    tag: 'activity',
    desc: '各学生党支部：定于2024-10-20 14:30在学校党建活动室开展"学习二十大精神"主题党日活动，请全体学生党员准时参加，携带学习笔记本。如有特殊情况无法参加，请提前向党支部书记请假。',
    status: 'read',
  },
  {
    id: '3',
    title: '【思想汇报】你的9月思想汇报已完成审核',
    time: '2024-10-08 16:45',
    tag: 'report',
    desc: '你的2024年9月思想汇报已审核完成，审核意见：汇报内容详实，思想认识到位，需继续保持理论学习的常态化。请根据审核意见完善后续汇报内容。',
    status: 'read',
  },
  {
    id: '4',
    title: '【系统通知】党建系统个人信息更新提醒',
    time: '2024-10-01 08:00',
    tag: 'system',
    desc: '温馨提醒：请于2024-10-15前完成党建系统个人信息的核对与更新，确保姓名、学号、学院等信息准确无误，以便后续荣誉申报、思想汇报等业务正常办理。',
    status: 'read',
  },
  {
    id: '5',
    title: '【重要公告】2024年度党员发展对象报名通知',
    time: '2024-09-28 11:20',
    tag: 'notice',
    desc: '2024年度党员发展对象报名工作现已启动，报名时间：2024-10-01至2024-10-10，报名条件及流程详见附件。请符合条件的同学及时提交报名材料，逾期不予受理。',
    status: 'read',
  },
]

export const useNoticeStore = defineStore('notice', () => {
  const noticeList = reactive<NoticeList[]>([...MOCK_NOTICE_LIST])

  return {
    noticeList,
  }
})
