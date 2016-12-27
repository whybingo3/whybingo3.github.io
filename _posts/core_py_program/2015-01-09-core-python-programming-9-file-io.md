---
layout: post
title: "Python核心编程--学习笔记--9 文件和输入输出"
description: "Python核心编程学习笔记系列文章"
category: tech
tags: [python, python核心编程]
---
{% include JB/setup %}

本章深入介绍Python的文件处理和相关输入输出能力，包括：文件对象(以及它的内建函数、内建方法和属性)，标准文件，文件系统的访问方法，文件执行，最后简要涉及持久存储和标准库中与文件有关的模块。

<!--break-->

---

##1 文件对象

也称为`句柄/文件描述符`，可以访问**普通文件**和**设备文件**等。`文件`只是**连续的字节序列**，无论单字节还是大块数据，数据传输都会用到**字节流**。

##2 文件内建函数

`open()`和`file()`功能一样，**打开**一个文件，**返回**一个文件对象；打开失败则引发错误。

> 推荐：**打开文件**时用open；为了**说明文件对象**时用file，例如isinstance(fd, file)。

语法：

```python
file_object = open(file_name, access_mode = 'r', buffering = -1)
```

其中，参数`访问模式`包括：

- `'r'` 读
- `'w'` 写
- `'a'` 追加（即使seek到其他地方，也是写入**文件末尾**）
- `'b'` 二进制（**不能**在前面出现）
- `'+'` 同时支持读写
- `'U'` 通用换行符

参数`缓冲方式`包括：

- `0` 不缓冲
- `1` 只缓冲一行
- `>=2` 给定值作为缓冲区大小
- `负数` 系统默认缓冲机制（tty设备**行缓冲**，其他设备正常缓冲）。

###2.1 通用换行符UNS

不同OS的换行符不同，使用`'U'`标识打开文件时，**读方法**返回的换行符都被**替换**为`\n`。

文件对象的`newlines属性`记录**原来的**行结束符。它在没碰到行结束符时为__None__，读到第一个行结束符时变成**第一个**行结束符，读到其他行结束符时变成一个包含不同换行符的**元组**。 

`UNS`**默认打开**，运行`configure脚本`时用`--without-universal-newlines`可关闭。

##3 内建函数

###3.1 读文件

{% highlight python linenos %}
read()      #读至文件结尾。如果给定参数size大小且为正，则最多读取size大小
readline()  #读取下一行，包括行结束符，作为字符串返回。如果给定size，则最多读取size大小
readlines() #将各行组成一个列表返回，也有size参数，不常用
{% endhighlight %}

###3.2 写入文件

{% highlight python linenos %}
write()      #和read()功能相反
writelines() #接收一个字符串列表作为参数，行结束符需要自己添加
{% endhighlight %}

###3.3 文件内移动

{% highlight python linenos %}
seek(offset[, whence]) #将文件指针移动offset个字节，默认0从文件头开始，1从当前位置开始，2从文件尾开始
tell()                 #返回文件指针的位置，从头开始计算
{% endhighlight %}

###3.4 文件迭代

{% highlight python linenos %}
for eachline in fobj:   #直接迭代，eachline包括换行符
    pass

fobj.next()             #返回下一行，包括换行符
{% endhighlight %}

###3.5 其他

{% highlight python linenos %}
close()    #关闭文件。如果不显式地关闭文件，可能丢失输出缓冲区的数据。
fileno()   #返回打开文件的描述符。这是一个整数，可用在如os模块(os.read())的一些底层操作上。
flush()    #直接把内部缓冲区中的数据立刻写入文件。 
isatty()   #当文件是一个类tty设备时返回True。 
truncate() #将文件截取到当前文件指针位置或者到给定的size，以字节为单位。
{% endhighlight %}

###3.6 示例

由于操作系统的不同，**换行符**、**路径分隔符**都不同，只要导入`os模块`就会设置为正确值。因此使用os模块有助于**跨平台**开发：

{% highlight python linenos %}
linesep  #行分隔符的字符串，linux中为'\n'
sep      #路径名分隔符的字符串，linux中为'/'
pathsep  #文件路径分隔符的字符串，linux中为':'
curdir   #当前工作目录的字符串名称，linux中为'.'
pardir   #(当前工作目录的)父目录字符串名称，linux中为'..'
{% endhighlight %}

由于`write()`方法**不会**自己添加换行符，写入文件时要注意**添加**：

{% highlight python linenos %}
fobj.write('hello world\n')
fobj.write('%s%s' % ('hello world', os.linesep))
{% endhighlight %}

文件内**移动文件指针**：

```python
>>> f=open('tmp', 'w+')       #打开文件，读写模式
>>> f.tell()   #文件指针在0位置
0L

>>> f.write('test line 1\n')  #写入一行，12个字符，包括换行符
>>> f.tell()   #文件指针后移12个字节
12L

>>> f.seek(-12,1)  #在当前位置左移12个字节
>>> f.tell()       #回到0位置
0L

>>> f.readline()   #读取第一行
'test line 1\n'
>>> f.tell()       #又向后移动12个字节
12
>>> f.close()      #记得关闭文件
```

##4 文件内建的数据属性

{% highlight python linenos %}
file.closedTrue  #文件已关闭则为True
file.encoding    #文件所使用的编码 - 当写入Unicode字符串时，它们将自动使用encoding转换为字节字符串；若encoding为None时使用系统默认编码
file.mode        #文件打开时使用的访问模式
file.name        #文件名
file.newlines    #未读取到行分隔符时为None，只有一种行分隔符时为一个字符串，有多种类型的行结束符时则为一个列表
file.softspace   #为0表示在输出一数据后要加上一个空格符，1表示不加。一般程序员用不着，由程序内部使用。
{% endhighlight %}

##5 标准文件

{% highlight python linenos %}
sys.stdin   #标准输入
sys.stdout  #标准输出
sys.stderr  #标准错误
{% endhighlight %}

##6 命令行参数

{% highlight python linenos %}
sys.argv      #参数列表，类似于C语言的char ×argv[]
len(sys.argv) #参数歌手，Python没有argc
{% endhighlight %}

还有两个模块用于**辅助**处理`命令行参数`：

{% highlight python linenos %}
getopt   #简单，不很精细
optparse #复杂，面向对象
{% endhighlight %}

##7 文件系统

对`文件系统`的大部分访问通过`os模块`实现，它只是一个虚拟层，**真正**加载的模块与OS有关。

`os模块`：**删除/重命名**文件、**遍历**目录树、管理文件**访问权限**等：

{% highlight python linenos %}
文件处理 
mkfifo()/mknod()    #创建命名管道/创建文件系统节点
remove()/unlink()   #删除文件
rename()/renames()  #重命名文件
stat/lstat()        #返回文件信息
symlink()           #创建符号链接
utime()             #更新时间戳
tmpfile()           #创建并打开('w+b')一个新的临时文件
walk()              #生成一个目录树下的所有文件名

目录/文件夹
chdir()/fchdir()    #改变当前工作目录/通过一个文件描述符改变当前工作目录
chroot()            #改变当前进程的根目录
listdir()           #列出指定目录的文件
getcwd()/getcwdu()  #返回当前工作目录/功能相同，但返回一个 Unicode 对象
mkdir()/makedirs()  #创建目录/创建多层目录
rmdir()/removedirs()#删除目录/删除多层目录

访问/权限
access()            #检验权限模式
chmod()             #改变权限模式
chown()/lchown()    #改变owner和group ID/功能相同，但不会跟踪链接
umask()             #设置默认权限模式

文件描述符操作
open()          #底层的操作系统open(对于文件，使用标准的内建open()函数)
read()/write()  #根据文件描述符读取/写入数据
dup()/dup2()    #复制文件描述符号/功能相同，但是是复制到另一个文件描述符

设备号
makedev()       #从major和minor设备号创建一个原始设备号
major()/minor() #从原始设备号获得major/minor设备号
{% endhighlight %}

`os.path`：**管理/操作**文件路径名中的各部分、获取**文件/子目录**信息、文件**路径查询**等：

{% highlight python linenos %}
分隔
basename()  #去掉目录路径，返回文件名
dirname()   #去掉文件名，返回目录路径
join()      #将分离的各部分组合成一个路径名
split()     #返回(dirname(), basename())元组
splitdrive()#返回(drivename, pathname)元组
splitext()  #返回(filename, extension)元组

信息
getatime()  #返回最近访问时间
getctime()  #返回文件创建时间
getmtime()  #返回最近文件修改时间
getsize()   #返回文件大小(以字节为单位)

查询
exists()    #指定路径(文件或目录)是否存在
isabs()     #指定路径是否为绝对路径
isdir()     #指定路径是否存在且为一个目录
isfile()    #指定路径是否存在且为一个文件
islink()    #指定路径是否存在且为一个符号链接
ismount()   #指定路径是否存在且为一个挂载点
samefile()  #两个路径名是否指向同个文件
{% endhighlight %}

##8 永久存储模块

**转换并储存** Python对象，该过程将**比基本类型更复杂**的对象转换为一个**二进制数据**集合。这个过程也被称为数据的**扁平化/序列化/顺序化**。

- `marshal`：只能处理**简单** Python对象。
- `pickle`：可以处理**递归**对象、被不同地方**多次引用**的对象、**用户定义**的类和实例。
- `DBM风格模块`：数据库管理模块，`anydbm`可以自己选择最优模块。 
- `shelve`：使用`anydbm模块`寻找合适的DBM模块，然后用`cPickle`来完成储存转换过程。

##9 相关的模块

{% highlight python linenos %}
base64   #提供二进制字符串和文本字符串间的编码/解码操作
binascii #提供二进制和 ASCII 编码的二进制字符串间的编码/解码操作
bz2      #访问BZ2格式的压缩文件
csv      #访问csv文件(逗号分隔文件)
filecmp  #用于比较目录和文件
fileinput  #提供多个文本文件的行迭代器
getopt/optparse #提供了命令行参数的解析/处理
glob/fnmatch    #提供 Unix 样式的通配符匹配的功能
gzip/zlib  #读写GNU zip(gzip)文件(压缩需要zlib模块)
shutil     #提供高级文件访问功能，包括复制文件及其访问权限等
c/StringIO #对字符串对象提供类文件接口
tarfilea   #读写TAR归档文件，支持压缩文件
tempfile   #创建一个临时文件(名)
uu       #格式的编码和解码
zipfile  #用于读取 ZIP 归档文件的工具
{% endhighlight %}
 
