---
layout: post
title: "在github pages上用jekyll搭建的新博客"
description: "jekyll on github pages，新博客，用来记录生活和学习中的点点滴滴"
category: tech
tags: [jekyll]
---
{% include JB/setup %}

采用**git**+**github**+**jekyll**++**markdown**搭建的新博客。

<!--break-->

---

##1 在github pages上搭建博客

可以参考[Jekyll QuickStart](http://jekyllbootstrap.com/usage/jekyll-quick-start.html) ,下面只搬运过程。

1 在github上创建一个仓库，仓库名称必须为`USERNAME.github.io`或者`USERNAME.github.com`，其中`USERNAME`为github的账号名称。

2 安装Jekyll-Bootstrap    

```
$git clone https://github.com/plusjade/jekyll-bootstrap.git USERNAME.github.io
$cd  USERNAME.github.io
$git remote set-url origin git@github.com:USERNAME/USERNAME.github.io.git
$git push origin master
```

3 访问博客

等待半小时左右，访问`USERNAME.github.io`即可在线访问博客。也可以在本地`USERNAME.github.io`的根目录下，通过终端输入`jekyll serve`，然后访问`http://localhost:4000`即可。

##2 写新文章

1 输入以下命令可以自动生成符合Jekyll文件命名格式的.md新文件

    $ rake post title="Hello World"
    
2 发布文章

    $ git add .
    $ git commit -m "Add new content"
    $ git push origin master
    
##3 个性化自己的博客

[Jekyll](http://jekyllcn.com/)可以理解为一个模板解析工具，将包含文章内容的`.md`格式文本文件解析成`.html`格式文件。[Jekyll-BootStrap](http://jekyllbootstrap.com/)是一套使用了Jekyll的快速建站工具，可以使用现成的网站主题来美化自己的博客。我对前端不熟悉，直接clone了[kingauthur](http://kingauthur.info/about.html)的主题，然后自己做了一些修改，也对这个博客系统有了进一步的掌握。

下面讲一下Jekyll模板以及我经常修改的几个文件：

```
.
|—— _config.yml  整个网站的配置文件
|—— assets/
|   |—— custom/  个性化主题
|       |—— css/     主题的配置文件，我添加了返回顶部和代码高亮文件，修改了配色文件
|       |—— js/
|       |—— photos/  主题的配图&文章的插图
|—— _includes/
|   |—— JB/
|       |—— comments            根据_config.yml里的配置调用相应的评论框，我添加了多说
|       |—— comments-provider/  保存评论框代码，我添加了多说文件
|       |—— posts_collate       所有文章页面的显示方式，该目录也包含标签/分类列表
|   |—— theme/
|       |—— YOUR_THEME/
|           |—— default.html    网页模板
|           |—— post.html       文章模板
|—— _layouts/    网页模板，调用theme目录中文件，不需要修改
|—— _posts/      所有文章都保存在这里
|—— index.html   网站首页
|—— 404.html     网站的404页面
|—— favicon.ico  浏览器标签页的缩略图
|—— robots.txt   搜索引擎的访问控制协议
|—— sitemap.txt  网站地图，可被搜索引擎收录的网页
```

##4 使用markdown写文章

`markdown`是一种轻量级标记语言，允许人们“使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML或者HTML文档”。

1 要学习markdown语法，可以在两个在线编辑器上练习使用：

[Cmd Markdown](https://www.zybuluo.com/mdeditor)，汉语界面。   
[StackEdit](https://stackedit.io/editor)，英语界面。

2 本地编辑器

[MarkdownPad](http://markdownpad.com/)，Windows平台。   
[ReText](http://sourceforge.net/projects/retext/files/)，Linux平台。会出现图标不显示的问题，编辑`~/.config/ReText\ project/ReTexthconf`(如果没有则创建)，添加一行`iconTheme=YOURICONTHEME`即可(YOURICONTHEME可以使用`/usr/share/icons/`里面任一目录名)。

---

整个博客从搭建到修改再到熟练掌握，耗费了很长的时间，也学到了一些前端的皮毛知识。计划从今天开始在这里记录生活和学习中的点点滴滴，希望以后能够坚持下去。
