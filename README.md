# create vue3+vite+ts dev environment

## create project 
- [example](https://blog.csdn.net/QingQingYang6/article/details/126501536)
```
pnpm create vite
project name => input project name
vue
ts
```

## 配置环境
```
pnpm install @types/node -D
```

- vite.config.js 配置路径别名@
```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
```

- tsconfig.json 在"complierOptions"中加入
```
"baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
```

## 找不到模块“../xx/xx.vue”或其相应的类型声明
- 在vite-env.d.ts文件添加
```
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
```

## 配置默认样式
```
pnpm install sass -D
```
- 删除src下style.css文件
- 在src下创建style文件夹并创建index.scss文件
```
* {
    margin: 0;
    padding: 0;
}

body,
html {
    height: 100%;
}
```

- main.ts
```
将`import './style.css'`换成 `import '@/style/index.scss'`
```

## 安装pinia
```
pnpm install pinia
```

- 在src文件下创建store文件夹、在store文件下创建index.ts文件
```
import { defineStore } from 'pinia'
export const useStore = defineStore('main', {
    state: () => ({
        name: 'hellowrold!'
    })
})
```

- 更改main.ts
```
import { createApp } from 'vue'
import '@/style/index.scss'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const store = createPinia()
app.use(store)

app.mount('#app')
```

- 创建views文件夹，在文件夹下创建home.vue
```
<script setup lang="ts">
import { useStore } from "@/store/index"
const stores = useStore()
</script>
 
<template>
    <h1>{{ stores.name }} ♥ 欢迎来到 vite + vue3 + TS + vue-router + pinia</h1>
</template>
```

## 安装vue-router路由
```
pnpm install vue-router@4
```

- 在src下创建router文件夹，在文件夹下创建index.ts文件
```
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/home.vue"),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```

- 在main.ts中添加
```
import router from '@/router/index'
app.use(router)
```
- 将以下代码替换掉App.vue
```
<script setup lang="ts">
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>

</style>
```

## 安装element-plus
```
pnpm install element-plus
```

### 按需引入,安装以下两款插件
```
pnpm install -D unplugin-vue-components unplugin-auto-import
```

- 在vite.config.ts中添加以下代码
```
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
```
### 完整引入
- main.ts
```
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus)
```

## 安装element-plus-icon
```
pnpm install @element-plus/icons-vue
```
- 注册所有图标，在main.ts中添加以下代码
```
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```

## 安装axios
```
pnpm install axios
```
- 在src下新建http文件夹,在文件夹下创建http.ts和index.ts文件

- http.ts
```
import axios from 'axios'

const http = axios.create({
    timeout: 2000
})

http.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})


http.interceptors.response.use(res => {
    return res.data
}, err => {
    return Promise.reject(err)
})

export default http
```
- index.ts
```
import http from './http'

export const getUser = () => http({ url: '/getUser', method: "get" })
```

## 开启network
- 在package.json中
```
将`"dev": "vite --host",`替换掉`"dev": "vite",`
```

