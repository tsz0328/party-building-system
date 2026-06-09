# 高校智慧党建管理系统（前端演示版）

> 一个面向高校党员师生的数字化党建平台前端实现，包含组织活动管理、思想汇报提交、数据统计看板等功能。

## 🎯 项目说明

本项目为**纯前端演示版本**，所有数据均通过 Mock.js 模拟，用于展示界面交互与业务逻辑流程。后端接口计划后续用 Spring Boot 实现。

## ✨ 已实现功能

- 学生/教师/管理员三端登录演示（角色隔离）
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
git clone 
cd party-system-frontend
npm install
npm run dev
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
