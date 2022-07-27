---
title: CSS+DIV三种布局方式
tags:
  - css
categories:
  - 日新月异
  - 建站技巧
abbrlink: b7897821
date: 2021-09-11 10:45:00
updated: 2021-09-11 12:51:54
---
我们来说一下CSS的一个比较重要的用途：布局。表格可以起到布局页面的作用，比如布局表单，但实际工作表格的布局通常也仅仅是用来布局表单。绝大多数的模具工作是由CSS+DIV来完成的，因为表格布局复杂页面时需要频繁的嵌套，代码比较复杂、难以维护，而使用CSS+DIV布局，内容和表现可以分离，代码干净整洁、可读性好、便于维护，并且样式代码可以复用，提高了开发效率，同时分离后美工和网站开发人员也可以协同合作，进一步提高了开发效率和整体网站的质量。

## 一、 常规流式布局
元素按照自身的常规显示方式显示，有两个特点：
1.元素按照自身HTML元素定义的位置显示（怎么写的怎么显示）
2.元素按照自身的常规显示特性显示
比如块级元素垂直排列，行级元素水平排列。

## 二、 浮动（顺便讲解布局步骤）
具体代码：
左浮动 float:left;
右浮动 float:right;

我们知道编程一般都是有套路的，使用CSS+DIV布局也不例外，大体分为以下四步：
布局步骤：
一、画效果图
在纸上先画出我们想要的页面的具体显示的框架。比如我们想要把一个网页分成上中下三个部分。
二、使用DIV进行分割
拿本例来说我们网页整体分为上中下三部分，所以我们可以使用三个div来先大体分割一下该网页.
三、使用CSS来控制DIV布局
使用CSS样式来控制布局的具体宽、高，并使用显著的背景标注，在需要修改时可以清楚的看到该模块。
四、使用以上三步进行细分
在每一模块都要通过以上三步具体划分。

 **为什么使用DIV分割布局？** 
我们知道HTML中的每个元素都像一个盒子一样，每个盒子都能容纳其他元素，比如div元素、p元素、h4元素等都能容纳其他元素，那么为什么我们布局的时候要用div容纳其他元素,而不用p元素、h4元素或者其他元素呢？这是因为div元素是最干净的盒子它没有其他的属性，换句话说如果只写div标签而不加任何属性的话，它只是一个没有任何特性的容器，而其他元素比如p元素,它就有自己格外的属性，比如用两个p元素布局，它们之间有空行。如果用h4布局，放在h4里面的文字都被加大了显示了，像p元素、h4元素这些容器如果用来布局的话会影响效果，所以我们使用不加带任何特性的最干净的盒子—–DIV来布局。

示例代码：

```css
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Document</title>
    <style>
        *{
            margin:0px auto;
        }

        #all{
            text-align: center;
        }

        div.logo {
            width:1300px;
            height:60px;
            background-color: yellow;
        }

        div.copyright {
            width:1300px;
            height:60px;
            background-color: goldenrod;
        }

        div.middle {
            width:1300px;
            height: 500px;
        }

        div.menu {
            width:200px;
            height: 500px;
            background-color: #E4393C;
            /*菜单左浮动*/
            float:left;
        }

        div.main {
            width:1100px;
            height: 500px;
            background-color: #bad0ef;
            /*主题右浮动*/
            float:right;
            /*左浮动、右浮动都可以*/
            float:left;
        }
    </style>
</head>
<body>
    <div id="all">

        <div class="logo">
            logo
        </div>

        <div class="middle">
             <div class="menu">
                menu
             </div>

            <div class="main">
                网站的主体内容
            </div>
        </div>

        <div class="copyright">
            bottom
        </div>

    </div>
</body>
</html>
```

如果不使用浮动，则块级元素默认是垂直排列，而改为行级元素又无法调整宽高和边距，所以我们采用浮动，来使两个块级元素水平排列。


{callout color="#f0ad4e"}
多类症:不要过多的使用类选择器,这样会造成代码臃肿，可读性差,能使用其他选择器代替的就使用其他选择器
{/callout}

- 浮动的若干特性
- 1.框1向右移动
- 2.框1向左浮动
- 3.所有三个框向左浮动

 ![css1](https://cdn.jsdelivr.net/npm/wayne-img@latest/blog/imgs/css1.png) 
  ![css2](https://cdn.jsdelivr.net/npm/wayne-img@latest/blog/imgs/css2.png) 
   ![css3](https://cdn.jsdelivr.net/npm/wayne-img@latest/blog/imgs/css3.png) 

- 清除浮动

如上图3的“被卡住”的情况，或者我们想要前两个框向左浮动，不想要第三个浮动，可以在第三个框的DIV处加 clear:left; 属性。意思是清除向左浮动的特性，第三个元素直接换行显示。

- 使用浮动实现水平导航菜单
 示例代码：

```css
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Document</title>
    <style>
        * {
            margin:0px;
        }

        body {
            font: 12px/150% Arial, Verdana, "宋体";
        }

        /*水平导航菜单开始*/
        .horizontal-ul {
            list-style: none;
            margin: 0px;
            padding: 0px;
        }


        .horizontal-ul li {
            float: left;
        }

        .line {
            color: #ccc;
            padding: 0px 12px;
            /*background-color:green;*/
        }
        /*水平导航菜单结束*/

        a:link {
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .horizontal-ul li a {
            color: #666;
        }

        .horizontal-ul li span {
            color: #666;
        }

        div.horizontal-menu-div {
            width:1000px;
            height:auto;
            background-color:yellow;

        }
    </style>
</head>
<body>
    <div class="horizontal-menu-div">

    <ul class="horizontal-ul">
        <li><a href="">关于我们</a><span class="line">|</span></li>
        <li><a href="">联系我们</a><span class="line">|</span></li>
        <li><a href="">人才招聘</a><span class="line">|</span></li>
        <li><a href="">商家入驻</a><span class="line">|</span></li>
        <li><a href="">广告服务</a><span class="line">|</span></li>
        <li><a href="">手机京东</a><span class="line">|</span></li>
        <li><a href="">友情链接</a><span class="line">|</span></li>
        <li><a href="">销售联盟</a><span class="line">|</span></li>
        <li><a href="">京东社区</a><span class="line">|</span></li>
        <li><a href="">京东公益</a><span class="line">|</span></li>
        <li><a href="">English Site</a></li>
    </ul>


</div>
</body>
</html>
```

## 三、定位布局
 **1.静态定位** 
position:static;
默认值，不写position相当于写上position:static;以前没学定位的时候其实都是静态定位，元素在它原本的位置显示，即使加了top、left等也不起作用。

 **2.相对定位** 
相对定位是相对于自身的原始位置进行平移，如果设置position：relative；表示相对定位。
z-index:值越大越在上面
注意：z-index必须加在已经定位的元素上才起作用。

 **3.绝对定位** 
子容器相对于父容器的定位，如果没有父容器，则相对于body定位。
position:absolute;
示例代码：

```css
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Document</title>
    <style type="text/css">
        *{
            margin:0;
        }

        div.grandpa{
            width: 100%;
            height:100%;
            background-color: gray;
            position: absolute;
        }

        div.father{
            width:100px;
            height:100px;
            top:100px;
            left:100px;
            position: absolute;
            background-color: blue;
        }

        div.son{
            width:50px;
            height: 50px;
            right: 0px;
            bottom:0px;
            position: absolute;
            background-color: green;
        }
    </style>
</head>
<body>
    <div class="grandpa">
        <div class="father">
            <div class="son"></div>
        </div>
    </div>

</body>
</html>
```

 **4.fixed固定定位** 
也是相对定位，相对于窗口的
position:fixed;


<pre>
那么我们什么时候用相对定位，什么时候用绝对定位呢？
一般顶层容器我们使用相对定位，子容器使用绝对定位，这样的好处是父容器移动时，子容器能够跟着父容器移动，而不用再调整子容器的位置。
</pre>