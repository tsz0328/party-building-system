import { Router } from 'express'
import authRoutes from './auth'
import userRoutes from './user'

// 后续模块在此注册
// import thoughtReportRoutes from './thoughtReport'
// import activityRoutes from './activity'
// import honorRoutes from './honor'
// import noticeRoutes from './notice'
// import dataRoutes from './data'
// import growthArchiveRoutes from './growthArchive'

const router = Router()

router.use('/api', authRoutes)
router.use('/user', userRoutes)

// router.use('/api/thought-report', thoughtReportRoutes)
// router.use('/api/activity', activityRoutes)
// router.use('/api/honor', honorRoutes)
// router.use('/api/notice', noticeRoutes)
// router.use('/api/data', dataRoutes)
// router.use('/api/growth-archive', growthArchiveRoutes)

export default router
