# 党建管理系统

Vue 3 + Express + TypeScript 全栈党建管理系统。

## 目录结构

```
party-building-system/
├── frontend/     # 前端 Vue 3 + Vite + TypeScript
└── backend/      # 后端 Express + TypeScript
```

## 快速开始

### 前端

```bash
cd frontend
npm install
npm run dev       # 开发服务器启动在 http://localhost:5173
```

### 后端

```bash
cd backend
npm install
cp .env.example .env    # 配置环境变量
npm run dev             # 开发服务器启动在 http://localhost:3000
```

### 同时启动（推荐）

打开两个终端，分别在 `frontend/` 和 `backend/` 执行 `npm run dev`。

## 技术栈

| 端 | 技术 |
|---|---|
| 前端 | Vue 3.5 + Vite + TypeScript + Element Plus + ECharts + Pinia |
| 后端 | Node.js + Express + TypeScript + Sequelize |
| 数据库 | MySQL |
| 认证 | JWT |

## API 文档

后端 API 基础地址：`http://localhost:3000`

| 路径 | 方法 | 说明 |
|------|------|------|
| `/api/login` | POST | 登录 |
| `/user/info` | GET | 获取用户信息 |
| `/user/update` | PUT | 更新用户信息 |
| `/health` | GET | 健康检查 |
