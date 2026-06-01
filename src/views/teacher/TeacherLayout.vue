<template>
  <div>
    <!-- 顶部导航栏（全局不变） -->
    <NavBar />
    <!-- 路由出口：展示首页主要内容 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>

<style scoped></style>
