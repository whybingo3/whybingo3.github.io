---
layout: post
title: "Python核心编程--学习笔记--4 对象"
description: "Python核心编程学习笔记系列文章"
category: tech
tags: [python, python核心编程]
---
{% include JB/setup %}

现在开始学习Python语言的核心部分。本章包括什么是Python对象、最常用的内建类型、标准类型运算符以及内建函数，并给出对标准类型的不同分类方式，最后提一提Python目前还不支持的类型（这对那些有其他高级语言经验的人会有所帮助）。

<!--break-->

---

##1 Python对象

Python使用`对象模型`来存储数据，任何类型的值都是一个对象。

所有的Python对象都拥有三个特性：`身份`，`类型`，`值`。

- 身份：对象的唯一标识，可用内建函数`id()`来得到。与对象的内存地址相关。极少会用到。
- 类型：决定该对象可以保存的值的类型、进行的操作、遵循的规则。可用内建函数`type()`查看。在Python中类型也是对象，所以type()返回的是`对象`，而不是简单的字符串。
- 值：  对象表示的数据项。 

对象`属性`：最常用的是`函数`和`方法`，也有`数据属性`（类、类对象、模块、复数、文件等）。

##2 标准类型

也称为`基本数据类型`：

|||||||||||
|---|---|---|---|---|---|---|---|---|---|
|数字|整型|布尔型|长整型|浮点型|复数型|字符串|列表|元组|字典|

##3 其他内建类型

###3.1 类型对象和type类型对象

由于对象的固有行为和特性，其类型不能简单的用字符串来表示，这些信息也不应该和数据放在一起，所以将类型定义成对象。

```python
>>> type(42)
<type 'int'>    #这实质上是一个类型对象，它输出这行字串，表明42是int类型
>>> type(type(42))
<type 'type'>   #类型对象是type类型，它是所有类型的根和所有标准类的默认元类(metaclass)
```

###3.2 None，Python的Null对象

`None`类型只有一个值，就是None（类似C语言中void类型和NULL值）。None的布尔值为`False`。

> 每个对象天生具有布尔True或False值。

具有`False`值的对象有：

{% highlight python linenos%}
None
False   (布尔类型)
所有的值为零的数：
    0   (整型)
    0.0 (浮点型)
    0L  (长整型)
    0.0+0.0j (复数)
"" (空字符串)
[] (空列表)
() (空元组)
{} (空字典)
用户创建的类实例如果定义了nonzero(__nonzero__())或length(__len__())且值为0
{% endhighlight %}

除此之外任何对象的布尔值都为`True`。

##4 内部类型

一般程序员不会直接和这些对象打交道。

###4.1 代码对象

`代码对象`是编译过的源代码片段，是可执行对象。调用`compile()`可得到。可被`exec命令`或`eval()函数`执行。

本身不包含任何执行环境信息，它是用户`自定义函数`的核心，被执行时动态获得上下文。除此之外，一个函数还有其它必须的`属性`：函数名，文档字符串，默认参数，全局命名空间等。

###4.2 帧对象

表示Python的`执行栈帧`，包含解释器在运行时所需知道的所有信息。`属性`包括：指向上一帧的链接，正在被执行的代码对象，本地及全局名字空间字典，当前指令等。每次函数调用产生一个新的帧，每一个帧对象都会相应创建一个C栈帧。

###4.3 跟踪记录对象

当`异常`发生时被创建，它包含针对异常的栈跟踪信息。如果一个异常有自己的处理程序，处理程序就可以访问这个跟踪记录对象。

###4.4 切片对象

当使用Python`扩展`的切片语法，或使用`slice()函数`时，就会创建切片对象。

扩展的切片语法包括：

- 多维切片：sequence[start1 : end1, start2 : end2]
- 省略切片：sequence[..., start1 : end1] 
- **步进切片：sequence[起始索引 : 结束索引 : 步进值]**

```python
>>> foostr = 'abcde'
>>> foostr[::-1]    #步进值为-1，逆序输出
'edcba'
>>> foostr[::-2]
'eca'

>>> foolist = [123, 'xba', 342.23, 'abc']
>>> foolist[::-1]
['abc', 342.23, 'xba', 123]
```

###4.5 省略对象

有一个唯一的名字`Ellipsis`，用于扩展切片语法，起`记号`作用，这个对象在切片语法中表示`省略号`。它的布尔值始终为`True`。

###4.6 XRange对象

调用`xrange()`会生成一个Xrange对象，xrange()是`range()`的兄弟版本，用于需要**节省内存**使用或range()无法完成的超大数据集场合。

##5 标准类型运算符

###5.1 对象值的比较

`比较运算符`用来判断**同类型**对象是否相等，返回布尔值True或False。

```python
>>> 2.46 <= 8.33    #数字按值比较
True 
>>> 'abc' > 'xyz'   #字符串按字符序列值比较
False                            
>>> [3, 'abc'] == ['abc', 3]    #列表也有顺序
False 
>>> [3, 'abc'] == [3, 'abc'] 
True
```

多个比较操作可以在同一行上进行，求值顺序为**从左到右**。

```python
>>> 4 > 3 == 3    #之前也提到过，等同于 4>3 and 3==3
True
```

###5.2 对象身份比较

即对象的`内存地址`比较：

```python
>>> a=b=4.3 #一个值为4.3的数字对象被创建，这个对象的引用被赋值给变量a和b
>>> id(a) == id(b)
True

>>> a=4.3   #一个值为4.3的数字对象被创建，这个对象的引用被赋值给变量a
>>> b=a     #Pyhon是通过传递引用来处理对象的，所以b也指向a指向的对象
>>> id(a) == id(b)
True

>>> a=4.3   #分别创建了两个数字对象
>>> b=4.3
>>> id(a) == id(b)
False
```

> Python变量名只是一个符号，可看成对象的链接，上面的比较实质都是所指对象的比较。

关键字`is`和`not`：

```python
>>> a=[1,2,'abc']
>>> b=[2,1,'abc']
>>> a is b  #等同于id(a) == id(b)，a指向的对象就是b指向的对象
False
>>> a is not b
True
```

**特例**：`简单`的`整数`和`字符串`，会被高效的缓存，有时该创建对象的时候却没有创建：

```python
>>> a=12    #简单整数，缓存
>>> b=12
>>> a is b
True

>>> a='abc' #简单字符串，缓存
>>> b='abc'
>>> a is b
True

>>> a='abcdefghijklmnopqrstuvwxyz,.;'    #复杂字符串，不缓存
>>> b='abcdefghijklmnopqrstuvwxyz,.;'
>>> a is b
False
```

###5.3 逻辑运算符

按照优先级，`not` > `and` > `or`

```python
>>> not True and False      #not > and
False
>>> True or True and False  #and > or
True
```

##6 标准类型内建函数

###6.1 type()

`type(obj)`接受一个对象为参数，返回对象的类型。返回值是一个`类型对象`。

```python
>>> type(4)         #int类型
<type 'int'> 

>>> type('Hello World!')    #string类型 
<type 'string'> 

>>> type(type(4))   #type类型
<type 'type'>
```

输出用`< >`包裹，表明它是一个`对象`。**不容易显示**的对象，Python以一个相对标准的格式表示：`<object_something_or_another>`，其中通常会提供对象**类别**、对象**id**或**位置**等。

> 每个对象都可以实现一个可打印的字符串表示。

```python
>>> import sys
>>> sys
<module 'sys' (built-in)>    #内建，模块对象
>>> type(sys)
<type 'module'>
```

###6.2 cmp()

`cmp(obj1, obj2)` 比较对象大小：

- obj1 <  obj2，返回-1
- obj1 == obj2，返回0
- obj1 >  obj2，返回1

```python
>>> a, b = 2, -3
>>> cmp(a,b)
1
>>> cmp(b,a)
-1
>>> cmp('abc', 'abc')
0
```

> 对于用户自定义类对象，cmp()会调用该类的特殊方法\_\_cmp\_\_()。（在第13章会详细介绍）

###6.3 str()和repr()，及``运算符

`str(obj)`、`repr(obj)`、\``obj`\`  都是以字符串方式获取对象的内容、类型、数值属性等信息。（最后一个符号是反引号，键盘上数字1左边的键，现已**不鼓励**使用）

```python
>>> str(4.53-2j)       #str
'(4.53-2j)' 
>>> str(2e10) 
'20000000000.0' 

>>> repr([0, 5, 9, 9]) #repr
'[0, 5, 9, 9]' 

>>> `[0, 5, 9, 9]`     #反引号``
'[0, 5, 9, 9]'
```

> - str()的返回对用户可读性好
> - repr()和反引号``的返回对Python友好，且通常可以通过内建函数eval()重新得到该对象
> - repr()和反引号``的关系，类似于求幂的pow()和**，__函数与运算符各有其适用的地方__

```python
>>> a='abc\n'
>>> str(a)
'abc\n'

>>> repr(a) #' '字符串被进一步包装成" ' ' "，字符串内的换行符也被取消转义
"'abc\\n'"

>>> `a`     #反引号等同于repr
"'abc\\n'"

>>> print str(a)    #输出换行符
abc
>>> print repr(a)
'abc\n'
```

> raw_input()函数，就是将输入的内容送进repr()再返回其字符串形式的。

###6.4 type()和isinstance()

`isinstance(obj, class/type/tuple)` obj是否`类class`/`类型type`/`元组`的对象。

`type()`不仅仅可以返回标准类型，它可以返回`任意`对象的类型：

```python
>>> class Foo: pass
... 
>>> foo=Foo()

>>> class Bar(object): pass
... 
>>> bar=Bar()

>>> type(Foo)
<type 'classobj'>   #类对象
>>> type(foo)
<type 'instance'>   #类实例

>>> type(Bar)
<type 'type'>       #类型
>>> type(bar)
<class '__main__.Bar'>
```

下面是一个改进的过程：判断一个对象是否属于某个类型：

```python
if type(num) == type(0):    #判断num是否整型对象。缺点：两次函数调用
    ...
↓
import types
if type(num) == types.IntType:  #比较对象值。缺点：Python中一切皆对象，对于type(8)、type(-100)、types.IntType都是同一个对象<type 'int'>
    ...
↓
if type(num) is types.IntType:  #直接比较对象身份。缺点：要从模块types中查询IntType
    ...
↓
from types import IntType
if type(num) is IntType:    #减少查询次数
    ...
↓
isinstance(num, (int, str)) #同时查询多个
```

###6.5 Python类型运算符和内建函数总结

按照优先级**从高到低**：

|操作符|描述|返回值|
|---|---|---|
|**字符串**|
|``|字符串表示|str|
|**内建函数**|
|cmp()|比较两个对象|int|
|repr()|字符串表示|str|
|str()|字符串表示|str|
|type()|判断对象类型|type|
|**值比较**|
|<||bool|
|>||bool|
|<=||bool|
|>=||bool|
|==||bool|
|!=||bool|
|<>|不等于|bool|
|**对象比较**|
|is|同一个对象|bool|
|is not||bool|
|**布尔操作符**|
|not||bool|
|and||bool|
|or||bool|

##7 工厂函数

看上去象函数，实质上是类。调用它们时，实际上生成了该类型的一个对象。

> Python2.2统一了类型和类，所有的内建类型现在也都是**类**。在这基础之上，原来的内建**转换**函数象int()、type()、list()等等，现在都成了**工厂函数**。

一些老版本里的内建函数，现在的工厂函数：

```python
int(),  long(),     float(),     complex() 
str(),  unicode(),  basestring() 
list(), tuple() 
type() 
```

新的工厂函数： 

{% highlight python linenos%}
dict() 
bool() 
set(), frozenset() 
object() 
classmethod() 
staticmethod() 
super() 
property() 
file()
{% endhighlight %}

##8 标准类型的分类

分类有助于了解某类型应有的行为，帮助程序使用恰当的类型。

###8.1 存储模型

- **原子/标量存储**：能保存单个字面对象的类型。 包括`数值类型`、`字符串`。(`字符`是长度为1的字符串)
- **容器存储**：可容纳多个对象的类型，且可容纳不同类型的对象。包括`列表`、`元组`、`字典`。

###8.2 更新模型

- **可变类型**：对象被创建后，它的值可以更新。包括`列表`、`字典`。(利用`id()`可辨认对象是否改变)
- **不可变类型**：对象被创建后，它的值不可以改变。包括`数字`、`字符串`、`元组`。

###8.3 访问模型

- **直接访问**：非容器类的都可以。包括`数字`。
- **顺序访问**：按照从0开始的索引顺序访问，一次可以访问一个或多个元素。包括`字符串`、`列表`、`元组`。
- **映射访问**：通过无序存放的key访问，即哈希表。包括`字典`。

##9 不支持的类型

- **char/byte**：Python没有保存单一字符或8比特整数的类型，可使用长度为1的字符串表示。 
- **指针**：Python自己管理内存，因此没必要访问指针。其实在Python中，一切都是指针。 
- **int/short/long**：Python的整数实现等同于C语言的长整数，但是表达范围更广。
- **float/double**：Python的浮点类型实际上是C语言的double类型。

> 浮点数总是不精确的，Python有一种十进制浮点数类型**Decimal**，需要导入decimal模块才可以使用，它拥有任意的精度。在处理金钱这类确定的值时，Decimal类型就很有用。在处理重量、长度或其它度量单位的场合，float足够用了。
