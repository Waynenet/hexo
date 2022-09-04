---
title: PicGo——图片上传+管理新体验
cover: >-
  https://cdn.jsdelivr.net/npm/wayne-img@latest/blog/imgs/PicGo.png
tags:
  - 软件
  - Windows
  - Mac
categories:
  - 日新月异
  - 软件分享
abbrlink: cfbb1853
date: 2021-09-13 21:25:53
updated: 2022-09-04 16:09:00
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

 ![PicGo](https://cdn.jsdelivr.net/npm/wayne-img@latest/blog/imgs/PicGo.png) 

## 新版变化
Molunerfinn/PicGo
https://github.com/Molunerfinn/PicGo/releases

 **PicGo 2.3.1-beta.6** 

20220904

**注意：这不是正式版，可以尝鲜新功能，但是并不会保证稳定性。**

 🆕 新增: 完整的i18n多语言支持  
 🆕 新增: 命令行调用 PicGo 上传图片支持以图片URL形式上传。   
 🆕 新增: sm.ms 图床新增 备用上传域名 选项。由于 sm.ms 原版 api 接口被 GFW 封禁，官方提供了 smms.app 这个域名作为备用的上传域名，所以遇到 sm.ms 无法上传的情况，可以尝试修改上传域名为 smms.app   
 🆕 更新: PicGo底层上传库从 request 迁移至 axios ，理论上对旧有插件是兼容的，如果插件遇到不兼容的情况请开发者参考 PicGo-Core 的 issue 进行适配    

 🛠 修复: macOS顶部窗口上传剪贴板图片bug    
 🛠 修复: 某些情况下腾讯云COS因为图片名有特殊字符导致上传失败的问题      

 ✅ 优化: 优化了上传出错的日志，现在输出的报错信息会更加清晰

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