import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 导入页面组件
import LoginPage from '@/views/Login/LoginPage.vue'
import TeacherLayout from '@/views/main/TeacherLayout.vue'
import TeacherContent from '@/views/main/TeacherContent.vue'
import EditProfile from '@/views/main/pages/more/EditProfile.vue'
import NotificationCenter from '@/views/main/pages/more/NotificationCenter.vue'
import HonorCenter from '@/views/main/pages/more/HonorCenter.vue'
import AddHonor from '@/views/main/pages/more/AddHonor.vue'
import ThoughtReportCenter from '@/views/main/pages/more/ThoughtReportCenter.vue'
import AddThoughtReport from '@/views/main/pages/more/AddThoughtReport.vue'
import OrganizeActivityCenter from '@/views/main/pages/more/OrganizeActivityCenter.vue'
import DataCenter from '@/views/main/pages/more/DataCenter.vue'

// 定义路由规则（使用 RouteRecordRaw 类型约束）
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      title: '登录',
      hidden: true, // 不需要在菜单显示
    },
  },
  {
    // 教师端主页
    path: '/',
    name: 'TeacherLayout',
    component: TeacherLayout,
    children: [
      {
        // 教师主页默认子路由
        path: '',
        name: 'TeacherContent',
        component: TeacherContent,
      },
      {
        // 编辑个人信息
        path: 'EditProfile',
        name: 'EditProfile',
        component: EditProfile,
      },
      {
        // 通知中心
        path: 'NotificationCenter',
        name: 'NotificationCenter',
        component: NotificationCenter,
      },
      {
        // 荣誉中心
        path: 'HonorCenter',
        name: 'HonorCenter',
        component: HonorCenter,
      },
      {
        // 添加荣誉
        path: 'AddHonor',
        name: 'AddHonor',
        component: AddHonor,
      },
      {
        // 思想汇报中心
        path: 'ThoughtReportCenter',
        name: 'ThoughtReportCenter',
        component: ThoughtReportCenter,
      },
      {
        // 新建思想汇报
        path: 'AddThoughtReport',
        name: 'AddThoughtReport',
        component: AddThoughtReport,
      },
      {
        // 组织活动中心
        path: 'OrganizeActivityCenter',
        name: 'OrganizeActivityCenter',
        component: OrganizeActivityCenter,
      },
      {
        // 数据中心
        path: 'DataCenter',
        name: 'DataCenter',
        component: DataCenter,
      },
    ],
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
