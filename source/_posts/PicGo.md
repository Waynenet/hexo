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
updated: 2022-08-15 21:09:53
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

 **PicGo 2.3.1-beta.5** 

20220815

**注意：这不是正式版，可以尝鲜新功能，但是并不会保证稳定性。**

 🆕 新增: PicGo-Server 对 OPTIONS 请求支持，以支持 CORS。感谢 @iamlongalong  
 🆕 新增: 日志文件大小控制。现在日志文件大小控制在 10 MB，如果下次写入大于 10MB 的时候，将会删掉重新创建日志文件。不再出现某些极端情况下恐怖的日志文件大小，点击「PicGo 设置」-「设置日志文件」即可设置   
 🆕 新增: 下载源为 腾讯云COS 的下载链接，国内用户可以通过 COS 版本的下载链接高速下载。链接在下面附上   
 🆕 新增: macOS顶部栏的窗口新增「打开主窗口」的按钮，可以不用再通过右键菜单打开了    

 🛠 修复: 插件配置保存后无法写入本地文件的问题    
 🛠 修复: beta版本检查更新逻辑问题    
 🛠 修复: 配置文件写入失败导致的配置文件丢失问题    

 ✅ 优化: macOS 顶部栏图标在macOS11及以上版本系统的样式

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