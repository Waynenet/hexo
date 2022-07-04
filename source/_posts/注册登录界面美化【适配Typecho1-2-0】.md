---
title: typecho-login修改版 注册登录界面美化【适配Typecho1.2.0】
tags: 
  - Typecho
categories: 
    - 日新月异
    - 建站技巧
cover: https://npm.elemecdn.com/wayne-img@latest/blog/imgs/%E6%88%90%E6%95%88%E5%9B%BE1.jpg
abbrlink: dad754bb
date: 2021-06-26 00:07:00
updated: 2022-06-24 20:27:03
---

 　　`Typecho-Login`一个Typecho后台登录界面美化文件，由博客主Mark发表在自己的博客网站上。


　　原本文件介绍详情请请前往{% link Typecho-Login, https://www.quchao.net/Typecho-Login.html %}


　　虽然此界面美化的很好，但我还是发现了可以改进的地方。


　　我发现原本的背景图片上有他个人的博客网址，我们要用肯定要替换掉它，其实很简单，只要把style文件夹里面的bg.jpg替换即可，但当换掉之后，发现没有任何改变，哪里错了呢？其实原文下面的留言中有人给我们解决了，只要将style文件夹下的 `component.css` 第14行中的


```css
background-image: url('https://cdn.jsdelivr.net/gh/Mark-1215/CDN/uploads/logo/bg-admin.jpg');
```

　　改为

```css
background-image: url('./bg.jpg');
```

　　这里我已经帮各位修改好了，看看就好。


　　之后我发现，其登录的提示语都是英文，对于我这样的英文患者必须改成中文，于是便修改了login.php文件。想要英文的小伙伴请自行往回改。


　　后台登录好像没啥问题了，又一个问题发生了。如果别人注册我的网站，他们的登录界面还是原来的。


![注册页面](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/%E6%B3%A8%E5%86%8C%E9%A1%B5%E9%9D%A21.jpg) 


　　通过图片我们看到，注册的地址栏不是login，Mark只是修改了后台的登录界面，而注册界面没有任何修改，对于强迫症的我来说怎么能忍？


　　于是乎，通过地址栏提供的线索，找到 `register.php` 这个文件。我们打开它，发现它和我们的logon.php文件很像，只是多了邮箱而已。这就好办了，照着抄嘛，简单。


　　期间的过程就不多说了，请看最终效果图：

 ![成效图](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/%E6%88%90%E6%95%88%E5%9B%BE1.jpg) 



## <div style="color:#ff0000;">以下是我修改后的文件及使用方法。</div>




 **使用方法** ：

1.备份 `admin` 目录

2.压缩包内 `style` 文件夹上传到 `admin` 目录下

3.替换admin目录下的 `login.php` 和 `register.php` 文件

4.修改login.php第35行，把“Wayne的世界”改成自己网站的名称，同理修改register.php的第38行

5.清理缓存，开始新的体验。

{% btns rounded grid5 %}
<a href='https://waynewu.lanzouq.com/ican3054b44j'>
  <i class='fas fa-download'></i>
  <b>Typecho-Login</b>
  {% p blue, Wayne修改版--蓝奏云 %}
</a>
<a href='https://waynewu.lanzouq.com/i4bdq05988ta'>
  <i class='fas fa-download'></i>
  <b>Typecho-Login</b>
  {% p red, Wayne修改版适配Typecho1.2.0--蓝奏云 %}
</a>
{% endbtns %}