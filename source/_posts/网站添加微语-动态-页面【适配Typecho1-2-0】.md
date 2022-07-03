---
title: 网站添加微语(动态)页面【适配Typecho1.2.0】
tags: Typecho
categories: 
    - 日新月异
    - 建站技巧
abbrlink: 6f072ef0
date: 2021-07-21 21:38:16
updated: 2022-05-22 14:45:00
---

&emsp;&emsp;旧版JOE主题有个微语(动态)页面，而新版却移除了，很是可惜。

　　要想实现微语(动态)页面，其实也比较容易。

　　只要把这个独立页面模板放到主题里，然后在创建独立页面时选择相应的模板就可以了！

## 第一步：上传文件

　　先把下载的文件解压，然后把动态页面  `dynamic.php`  放到主题根目录。

　　然后把  `Joe/assets/css`  内的 `joe.dynamic.min.css`  、  `joe.dynamic.min.scss ` 这两个文件放到 主题根目录 `/assets/css`  里面。

## 第二步：启用模板

　　进入后台，新建页面，标题、地址栏根据喜好自己填。

　　然后点击右侧自定义模板，选择  `动态`  ，接着直接发布就行了。

## 下载地址：

{% btns rounded grid5 %}
<a href='https://waynewu.lanzouq.com/iJg5orp2szc'>
  <i class='fas fa-download'></i>
  <b>微语（动态）</b>
  {% p blue, 旧版--蓝奏云下载 %}
</a>
<a href='https://waynewu.lanzouq.com/iseEathrxta'>
  <i class='fas fa-download'></i>
  <b>微语（动态）</b>
  {% p green, 新版20210902--蓝奏云下载 %}
</a>
<a href='https://waynewu.lanzouq.com/iRBR00597dej'>
  <i class='fas fa-download'></i>
  <b>微语（动态）</b>
  {% p red, 适配Typecho1.2.0--蓝奏云下载 %}
</a>
{% endbtns %}