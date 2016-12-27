---
layout: post
title: "Python核心编程--学习笔记--3 基础"
description: "Python核心编程学习笔记系列文章"
category: tech
tags: [python, python核心编程]
---
{% include JB/setup %}

本章介绍基本的Python语法、编程风格；并简要介绍标识符、变量和关键字，以及变量占用内存的分配和回收；最后给出一个较大的Python样例程序来体验这些特性。

<!--break-->

---

##1 语句和语法

###1.1 注释

可以在一行的任何位置，以`#`开头，直至行尾都是注释。

###1.2 反斜线继续上一行

一行过长的语句，可以用反斜线`\`分解成多行。`\`必须是该行的最后一个字符。

`闭合符号`：小括号`()`、中括号`[]`、花括号`{}`、三引号`"""  """`/`'''  '''`，其内的语句可以**跨行**书写，不需使用`\`。

###1.3 多个语句构成代码组

**缩进相同**的一组语句构成一个代码块，称为`代码组`。例如：if、while等关键字开头的首行，其后的一行或多行就是一个代码组。首行及之后的代码组称为一个`子句`(clause)。

###1.4 代码组由不同的缩进分隔

代码的`层次关系`通过**同样深度**的空格或Tab缩进来体现，同一代码组所有行必须**严格左对齐**。

没有缩进的代码块是最高层次的，称为脚本的`main部分`。

###1.5 同一行书写多个语句

多个语句写在同一行的话，之间用分号`;`隔开，这些语句**同属一个**代码块（子句），中间不能开始新的代码块。

###1.6 模块

每个Python脚本文件都可以当成一个`模块`，模块以磁盘文件形式存在。如果一个模块太大，功能太多，应考虑拆分到多个模块中。

##2 变量赋值

Python通过等号`=`、增量赋值运算符`+=、-=、*=`等来赋值。

Python中，对象是通过`引用传递`的。在赋值时，不管这个对象是新创建的，还是一个已经存在的，都是将该对象的**引用**（并不是值）赋值给变量。   
> 要有对象的概念，名字只是一个符号/指针，指向被赋值的对象。

Python中的`链式赋值`（多重赋值），只是对象的**同一个引用**被赋给了多个变量。Python的赋值语句**不会返回值**（与C不同）。

```python
>>> x = y = z = 1
>>> y
1
>>> x = ( y = 13 )          #错误例子，赋值语句没有返回值，不能赋给另一个变量
  File "<stdin>", line 1
    x = ( y = 13 )
            ^
SyntaxError: invalid syntax
```

`增量赋值`，同样适合于`列表/字符串`；++n、--n被解析为+(+n)、-(-n)，n++、n--是语法错误。Python支持的增量赋值符如下所示：   

||||||||||||
|---|---|---|---|---|---|---|---|---|---|---|
|+= |-= |*= |/= |%= |**=|<<=|>>=|&= |^= |I= |

```python
>>> aList = [123, 'xyz']
>>> aList += [45.6e7]       #列表加
>>> aList
[123, 'xyz', 456000000.0]

>>> n=3
>>> --n                     #与C语言不同
3
>>> n
3
>>> n--                     #语法错误
  File "<stdin>", line 1
    n--
      ^
SyntaxError: invalid syntax
```

`多元赋值`，即同时给多个变量赋值： 

```python
>>> x, y, z = 1, 2, 'a string'  #实质是元组，建议加上括号，即(x, y, z) = (1, 2, 'string')
>>> y
2

>>> x, y = y, x                 #不需要中间变量，即可交换两个变量值
>>> x
2
>>> y
1 
```

##3 标识符

合法`标识符`：同C语言，字母或下划线_开头，后面可以是字母、数字或下划线；大小写敏感。

`关键字`：关键字列表`kwlist`和`iskeyword()函数`都放入了`keyword模块`以便查阅。

|||||||||
|---|---|---|---|---|---|---|---|
|and|as|assert|break|class|continue|def|del|
|elif|else|except|exec|finally|for|from|global|
|if|import|in|is|lambda|not|or|pass|
|print|raise|return|try|while|with|yield|None|

```python
>>> import keyword
>>> keyword.iskeyword('and')
True
```

`内建built-in`：可以在任何一级代码使用的名字集合，可以由解释器设置或使用，应把它当作“系统保留字”，不做他用。

> Python不支持重载标识符，任何时刻都只有一个名字绑定。

内建是`__builtins__模块`的成员，由解释器在最开始自动导入。可看成适用于任何一级代码的`全局变量`。

`类变量`的专用下划线标识符：

```python
_xxx      #不用'from module import *'导入，外部可以访问，但是应视其为 私有变量
__xxx__   #系统定义名字，特殊变量，可以直接访问，自己不要使用这种变量名
__xxx     #类中的私有变量名，外部无法访问（实质上，一般的编译器都将其改名为'_所属类名__xxx'）
```

##4 基本风格指南

**添加注释，写字串文档，采用合适缩进，尽量使用简短的变量名。**

```python
import this  #可以看到Python之禅
```

###4.1 模块结构和布局

编写脚本文件pytest.py，并执行：

{% highlight python linenos %}
#/usr/bin/env python        #1.起始行(Unix) / 模块注释
# -*- coding: utf-8 -*-     #如果代码包含中文，需要添加该行(由于出现在该注释之前，上一行的中文注释会被报错)

"this is a test module"     #2.模块文档，可通过'模块名.__doc__'直接访问

import sys      #3.导入所需的模块
import os

debug = True    #4.全局变量。尽量少使用全局变量，有利于代码维护，提高性能，节省内存

class FooClass(object):    #5.类定义，模块被导入时类就会被定义
    "Foo class"            #类文档，可通过 模块名.类名.__doc__ 来访问
    pass

def test():            #6.函数定义，模块被导入时类就会被定义，可通过 模块名.函数名() 来访问
    "test function"    #函数文档，可通过 模块名.函数名.__doc__ 来访问
    foo = FooClass()   #类对象
    if debug:
        print 'ran test()'

if __name__ == '__main__':    #7.主程序部分，通常只包含函数调用，无论是被导入还是作为脚本执行，都会执行这部分代码
    test()                    #如果模块直接执行，则__name__值为'__main__'，该句执行；如果被导入，则__name__值为模块名
{% endhighlight %}

```python
$ python pytest.py  #作为脚本直接执行
ran test()

>>> import pytest   #交互解释器中，由于是导入模块，主程序部分的if条件不成立。模块名即去掉后缀的文件名
>>> pytest.__doc__  #模块文档
'this is a test module'
>>> pytest.FooClass.__doc__     #模块内的类文档
'Foo class'
>>> pytest.test()   #执行模块内函数
ran test()
```

> - 没有缩进的代码，在模块被导入时就会被执行（所以导入模块时，类、函数就会被定义）。
> - 安全的写代码方式：除了真正要执行的代码，把其他功能代码都写在函数当中。
> - 绝大部分的模块，其创建的目的就是被导入，所以应该尽量只包括类、函数的定义。
> - 很多项目都只有一个主程序部分，由它导入模块、调用函数。

###4.2 在主程序中书写测试代码

`测试代码`应该在模块直接执行时运行，模块被导入时不运行行。（即上例中最后的if语句）

> 测试代码应随着测试条件、结果变更而更新，每次更新后都应执行测试代码，以确认没新问题。

##5 内存管理

###5.1 变量定义

变量无需声明，**第一次被赋值时**自动声明。

```python
>>> x
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'x' is not defined
>>> x=4
>>> x
4
```

###5.2 动态类型

变量的`类型`和`所占内存`，都是`运行时`确定的。赋值时，解释器根据语法和右操作数来决定新对象类型。对象创建后，将其`引用`赋给左边变量。

###5.3 内存分配

Python解释器负责内存管理，程序员无需关心。

###5.4 引用计数

Python内部记录着使用中的对象各有多少引用，当对象的引用计数为0时，它就被垃圾回收。

`增加`引用计数：

```python
x = 3.14    #对象被创建
y = x       #对象的别名被创建，即对象被赋值给一个新变量
foobar(x)   #对象作为参数传递给函数（新的本地引用）
myList = [123, x, 'xyz']    #对象成为容器对象的一个元素
```

`减少`引用计数：一个本地引用离开了其`作用范围`，比如上面的foobar()函数结束时。

```python
del y       #对象的别名被显式的销毁
x = 123     #对象的一个别名被赋值给其它的对象 
myList.remove(x)    #对象被从一个窗口对象中移除
del myList  #窗口对象本身 离开作用范围 或 被销毁
```

`del`语句：

```python
del  obj1[, obj2[...]]  #可以一次删除多个对象的引用
```

`del y`会将y从现在的`名字空间`中删除，且y **指向的对象**引用计数减1。对象引用计数为0后将“无法访问”。追踪或调试程序会增加对象的一个额外引用。

###5.5 垃圾收集

`垃圾收集器`是一段独立代码，用来寻找**引用计数为0**的对象，也检查那些**引用计数不为0但应该被销毁**的对象，然后释放其内存。

当两个对象`相互引用`时，引用计数可能不会为0，因此垃圾收集器也包含`循环垃圾收集器`，来清理未引用的循环。

##6 第一个Python程序

介绍两个处理文本文件的脚本，分别实现`写入/读取`文件内容。

makeTextFile.py，创建文件，`写入`每行文本：

{% highlight python linenos%}
#!/usr/bin/env python

'makeTextFile.py -- create text file'

import os
ls = os.linesep    #换行符，Unix为'\n'，Windows为'\r\n'，用os.linesep则不需关心平台。起个别名，减少名字查询，代码跑得快，名字也短

while True:
    fname = raw_input('Enter filename: ')
    if os.path.exists(fname):    #判断文件是否已存在，存在则返回True
        print "ERROR: '%s' already exists" % fname
    else:
        break

all = []
print "\nEnter lines ('.' by itself to quit).\n"

while True:
    entry = raw_input('> ')
    if entry == '.':        #输入'.'时结束输入
        break
    else:
        all.append(entry)   #将输入内容添加到列表中

fobj = open(fname, 'w')
fobj.writelines(['%s%s' % (x, ls) for x in all])    #列表解析。writelines接收包含行结束符的结果列表，并写入文件
fobj.close()
print 'DONE!'
{% endhighlight %}

readTextFile.py，`读取`并打印文本内容：

{% highlight python linenos%}
#!/usr/bin/env Python

'readTextFile.py -- read and display text file'

fname = raw_input('Enter filename: ')
print

try:    #捕获异常语句，适用于没有合适函数处理异常的情况。这里没有使用上面的os.path.exsits()函数，因为打开文件错误可能不仅仅是文件名错误导致
    fobj = open(fname, 'r')
except IOError, e:      #如果打开文件错误，则捕获异常，并输出异常提示信息，然后跳过else
    print "*** file open error:", e
else:   #如果成功打开文件，则执行该子句
    for eachLine in fobj:
        print eachLine, #创建文件时，我们人为加入了换行符，所以这里打印的时候要抑制print生成的换行符
    fobj.close()
{% endhighlight %}

##7 相关模块

- 调试模块`pdb`：允许设置（条件）断点，代码逐行执行，检查堆栈。还支持事后调试。
- 日志模块`logging`：定义了一些函数和类，帮程序实现灵活的日志系统。有五级日志级别：紧急，错误，警告，信息，调试。
- 性能测试：`profile`，`hotshot`，`cProfile`。
 
