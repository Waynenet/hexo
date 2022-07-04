---
title: PicGo——图片上传+管理新体验
cover: >-
  https://npm.elemecdn.com/wayne-img@latest/blog/imgs/PicGo.png
tags:
  - 软件
categories:
  - 日新月异
  - 建站技巧
abbrlink: cfbb1853
date: 2021-09-13 21:25:53
updated: 2022-07-03 15:44:03
---
PicGo: 一个用于快速上传图片并获取图片 URL 链接的工具

PicGo 本体支持如下图床：

- 七牛图床 v1.0
- 腾讯云 COS v4\v5 版本 v1.1 & v1.5.0
- 又拍云 v1.2.0
- GitHub v1.5.0
- SM.MS V2 v2.3.0-beta.0
- 阿里云 OSS v1.6.0
- Imgur v1.6.0

 ![PicGo](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/PicGo.png) 

## 新版变化
Molunerfinn/PicGo
https://github.com/Molunerfinn/PicGo/releases

 **PicGo 2.3.0** 

20210911

经过漫长的beta版本测试，终于可以迎来2.3.0正式版。感谢在beta版本测试期间积极使用并反馈issue提出建议的朋友们！

如果你是从2.2.x版本升级上来的，那么请重新切换一下默认图床配置，避免上传到默认的SM.MS图床中。确保配置文件里 picBed.uploader 是你当前使用的图床即可。

## 特色功能

- 支持拖拽图片上传
- 支持快捷键上传剪贴板里第一张图片
- Windows 和 macOS 支持右键图片文件通过菜单上传 (v2.1.0+)
- 上传图片后自动复制链接到剪贴板
- 支持自定义复制到剪贴板的链接格式
- 支持修改快捷键，默认快速上传快捷键：command+shift+p（macOS）| control+shift+p（Windows\Linux)
- 支持插件系统，已有插件支持 Gitee、青云等第三方图床
- 更多第三方插件以及使用了 PicGo 底层的应用可以在 Awesome-PicGo 找到。欢迎贡献！
- 支持通过发送 HTTP 请求调用 PicGo 上传（v2.2.0+)

## 软件下载

{% btns rounded grid5 %}
<a href='https://waynewu.lanzoui.com/b016repyd'>
  <i class='fas fa-download'></i>
  <b>PicGo</b>
  {% p blue, 蓝奏云|提取码：g8sr %}
</a>
{% endbtns %}