---
layout: post
title: "gnuplot使用简介"
description: "介绍gnuplot绘图的基本方法"
category: tech
tags: [gnuplot]
---
{% include JB/setup %}

[gnuplot](http://www.gnuplot.info/)是一个命令行驱动的科学绘图工具，可将数学函数或数值资料以平面图或立体图的形式画在不同种类终端机或绘图输出装置上。既支持命令行交互模式，也支持脚本。

<!--break-->

---

官网上有Windows系统的安装软件，自带一个命令行工具。Ubuntu环境下安装`sudo apt-get install gnuplot-x11`。

### 基本画图命令

`plot sin(x)`

### 根据文件内容画图

`plot '1.txt'`

### 改变点的类型

`plot '1.txt' with points pointtype 2`

### 用点线画图，指定点和线类型

`plot '1.txt' with linespoints linetype 1 pointtype 2`

### 简化关键字

`plot '1.txt' w lp lt 1 pt 2`

### 去掉线的名称指示

`unset key`

### 移动名称的位置

`set key top left`

### 图的名称

`set title 'my title'`

### 设置x轴名称

`set xlabel 'x info'`

### 设置y轴名称

`set ylabel 'y info'`

### 设置x轴显示范围

`set xranges [-1,1]`

### 设置x轴坐标刻度

`set xtics 1,1,10`

