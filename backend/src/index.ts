import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import { errorHandler } from './middlewares/errorHandler'
import sequelize from './config/database'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// ── 中间件 ──────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── 路由 ─────────────────────────────────────────────
app.use(routes)

// ── 健康检查 ─────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── 错误处理 ─────────────────────────────────────────
app.use(errorHandler)

// ── 启动 ─────────────────────────────────────────────
async function bootstrap() {
  try {
    // 测试数据库连接（如果还没配置数据库可以注释掉这两行）
    // await sequelize.authenticate()
    // console.log('✅ 数据库连接成功')

    app.listen(PORT, () => {
      console.log(`🚀 服务已启动: http://localhost:${PORT}`)
      console.log(`📋 健康检查: http://localhost:${PORT}/health`)
    })
  } catch (error) {
    console.error('❌ 启动失败:', error)
    process.exit(1)
  }
}

bootstrap()

export default app
