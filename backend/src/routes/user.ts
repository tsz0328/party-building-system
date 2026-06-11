import { Router } from 'express'
import { getUserInfo, updateUserInfo } from '../controllers/userController'
import { authMiddleware } from '../middlewares/auth'

const router = Router()

// GET /user/info?account=xxx
router.get('/info', authMiddleware, getUserInfo)

// PUT /user/update
router.put('/update', authMiddleware, updateUserInfo)

export default router
