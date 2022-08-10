---
title: Office Tool Plus 9.0.3.7 下载安装管理Office
tags:
  - 软件
  - Windows
categories:
  - 日新月异
  - 软件分享
cover: https://cdn.jsdelivr.net/gh/Waynenet/blog-image-bed@main/blog/imgs/office1.png
abbrlink: f9828f56
date: 2021-09-22 20:17:12
---
Office Tool Plus（简称OTP）是由 Yerong 和蓝点网开发的一个强大且实用的 Office 部署工具。它可以快速自定义部署，在线下载安装 Office 产品的各个版本，也可以通过已有的离线安装文件来部署Office镜像，同时在安装过程中你可以自由选择安装哪些需要使用的组件， 在安装之后也可以单独来安装某个需要的组件。

 ![Office Tool Plus](https://cdn.jsdelivr.net/gh/Waynenet/blog-image-bed@main/blog/imgs/office1.png) 
  ![Office Tool Plus](https://cdn.jsdelivr.net/gh/Waynenet/blog-image-bed@main/blog/imgs/office2.png) 
## 工具介绍

Office Tool Plus 是目前颇为优秀的 Office 部署工具，工具基于 Office 部署工具制作，内置迅雷、OSPP 等多个工具，方便用户下载、安装、激活、管理 Office。无论是新手还是老用户都可以很方便地使用 Office Tool Plus 部署 Office，可以使用预设好的配置一键安装 Office，也可以完全自定义安装 Office。针对企业，还支持批量部署，可以下发制作好的 ISO 给员工一键部署，也可以使用静默参数进行安装。

支持下列产品：

Microsoft 365
Office 2016, 2019, 2021
Visio 2016, 2019, 2021 & Online Plan 2
Project 2016, 2019, 2021 & Online Desktop Client

## 主要功能

创建 Office 安装配置，支持导出到本地、从本地或网络位置导入。
下载 Office，支持所有通道的 Office，支持所有的 Office 语言。
安装 Office，支持对现有的 Office 进行修改，包括新增产品和应用程序，卸载产品或应用程序。
创建 Office ISO，支持默认安装配置、静默安装配置。
激活 Office，支持在线激活、电话激活、KMS 激活
支持 Office 授权管理，包括许可证管理，密钥管理以及 KMS 管理。
修改 Office 更新通道，支持在不重装 Office 的情况下升级/降级 Office.
移除 Office，在 Office 无法正常卸载的情况下强制移除 Office，支持 Office 2003 - Office 最新版本。
内置 Office 工具箱，包括重置设置，修复模板问题，修复激活问题等。
转换 Office 文档，基于 Office COM，稳定可靠。
自定义主题，打造你自己的专属 Office Tool Plus.
高级设置允许你使用更高级的功能，例如 Office 的内部通道。

## 新版变化

[Office-Tool](https://github.com/YerongAI/Office-Tool)

2022.08.10 v9.0.3.7
 ✅ 修复了创建 XML 配置时无法生成语言元素的问题

## 自动激活

点击命令按钮，打开命令框，按需复制下面的命令，粘贴后回车以执行操作。

如果你安装了 Microsoft 365，或者你只是单纯地在遵循教程的指示，请使用以下代码进行激活：
```html
/osppilbyid MondoVolume /osppsethst:kms.loli.beer /osppsetprt:1688 /osppact
```
 **上述代码可激活 Office, Visio, Project，能使用 Office 的所有功能。** 

如果你需要激活以下产品，请按照自己的需求选择：

{% folding green, Office, Visio, Project 2021 %}
```html
/osppilbyid ProPlus2021Volume /osppsethst:kms.loli.beer /osppsetprt:1688 /osppact
```
```html
/osppilbyid VisioPro2021Volume /osppsethst:kms.loli.beer /osppsetprt:1688 /osppact
```
```html
/osppilbyid ProjectPro2021Volume /osppsethst:kms.loli.beer /osppsetprt:1688 /osppact
```
{% endfolding %}

{% folding yellow, Office, Visio, Project 2019 %}
```html
/osppilbyid ProPlus2019Volume /osppsethst:kms.loli.beer /osppsetprt:1688 /osppact
```
```html
/osppilbyid VisioPro2019Volume /osppsethst:kms.loli.beer /osppsetprt:1688 /osppact
```
```html
/osppilbyid ProjectPro2019Volume /osppsethst:kms.loli.beer /osppsetprt:1688 /osppact
```
{% endfolding %}

## 下载地址

{% btns circle grid5 %}
<a href='https://waynewu.lanzoui.com/b016w55rc'>
  <i class='fas fa-download'></i>
  <b>普通版本</b>
  {% p blue, 蓝奏云|提取码：dfd0（需要安装 .NET 6.0 Desktop Runtime x86.） %}
</a>
<a href='https://waynewu.lanzoui.com/b016w55pa'>
  <i class='fas fa-download'></i>
  <b>包含框架 (推荐)</b>
  {% p red, 蓝奏云|提取码：7zd8（包含框架，可以直接双击 RunMe.bat 运行程序，不需要额外安装 .NET 6.0 Desktop Runtime.） %}
</a>
{% endbtns %}