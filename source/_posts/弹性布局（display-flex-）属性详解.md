---
title: '弹性布局（display:flex;）属性详解'
tags:
  - css
categories:
  - 日新月异
  - 建站技巧
abbrlink: 678d5c01
date: 2021-08-28 12:39:14
updated: 2022-07-05 12:39:14
cover:
description:
---

{% tip home %}
Flexbox 是 flexible box 的简称（注：意思是“灵活的盒子容器”），是 CSS3 引入的新的布局模式。它决定了元素如何在页面上排列，使它们能在不同的屏幕尺寸和设备下可预测地展现出来。
{% endtip %}

它之所以被称为 Flexbox ，是因为它能够扩展和收缩 flex 容器内的元素，以最大限度地填充可用空间。与以前布局方式（如 table 布局和浮动元素内嵌块元素）相比，Flexbox 是一个更强大的方式：

{% checkbox green checked, 在不同方向排列元素 %}
{% checkbox green checked, 重新排列元素的显示顺序 %}
{% checkbox green checked, 更改元素的对齐方式 %}
{% checkbox green checked, 动态地将元素装入容器 %}

# 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

![Flexbox](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex1.png) 

在 Flexbox 模型中，有三个核心概念：
- flex 项（注：也称 flex 子元素），需要布局的元素
- flex 容器，其包含 flex 项
- 排列方向（direction），这决定了 flex 项的布局方向

# 容器属性

![容器属性](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex2.png)

## flex-direction:

{% radio green, row（默认值）：主轴为水平方向，起点在左端。 %}
{% radio green, row-reverse：主轴为水平方向，起点在右端。 %}
{% radio green, column：主轴为垂直方向，起点在上沿。 %}
{% radio green, column-reverse：主轴为垂直方向，起点在下沿。 %}

![flex-direction](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex3.png)

## flex-wrap:

{% radio green, nowrap（默认）：不换行。 %}
{% radio green, wrap：换行，第一行在上方。 %}
{% radio green, wrap-reverse：换行，第一行在下方。 %}

## justify-content:

{% radio green, flex-start（默认值）：左对齐 %}
{% radio green, flex-end：右对齐 %}
{% radio green, center： 居中 %}
{% radio green, space-between：两端对齐，项目之间的间隔都相等。 %}
{% radio green, space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。 %}

![justify-content](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex4.gif)

## align-items:

{% radio green, flex-start：交叉轴的起点对齐。 %}
{% radio green, flex-end：交叉轴的终点对齐。 %}
{% radio green, center：交叉轴的中点对齐。 %}
{% radio green, baseline: 项目的第一行文字的基线对齐。 %}
{% radio green, stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。 %}

![align-items](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex5.gif)

## align-content:

定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用

{% radio green, flex-start：与交叉轴的起点对齐。 %}
{% radio green, flex-end：与交叉轴的终点对齐。 %}
{% radio green, center：与交叉轴的中点对齐。 %}
{% radio green, space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。 %}
{% radio green, space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。 %}
{% radio green, stretch（默认值）：轴线占满整个交叉轴。 %}

![align-content](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex6.png)

## 结合 `justify-content`和`align-items`，看看在 `flex-direction` 两个不同属性值的作用下，轴心有什么不同：

![flex-direction](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex7.gif)

# 项目属性

![项目属性](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex8.png)

## order属性

![order属性](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex9.png)

## flex-grow属性

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

如果所有项目的`flex-grow`属性都为`1`，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为`2`，其他项目都为`1`，则前者占据的剩余空间将比其他项多一倍。

![flex-grow属性](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex10.png)

## flex-shrink属性

`flex-shrink`属性定义了项目的缩小比例，默认为`1`，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![flex-shrink属性](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex11.jpg)

如果所有项目的`flex-shrink`属性都为`1`，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为`0`，其他项目都为`1`，则空间不足时，前者不缩小。

负值对该属性无效。

## align-self属性

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![align-self属性](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/flex12.png)

{% tip warning %}弹性布局默认不改变项目的宽度，但是它默认改变项目的高度。如果项目没有显式指定高度，就将占据容器的所有高度。{% endtip %}