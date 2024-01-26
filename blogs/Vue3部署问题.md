---
title: Vue3部署问题
date: 2023-11-30
tags:
 - Vue3
 - 部署
categories:
 - 前端
---

<!-- # Vue3部署问题 -->

## 1. 报资源路径404 Not Found错误

在vite.config.ts文件里面加该配置项

```js
export default defineConfig({
    base:'./'
})
```



## 2. 访问非本地部分图片报403错误

**referrer防盗链接策略：**有些网站的资源，比如图片不想被其他网站直接使用，就会通过referrer信息进行拦截。比如，我再使用豆瓣网站的图片时，用浏览器可以正常访问，但是在项目中访问却报403；

所以，可以通过在**index.html**文件中添加下面代码，修改**referrer**信息来绕开防盗链策略。

```html
<meta name="referrer" content="no-referrer">
```



## 3. 部署之后不显示页面内容，只显示空白，也没有报错

在router文件夹下的index.ts中，需要修改History选项

```js
import { createRouter, createWebHistory ,createWebHashHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  //这个是默认配置的
  // history:  createWebHistory(import.meta.env.BASE_URL),
  // 改为createWebHashHistory
  history:  createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/LayoutPage',
      name: 'LayoutPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LayoutPage.vue')
    }
  ]
})

export default router
```

我理解的是：**因为打开页面后没有匹配到任何一个路由，也就是设置在router里的路径没有任何一个被匹配到，包括其中设置的path: '/'这个路径，因此也就无法加载对应的组件，所以显示一片空白。**
**vue-router默认使用的是history模式，打包时需要改成hash模式即可**