---
title: Cordova插件开发
date: 2023-12-12
tags:
 - Cordova
categories:
 - 前端
---

<!-- # Cordova插件开发 -->

## 1. 安装plugman

```sh
npm install plugman -g
```



## 2. 新建插件

```sh
plugman create --name TestPlugin --plugin_id cordova-plugin-testplugin --plugin_version 1.0.0
```



## 3. 添加平台

```sh
cd TestPlugin
plugman platform add --platform_name android
```



## 4. 初始化package.json

```sh
npm init
```



## 5. 添加到ionic 项目中

* 查看安装了哪些插件

  ```sh
  ionic cordova plugin ls
  ```

* 添加插件

  ```sh
  ionic cordova plugin add G:\app\test\TestPlugin
  ```

* 删除插件

  ```sh
  ionic cordova plugin remove cordova-plugin-testplugin
  ```



## 6. Android Studio打开项目中platform下android工程，编辑TestPlugin.java



## 7. 编辑www文件夹下TestPlugin.js



## 8. 编辑plugin.xml



## 9.js调用插件


<br/>

**参考插件:**

[手机号码一键登录](https://github.com/lounai-chen/cordova-plugin-mobile-login)

[画中画](https://github.com/lounai-chen/cordova-plugin-floating-window)

[阿里云文件操作](https://github.com/lounai-chen/cordova-plugins-aliyunOSSupload)

