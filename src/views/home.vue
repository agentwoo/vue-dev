<script setup lang="ts">
import { useStore } from "@/store/index"
import { Delete } from '@element-plus/icons-vue'
const stores = useStore()
</script>
 
<template>
    <h1>{{ stores.name }} ♥ 欢迎来到 vite + vue3 + TS + vue-router + pinia</h1>
    <el-button type="primary">Primary</el-button>
    <el-button type="danger" :icon="Delete" circle />
</template>