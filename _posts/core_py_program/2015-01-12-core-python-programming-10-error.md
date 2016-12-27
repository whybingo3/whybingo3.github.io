---
layout: post
title: "Python核心编程--学习笔记--10 错误和异常"
description: "Python核心编程学习笔记系列文章"
category: tech
tags: [python, python核心编程]
---
{% include JB/setup %}

本章将介绍什么是异常，异常处理，Python对异常的支持，如何在代码里生成异常，以及如何创建自定义的异常类。

<!--break-->

---

##1 什么是异常

因为程序出现了**错误**而在正常控制流以外采取的**行为**。行为分为两个阶段：

- 发生了一个异常条件，解释器引发异常。
- 异常引发后，可以调用很多不同操作（退出/忽略等）。

##2 Python中的异常

程序崩溃后有个一致的错误接口：`traceback/跟踪返回`，包括错误名称、原因、行号。

常见的异常：

|异常名称|描述|
|---|---|
|NameError|访问未声明变量
|ZeroDivisionError|除零错误
|SyntaxError|语法错误
|IndexError|下标超出序列范围
|KeyError|不存在的字典键
|IOError|输入/输出错误
|AttributeError|访问未知的对象属性

##3 检测和处理异常

- `try`语句块内的代码都会被检测。
- `except`对异常进行处理（**处理器**）。
- `else`try范围内没有检测到异常时执行。
- `finally`无论异常是否发生都会执行。

###3.1 try-except语句

语法：

```python
try:
    可能发生异常的代码段
except Exception[, reason]: #错误原因可选
    异常处理代码
```

例如打开一个不存在的文件：

```python
>>> try:
...     f = open('filename', 'r')
... except IOError, e:
...     print 'could not open file:', e
...
could not open file: [Errno 2] No such file or directory

>>> print e
[Errno 2] No such file or directory
```

- 如果没有异常发生，则忽略except语句继续执行。
- 如果异常发生，而没有找到合适的**处理器**，则将异常上交调用者处理。( **堆栈**框架返回到之前那个)
- 如果到达最顶层仍没找到对应处理器，则显示**跟踪消息**后退出。

###3.2 带有多个except的try语句

一个try语句后可以加**多个** except语句处理多种异常，异常发生后在这一串处理器中查找匹配：

```python
try:
    可能发生多种异常的代码段
except Exception1[, reason1]: #错误原因可选
    异常1处理代码
except Exception2[, reason2]: 
    异常2处理代码
```

###3.3 处理多个异常的except语句

还可以在一个except子句里处理多个异常，这些异常用**元组**表示：

```python
try:
    可能发生多种异常的代码段
except (Exception1, Exception2)[, reason1]: #错误原因可选
    异常1和2的处理代码
```

###3.4 捕获所有的异常

一个except语句捕获**所有常规**的异常，用异常类`Exception`：

```python
try:
    可能发生多种异常的代码段
except Exception:           #Exception是常规异常类的基类
    异常的处理代码
```

裸的except语句可以捕获**所有**异常，但是**不推荐**！！(无法提供有效信息)

要捕获**所有**异常，用所有异常的基类`BaseException`。异常继承结构为：

```
- BaseException
|—— KeyboardInterrupt   用户按下^C
|—— SystemExit          程序退出
|—— Exception
|—— 其他所有内建异常
```

> 不要捕获所有异常，然后忽略掉。

###3.5 异常参数

`异常参数`保存了异常发生的原因，它将各种信息保存在一个**元组**中。通常只有一个字符串。

上面代码中提到的`异常原因`实际上是一个`类对象`，异常参数就是这个对象的**属性**。

```python
>>> try:
...     f=open("11111", "r")    #打开一个不存在的文件
... except IOError, e:          #e就是异常原因
...     print 'ERROR!', e
... 
ERROR! [Errno 2] No such file or directory: '11111'

>>> type(e)     #e是一个类对象
<type 'exceptions.IOError'>

>>> e.__doc__   #类的说明文档
'I/O operation failed.'

>>> str(e)      #类对象的字符串表示
"[Errno 2] No such file or directory: '11111'"
```

###3.6 try-finally语句

`finally`语句里的代码总会执行。若try中发生异常，且没有处理器去处理，则finally中所有代码执行完毕后，继续向**上一层**引发异常。

若finally中代码引发另一个异常或由于return/break/continue语法而终止，原来的异常将**丢失**且无法重新引发。

##4 上下文管理 with

上文中的try-except和try-finally可以保证共享资源的唯一分配，并在任务结束时释放。

而`with`语句则可以更简单，可以将资源分配释放代码去掉。用法例子：

```python
with open('/etc/passwd', 'r') as f: #打开文件，将文件对象引用赋给变量f
    for eachLine in f:
        处理每行
```

此段代码中，不管在哪里是否发生异常，都会执行**清理代码**，最后文件都会**自动**关闭。

with仅能用于支持`上下文管理协议`的对象，这些对象包括：

- file
- decimal.Context
- thread.LockType
- threading.Lock
- threading.RLock
- threading.Condition
- threading.Semaphore
- threading.BoundedSemaphore

##5 触发异常 raise

程序员可以自己指定异常发生，就是使用`raise`语句。语法如下：

```python
raise [SomeException [, args [, traceback]]]
```

参数：

- `SomeException`：异常名字，必须是一个字符串/ **类** /对象。
- `args`：异常参数，用于传给异常。
- `traceback`：追踪对象，可重新引发异常。

raise语句用法：

|rasie语法|描述|
|---|---|
|raise exclass         | 触发一个异常,从exclass生成一个实例
|raise exclass()       | 同上,生成一个新的exclass实例
|raise exclass, args   | 同上,但同时提供的异常参数args,可以是一个参数也可以元组
|raise exclass(args)   | 同上
|raise exclass,args, tb| 同上,但提供一个追踪对象tb供使用
|raise exclass,instance| 通过实例触发异常(通常是exclass的实例); 如果实例是exclass的子类实例,那么新异常的类型会是子类的类型;如果都不是,那么会复制此实例为异常参数去生成一个新的exclass实例.
|raise instance        | 通过实例触发异常:异常类型是实例的类型
|raise string          | (过时的) 触发字符串异常
|raise string, args    | 同上,但触发伴随着args
|raise string, args, tb| 同上,但提供了一个追踪对象tb供使用
|raise                 | 重新触发前一个异常,如果之前没有异常,触发TypeError
    
##6 断言

判断表达式布尔值，若为`真`则跳过，否则触发`AssertionError`(断言错误)的异常。用法：

```python
>>> assert 1==1 #表达式为真，直接跳过

>>> assert 1==0 #表达式为假，触发异常
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AssertionError

>>> try:
...     assert 1==0, "1 doesn't equal 0 silly"  #加一个异常参数
... except AssertionError, args:
...     print '%s: %s' % (args.__class__.__name__, args)
... 
AssertionError: 1 doesn't equal 0 silly
```

##7 标准异常

|异常名称|描述|
|---|---|
|BaseException     | 所有异常的基类
|SystemExit        | 解释器请求退出
|KeyboardInterrupt | 用户中断执行(通常是输入^C)
|Exception         | 常规错误的基类
|StopIteration     | 迭代器没有更多的值
|GeneratorExit     | 生成器(generator)发生异常来通知退出
|StandardError     | 所有的内建标准异常的基类
|ArithmeticError   | 所有数值计算错误的基类
|FloatingPointError| 浮点计算错误
|OverflowError     | 数值运算超出最大限制
|ZeroDivisionError | 除(或取模)零 (所有数据类型)
|AssertionError    | 断言语句失败
|AttributeError    | 对象没有这个属性
|EOFError          | 没有内建输入,到达EOF 标记
|EnvironmentError  | 操作系统错误的基类
|IOError           | 输入/输出操作失败
|OSError           | 操作系统错误
|WindowsError      | 系统调用失败
|ImportError | 导入模块/对象失败
|LookupError | 无效数据查询的基类
|IndexError  | 序列中没有此索引(index)
|KeyError    | 映射中没有这个键
|MemoryError | 内存溢出错误(对于Python 解释器不是致命的)
|NameError   | 未声明/初始化对象 (没有属性)
|UnboundLocalError | 访问未初始化的本地变量
|ReferenceError    | 弱引用(Weak reference)试图访问已经垃圾回收了的对象
|RuntimeError      | 一般的运行时错误
|NotImplementedError   | 尚未实现的方法
|SyntaxError Python    | 语法错误
|IndentationError      | 缩进错误
|TabError              | Tab 和空格混用
|SystemError           | 一般的解释器系统错误
|TypeError             | 对类型无效的操作
|ValueError            | 传入无效的参数
|UnicodeError          | Unicode 相关的错误
|UnicodeDecodeError    | Unicode 解码时的错误
|UnicodeEncodeError    | Unicode 编码时错误
|UnicodeTranslateError | Unicode 转换时错误
|Warning           | 警告的基类
|DeprecationWarning| 关于被弃用的特征的警告
|FutureWarning     | 关于构造将来语义会有改变的警告
|OverflowWarning   | 旧的关于自动提升为长整型(long)的警告
|PendingDeprecationWarning | 关于特性将会被废弃的警告
|RuntimeWarning    | 可疑的运行时行为(runtime behavior)的警告
|SyntaxWarning     | 可疑的语法的警告
|UserWarning       | 用户代码生成的警告

##8 通过sys模块获取异常信息

`sys模块`中的`exc_info()`函数也可获取异常信息。

```python
>>> try:
...     float('abc123') #参数错误例子
... except:
...     import sys
...     exc_tuple = sys.exc_info()  #使用该函数，返回一个元组

>>> print exc_tuple
(<type 'exceptions.ValueError'>, 
 ValueError('could not convert string to float: abc123',), 
 <traceback object at 0xb726bf04>)
```

从上可知sys.exc_info()返回一个**元组**，元组元素是:

- exc_type: 异常类
- exc_value: 异常类的实例
- exc_traceback: 追踪(traceback)对象

##9 相关模块

|模块|描述|
|---|---|
|exceptions|内建异常(永远不用导入这个模块)|
|contextliba|为使用with语句的上下文对象工具|
|sys|包含各种异常相关的对象和函数(见sys.ex*)|

