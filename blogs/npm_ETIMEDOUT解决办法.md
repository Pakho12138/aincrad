---
title: npm install报错ERR code ETIMEDOUT的解决办法
date: 2023-12-13
tags:
 - npm
categories:
 -  前端
---

<!-- # npm install报错ERR code ETIMEDOUT的解决办法 -->

将 **npm** 改为 **淘宝镜像**即可

1. 查看npm镜像设置

   ```shell
   npm config get registry
   ```

2. 将npm设置为淘宝镜像

   ```shell
   npm config set registry https://registry.npm.taobao.org
   ```

3. 再次查看npm镜像设置

   ```shell
   npm config get registry
   ```

4. 重新install

   ```shell
   npm install
   ```

   