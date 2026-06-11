# 高校智慧党建管理系统（前端演示版）

> 一个面向高校党员师生的数字化党建平台前端实现，包含组织活动管理、思想汇报提交、数据统计看板等功能。

## 🎯 项目说明

本项目为**纯前端演示版本**，所有数据均通过 Mock.js 模拟，用于展示界面交互与业务逻辑流程。后端接口计划后续用 Spring Boot 实现。

## ✨ 已实现功能

- 学生/教师端登录演示（角色隔离）
- 思想汇报提交与列表查看
- 党建活动参与率、汇报提交率等 ECharts 统计图表
- Pinia 状态管理 + 持久化（模拟登录态）

## 🛠 技术栈

- Vue3 + TypeScript + Vite
- Pinia（状态管理 + persistedstate 插件）
- Vue-Router（路由权限模拟）
- Element Plus
- ECharts
- Mock.js（模拟 API 响应）

## 🚀 快速运行

```bash
git clone https://github.com/tsz0328/orghjnu_web-master.git
cd party-system-frontend
npm install
npm run dev
```

## 🌐 在线预览
https://party-building-system.pages.dev

## 📌 后续计划
- 接入真实后端（Spring Boot + MySQL）
- 添加 JWT 鉴权真实交互
- Docker 部署到云服务器
