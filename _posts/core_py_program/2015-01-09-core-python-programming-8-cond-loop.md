---
layout: post
title: "Python核心编程--学习笔记--8 条件和循环"
description: "Python核心编程学习笔记系列文章"
category: tech
tags: [python, python核心编程]
---
{% include JB/setup %}

本章讲述if、while、for以及与他们搭配的else、elif、break、continue、pass等语句。

<!--break-->

---

##1 if语句

`语法`包括三部分——关键字`if`、`条件表达式`、`代码块`。（**记住冒号**）

```python
if cond_expr:
    expr
```

###1.1 多重条件表达式

`条件表达式`可以是一个由`not`、`and`、`or`连接起来的**逻辑表达式**。

###1.2 单一语句的代码块

如果代码块只有一行，可以将三部分写在一行，**不推荐**这样。

##2 else语句

同C语言中的if...else...，记住`冒号`。else一定要与和它搭配的if **对齐**。

```python
if cond_expr:
    expr0
else:
    expr1
```

##3 elif语句

类似于C中使用else if。if后面只可以配**一个else**，但是可以有**多个elif**。

```python
if cond_expr0:
    expr0
elif cond_expr1:
    expr1
elif cond_expr2:
    expr2
else:
    expr3
```

如果出现这种形式的用法：

```python
if user.cmd == 'create': 
    action = "create item" 
elif user.cmd == 'delete': 
    action = 'delete item' 
elif user.cmd == 'update': 
    action = 'update item' 
else: 
    action = 'invalid choice... try again!' 
```

不如使用`元组`或`字典`来判断**成员**，效率更高，顺便复习一下之前学到的知识：

```python
#判断元组成员
if user.cmd in ('create', 'delete', 'update'): 
    action = '%s item' % user.cmd 
else: 
    action = 'invalid choice... try again!' 

#判断字典成员，并使用字典方法
msgs    = {'create': 'create item', 'delete': 'delete item', 'update': 'update item'} 
default = 'invalid choice... try again!' 
action  = msgs.get(user.cmd, default)
```

##4 条件表达式

Python中的`A if cond else B`等价于C语言中的cond ? A : B。

##5 while语句

###5.1 语法

类似C语言中while的用法，记住`冒号`：

```python
while cond_expr:
    expr
```

###5.2 计数循环

```python
>>> count = 0
>>> while count < 9:
...     print 'index is', count
...     count += 1
```

###5.3 无限循环

死循环`while True:` ，很多通讯服务器的客户端/服务端就采用无限循环。

##6 for语句

Python中最强大的循环结构，可**遍历**序列成员，可用在**列表解析**和**生成器表达式**中，会自动调用**迭代器**的`next()`方法，捕获`StopIteration异常`并结束循环，这些都是在内部发生的。

###6.1 语法

```python
for iter_val in iterable:
    expr
```

序列可以**直接迭代**，而且比通过索引迭代**更有效率**。

###6.2 用于迭代器类型

迭代器对象有一个`next()`方法，调用它则返回**下一个**元素，迭代**结束后**引发一个`StopIteration异常`。

```python
>>> it = reversed( range(3) )   #reversed函数返回一个迭代器，它是参数的逆序
>>> it.next()
2
>>> it.next()
1
>>> it.next()
0
>>> it.next()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

for语句迭代一个迭代器时，在**内部调用**next()方法，并**自动**捕获异常。

###6.3 range()内建函数

返回一个包含数值的**列表**。有三种语法：

{% highlight python linenos %}
range(start, end, step = 1)  #完整语法，返回一个列表，包含[start, end - 1]
range(start, end)            #步长默认为1
range(end)                   #开始默认为0，步长默认为1
{% endhighlight %}

###6.4 xrange()内建函数

和range()很相似，参数一样。不过它返回一个`xrange对象`，**可迭代**。在数据量很大时，比range()**高效**且**节省内存**。

###6.5 与序列相关的内建函数

以下函数都返回一个可迭代的对象：

{% highlight python linenos %}
sorted()    #返回一个序列
zip()       #返回一个序列

reversed()  #返回一个迭代器
enumerate() #返回一个迭代器
{% endhighlight %}

##7 break语句

类似于C语言里的break，用于**退出循环**。

##8 continue语句

类似于C语言里的continue，**忽略**循环中的剩余语句，立即**回到**循环头，**检查**条件表达式，进行下一次循环或退出循环。

##9 pass语句

NOP，即no operation。对于想好结构，没有想好具体代码的程序，可以作为一个**占位语句**。

##10 用在循环中的else

else与`while或for`对齐使用，当循环**正常结束**时（`非break`）执行else里的语句。

可以认为它与**循环的判断条件**（当成一个if）搭配使用。

{% highlight python linenos %}
#!/usr/bin/env python 

for i in range(3):
    if i == 1:
        break    #跳出循环，不执行后面的else语句
    print i
else:
    print 'loop over'
{% endhighlight %}

```python
$ python pytest.py   #执行脚本
0
```

将break改成`continue`，最终循环是**正常结束**的，则执行else语句：

```python
$ python pytest.py 
0
2
loop over
```

##11 迭代器

- 为**类序列对象**提供一个类序列接口，可用它来迭代表现出序列行为的对象（字典、文件等）。
- 迭代`字典`，结果就是遍历`dict.keys()`返回的列表；
- 迭代`文件对象`，结果就是遍历`fp.readlines()`返回的列表。
- 迭代`序列`时**可以**修改成员，其他对象**不可以**修改，也**不推荐**迭代的时候修改。
- `iter()`可以为一个序列或者集合等**生成**其迭代器。

> 迭代器把所有元素的值都放到了**内存**中。参见下面**生成器表达式**。

##12 列表解析

语法：

```python
[expr for iter_val in iterable] #生成一个列表
```

例如：

```python
#一维列表
>>> [x*x for x in range(3)]
[0, 1, 4]

#二维列表
>>> [(x, y**2) for x in range(2) for y in range(3)]
[(0, 0), (0, 1), (0, 4), (1, 0), (1, 1), (1, 4)]
```

扩展形式，对迭代变量加一个**条件**：

```python
>>> [x*x for x in range(4) if x % 2]     #只求奇数的平方
[1, 9]
```

##13 生成器表达式

语法和列表解析类似：

```python
(expr for iter_val in iterable) #这里是小括号
```

类似于range和xrange的区别，列表解析返回一个**列表**，数据都在**内存**中；

`生成器表达式`返回一个**生成器**，**迭代**或调用`next()`方法时实时计算数据，数据不常驻内存。

##14 模块

Python有一个`模块itertools`，用于辅助使用迭代器。
