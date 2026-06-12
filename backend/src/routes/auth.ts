import { Router } from 'express'
import { body } from 'express-validator'
import { login } from '../controllers/authController'

const router = Router()

// POST /api/login
router.post(
  '/login',
  [
    body('account')
      .notEmpty()
      .withMessage('账号不能为空')
      .isLength({ min: 3, max: 32 })
      .withMessage('账号长度需在 3-32 位之间'),
    body('password')
      .notEmpty()
      .withMessage('密码不能为空')
      .isLength({ min: 4, max: 32 })
      .withMessage('密码长度需在 4-32 位之间'),
  ],
  login
)

export default router
