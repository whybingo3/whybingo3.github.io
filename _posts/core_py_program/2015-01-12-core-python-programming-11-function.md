---
layout: post
title: "Python核心编程--学习笔记--11 函数和函数式编程"
description: "Python核心编程学习笔记系列文章"
category: tech
tags: [python, python核心编程]
---
{% include JB/setup %}

本章讲解函数的方方面面，包括函数的多种调用方式和参数类型，变量的作用范围，并实现了一些函数式编程接口。

<!--break-->

---

##1 什么是函数

函数是对程序逻辑进行**结构化**或**过程化**的一种编程方法。

Python的函数可以返回一个值或对象，包括**容器对象**(列表/元组)和空对象__none__(即没有返回值)。

##2 创建函数

###2.1 定义函数

函数定义的语法：

```python
def func_name(args):     #注意冒号
    '函数文档字符串'    #非必须，但是强烈推荐有
     函数体代码组
```

> 不同于C，Python将函数声明和定义视为一体。

###2.2 前向引用

函数定义之前，**不能**对其进行调用。注意如下例子：

```python
>>> def foo():
...     print 'in foo()'
...     bar()   #函数内部调用另外一个未定义函数，但此时并未实际执行
... 

>>> def bar():
...     print 'in bar()'
... 

>>> foo()       #成功运行,因为此时bar()已定义
in foo()
in bar()
```

###2.3 函数属性

使用**句点属性标识**并拥有名字空间的领域。利用`dir(func_name)`可查看函数属性。

```python
>>> def foo():
...     'foo() -- properly created doc string'  #显式添加文档字符串
... 

>>> def bar():
...     pass
... 

>>> bar.__doc__ = 'Oops, forgot the doc string above'   #定义体之外添加文档字符串
>>> bar.version = 0.1       #定义体之外添加属性
```

###2.4 内部/内嵌函数

在**函数体内创建**的函数叫做`内部/内嵌`函数。

```python
>>> def foo():
...     def bar():                  #函数内定义的函数
...         print 'bar() called'
...     print 'foo() called'
...     bar()                       #函数内调用
... 

>>> foo()       #调用foo()
foo() called
bar() called

>>> bar()       #调用内部函数bar()，不可访问
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'bar' is not defined
```

###2.5 递归函数

函数内部**调用自身**，例如求阶乘函数：

```python
>>> def factorial(N):
...     if N == 0 or N == 1:
...         return 1
...     else:
...         return N * factorial(N - 1) #N! = N * (N - 1)!
... 

>>> factorial(0)
1
>>> factorial(4)
24
```

##3 调用函数

函数通过`函数调用符()`来调用，单纯的函数名只是一个`函数对象`。

```python
>>> def func():
...     print 'Hello World'
... 

>>> func    #函数名是一个对象
<function func at 0xb7408e64>
>>> func()  #加()才会实际调用
Hello World
```

任何输入的`参数`都需要放在括号中，参数个数要和定义函数时**一致**。

##4 函数的参数

###4.1 位置参数

类似于C，函数调用时**传入的**`参数`必须与**定义中**参数的**顺序**和**个数**精确匹配。

###4.2 默认参数

类似于C++，函数定义时某些参数已有默认值，那么调用时可以**不传入**该参数。

所有位置参数必须出现在第一个默认参数**之前**，否则调用时会混乱。

###4.3 关键字参数

调用函数时，直接使用**参数名字**来传入参数。这时允许参数**不按顺序**并且可以**跳过**默认参数。

###4.4 变长参数

`非关键字`变长参数：函数声明时用`*`表示，调用函数时传入一个`*(元组)`；

`关键字`变长参数：函数声明时用`**`表示，调用函数时传入一个`**{字典}`；

{% highlight python %}
def foo(arg1, arg2, arg3 = 5, *nkw, **kw):
    print 'arg1 =', arg1, 'arg2 =', arg2, 'arg3 =', arg3
    for each in nkw:
        print 'additional non-keyword args:', each
    for k in kw:
        print 'additional keyword args: %s=%s' % (k, kw[k])
{% endhighlight %}

执行语句：

```python
>>> bfoo(1,2,3,4,*(5,6),**{'x':7, 'y':8})
arg1 = 1 arg2 = 2 arg3 = 3
additional non-keyword args: 4
additional non-keyword args: 5 
additional non-keyword args: 6
additional keyword args: y=7
additional keyword args: x=8
```

##5 函数式编程

###2.5 函数装饰器

###5.1



###5.2



###5.3



###5.4



###5.5



##6



###6.1



###6.2



###6.3



###6.4



###6.5



##7



###7.1



###7.2



###7.3



###7.4



###7.5



##8



###8.1



###8.2



###8.3



###8.4



###8.5



##9



###9.1



###9.2



###9.3



###9.4



###9.5



##10



###10.1



###10.2



###10.3



###10.4



###10.5



