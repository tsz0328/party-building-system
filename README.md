# 高校智慧党建管理系统

> 面向高校党员师生的数字化党建平台，支持教师端与学生端双角色管理。

## 目录结构

```
party-building-system/
├── frontend/    # 前端（Vue 3 + Vite + TypeScript）
├── backend/     # 后端（Node.js + Express + TypeScript）
└── README.md
```

---

## 技术栈

| 端 | 技术 |
|---|---|
| 前端 | Vue 3.5 + Vite + TypeScript + Element Plus + ECharts + Pinia + Axios |
| 后端 | Node.js + Express + TypeScript + Sequelize + MySQL + JWT |
| 部署 | 前端 Cloudflare Pages / 后端国内云服务器 |

---

## 快速开始

### 克隆项目

```bash
git clone https://github.com/tsz0328/orghjnu_web-master.git party-building-system
cd party-building-system
```

### 启动前端

```bash
cd frontend
npm install
npm run dev
# 访问 http://localhost:5173
```

### 启动后端

```bash
cd backend
cp .env.example .env   # 填写数据库配置
npm install
npm run dev
# 访问 http://localhost:3000/health 检查服务状态
```

---

## 功能模块

| 模块 | 说明 |
|---|---|
| 登录认证 | 教师/学生双角色，JWT Token 鉴权 |
| 个人中心 | 个人信息查看与编辑 |
| 思想汇报 | 季度/月度/专题汇报提交与审核 |
| 党建活动 | 活动发布、报名、管理 |
| 荣誉管理 | 荣誉申报、审核、展示 |
| 通知中心 | 系统通知、已读/未读管理 |
| 数据中心 | ECharts 可视化统计看板 |
| 成长档案 | 入党流程阶段跟踪 |

---

## 已实现 API（后端）

| 路径 | 方法 | 说明 |
|---|---|---|
| `/api/login` | POST | 登录（Mock 数据） |
| `/user/info` | GET | 获取用户信息（Mock 数据） |
| `/health` | GET | 健康检查 |

> 后续接口开发中，详见 `backend/src/routes/`

---

## 在线预览

前端部署地址：https://party-building-system.pages.dev

---

## 开发说明

- 前端开发环境 `baseURL` 为空，通过 Vite 代理转发到 `localhost:3000`
- 生产环境 `baseURL` 配置在 `frontend/.env.production`
- 后端环境变量参考 `backend/.env.example`

---

## 后续计划

- [ ] 接入真实 MySQL 数据库（Sequelize Model）
- [ ] 完善思想汇报/党建活动/荣誉/通知/数据统计 API
- [ ] 后端部署（国内云服务器）
- [ ] Docker 容器化部署
