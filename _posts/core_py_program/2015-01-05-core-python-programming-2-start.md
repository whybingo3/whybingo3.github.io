---
layout: post
title: "Python核心编程--学习笔记--2 起步"
description: "Python核心编程学习笔记系列文章"
category: tech
tags: [python, python核心编程]
---
{% include JB/setup %}

本章是对Python的主要特性做一个快速介绍。

<!--break--> 

---

##1 介绍

交互执行时，**解释器**有两种提示符：

**主提示符** `>>>` 等待输入**下一条**语句；   
**次提示符** `...` 等待输入**当前语句**的其它部分。

Python有两种方式来完成要求:

`语句`：  使用关键字来组成命令，可以有输出，也可以没有；   
`表达式`：没有关键字，可以是算术表达式，也可以是函数。

##2 程序输出

可以用`print`语句显示变量的**字符串表示**，或者仅使用变量名查看该变量的**原始值**：

```python
>>> myString = 'Hello World'
>>> print myString
Hello World      #没有引号
>>> myString
'Hello World'    #有引号
```

`下划线_`在解释器中有特别的含义，表示**最后一个表达式的值**。所以上面的代码执行之后，下划线变量会包含字符串:　　　　　

```python
>>> _
Hello World
```

格式化输出——`%s`：字符串（任何类型都可以用%s输出），`%d`：整数，`%f`：浮点数。　

```python
>>> print "%s is number %d" % ("Python", 1)
Python is number 1
```

符号`>>`用来重定向print输出：　　　　　　　　　　

```python
logfile = open('/tmp/mylog.txt', 'a')
print >> logfile, 'Fatal error: invalid input!'  #将后面的输出语句写入打开的文件
logfile.close()
```

##3 程序输入

`raw_input()`：从标准输入读取一个字符串，**自动删除**换行符，并将数据赋值给指定变量。

```python
>>> user = raw_input('Enter login name: ')
Enter login name: root
>>> print 'Your login is:', user
Your login is: root
```

内建函数`int()`：可以将**数值字符串**转换成**整数值**，这样才可以对它进行数学运算。

```python
>>> num = raw_input('Now enter a number: ')
Now enter a number: 1024
>>> print 'Doubling your number: %d' % (int(num) * 2)
Doubling your number: 2048
```

内建函数`help()`：将陌生函数名作为其参数，可以得到帮助信息。

```python
>>> help(raw_input)
Help on built-in function raw_input in module __builtin__:
.
.
.
```

##4 注释

**普通注释**：以`#`开始，直到单行结束。   
**特殊注释**：`文档字符串`：在模块、类或者函数的**起始**添加一个字符串，起到在线文档的功能。对于函数，调用help即显示该字符串。

##5 运算符

**标准算术**运算符：

{% highlight python linenos %}
+
-
*
/     #Python3.0后为标准除；3.0之前整数为地板除，浮点数为标准除
//    #整数和浮点数都是地板除 
%     #浮点数也可以求余
**    #幂运算
{% endhighlight %}

**标准比较**运算符，返回布尔值True或者False：

{% highlight python linenos %}
<
<=
>
>=
==
!=
<>    #不等号，逐渐被淘汰
{% endhighlight %}

**逻辑**运算符：

{% highlight python linenos %}
and
or
not
{% endhighlight %}

逻辑运算符可以将任意表达式连接在一起：

```python
>>> 3<4 and 4<5
True
>>> 3<4<5    #等价于上面的表达式
True
```

##6 变量和赋值

`变量名`：以**字母或下划线**开头，其它的字符可以是数字，字母或下划线。

变量不需要预先声明类型。需要**定义**之后才能使用，其类型和值在赋值那一刻被初始化。

变量支持`复合赋值`，即 +=，-= 等等。

**不支持**自增(++)和自减(--)运算符。Python将--n解释为-(-n)。n--为语法错误。

##7 数字

{% highlight python linenos %}
int   (有符号整数)  84         -127      017   0x1f
long  (长整数)     1234567L   -12345l   0xADCFAEBL #范围远超C语言，仅受限于虚拟内存
bool  (布尔值)     True(=1)   False(=0)            #可以和整数直接进行运算
float (浮点值)     3.14       4.2E-10   -90.
complex (复数)     6.23+1.5j  -12-875J
{% endhighlight %}

##8 字符串

成对的`单/双引号`包裹（单/双引号可互相包含），`三引号`(三个连续单/双引号)可以包含特殊字符(如换行符)。

```python
>>> str1 = 'hello'
>>> str2 = "world"
>>> str3 = '''Hello
... World'''       #...表示当前语句的其他部分，这里表示字符串后半部分

>>> print str1, str2
hello world
>>> print str3
Hello
World              #包含换行符

>>> str3
'Hello\nWorld!'
```    

使用索引运算符`[ ]`和切片运算符`[ : ]`可得到子串。第一个字符的索引是0，最后一个字符的索引是`-1`。

```python
>>> str = "Python is cool!"
>>> str[0]
'P'
>>> str[-1]
'!'

>>> str[4:]
'on is cool!'
>>> str[-3:]
'ol!'

>>> str[:3]     #从str[0]开始，不包括str[3]
'Pyt'
>>> str[:-1]    #不包括str[-1]
'Python is cool'
```

加号`+`用于连接字符串，星号`*`用于字符串重复。

```python
>>> str1 = 'abc'
>>> str2 = "DEF"
>>> str1 + str2
'abcDEF'
>>> str1 * 2
'abcabc'
```

##9 列表和元组

可视为普通的`数组`，能保存**任意数量任意类型**的对象。单个结构可以存储不同类型的对象。

`列表`元素用中括号`[ ]`包裹，元素个数以及元素值**可以更改**。通过从**0**开始的下标访问元素。

```python
>>> list1 = [1,2,3,'abc']
>>> list1[3] = 'def'
>>> list1
[1, 2, 3, 'def']
```

`元组`元素用小括号`( )`包裹，元素个数以及元素值**不可以更改**。可以看成是只读的列表。

```python
>>> list2 = [4,5,6,'xyz']
>>> tuple1 = (11,12,13,list1)   #list1即上面例子中所定义
>>> tuple1
(11, 12, 13, [1, 2, 3, 'def'])

>>> tuple1[3] = list2           #更改元组元素的值，错误
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment

>>> tuple1[3][3] = 'python'     #更改元组中列表元素的内容，正确
>>> tuple1
(11, 12, 13, [1, 2, 3, 'python'])
```

> 元素可以看成指向内存对象的指针。元组元素不可以改变指向，但所指对象内的值可以改变。

列表/元组都可以通过`切片`运算`[ ]和[ : ]`得到子集，其子集仍然是列表/元组。

##10 字典

类似于关联数组或`哈希表`，由`键-值(key-value)对`组成。字典用花括号`{ }`包裹。

`键`可以使用所有**不可变类型**的对象（一般使用**字符串**或**数字**），`值`可以是任意对象。

```python
>>> aDict = {'host': 'earth'}   #创建字典
>>> aDict['port'] = 80          #键不存在则自动添加元素
>>> aDict
{'host': 'earth', 'port': 80}

>>> aDict.keys()    #所有键组成的列表
['host', 'port']

>>> aDict['host']   #访问元素
'earth'
>>> for key in aDict:   #遍历
...     print key, aDict[key]
...
host earth
port 80
```

##11 代码块即缩进对齐

Python不使用花括号来包裹代码块，而使用`缩进对齐`来表达代码逻辑。

##12 if语句　　

记住`条件语句`之后的`冒号:`。

```python
if expression:      #expression值为True或者非0时，条件成立
    if_suite
```

```python
if expression:
    if_suite
else:
    else_suite
```

```python
if expression1:
    if_suite
elif expression2:   #else if
    elif_suite
else:
    else_suite
```

##13 while循环

记住`while语句`之后的`冒号:`。

```python
while expression:
    while_suite
```

##14 for循环和range()内建函数

Python的`for循环`和C的计数循环不一样，更像是shell脚本里的foreach **迭代**。它接受`可迭代对象`（例如序列或迭代器）作为其参数，每次迭代其中一个元素。

```python
>>> print 'I like to use the Internet for:'
I like to use the Internet for:

>>> for item in ['e-mail', 'net-surfing', 'homework', 'chat']:  #迭代每一个元素
...     print item
...
e-mail
net-surfing
homework
chat
```

上面每次print都输出到新的一行，因为**print语句默认给每一行添加一个换行符**。在print语句最后添加一个`逗号,`即可输出到同一行：

```python
>>> for item in ['e-mail', 'net-surfing', 'homework', 'chat']:
...     print item,     #添加一个逗号使输出到同一行
...     print           #输出换行符
e-mail net-surfing homework chat
　   
```

内建函数`range()`接受一个数值，生成一个`列表`，可以实现计数循环。

```python
>>> for eachNum in range(3):    #不包括3
...     print eachNum
...
0
1
2
```

range()函数经常和`len()`函数一起用于`字符串索引`：

```python
>>> str = 'abcd'
>>> for i in range(len(str)):
...     print '%d' % i, str[i]
... 
0 a
1 b
2 c
3 d
```

字符串也可以**直接**使用for循环输出元素：

```python
>>> for c in str:
...     print c
... 
a
b
c
d
```

以上要么循环索引，要么循环元素。而`enumerate()`函数同时做到了这两点：

```python
>>> for i,ch in enumerate(str):
...     print "%d" % i, ch, str[i]
... 
0 a a
1 b b
2 c c
3 d d
```

##15 列表解析　　

可以在一行中使用一个`for循环`将所有值放到一个`列表`当中：

```python
>>> squared = [x ** 2 for x in range(4)]
>>> squared
[0, 1, 4, 9]
```

也可以**挑选**符合要求的值加入列表：

```python
>>> squared = [x ** 2 for x in range(8) if not x % 2]   #if后面成立才加入列表
>>> squared
[0, 4, 16, 36] 
```

##16 文件和内建函数open()，file()

`open()`打开文件：

```python
fobj = open(filename, 'r')
for eachLine in fobj:
    print eachLine,     #由于每行自带一个换行符，所以print后面有逗号，阻止print再换行
fobj.close()            #已打开的文件，访问结束之后，记得close
```

其中，`filename`是文件的字符串名字；`'r'`为访问模式，表示读(read)文件，其他模式还有`'w'`：写文件，`'a'`：添加，`'+'`：读写，`'b'`：二进制访问；未提供访问模式时，**默认**为'r'。打开成功时返回一个文件对象句柄。

上述程序，一次读入了所有行（适用于小文件），迭代输出各行，然后关闭文件。

`file()`功能等同于open()，是一个`工厂函数`，生成文件对象。（类似于int()生成整型对象）

##17 异常

可以用`try...except`来检测和处理异常：

```python
try:
    #可能出错的代码
    ...
except XError, e:
    print 'error', e    #捕获异常XError，并输出异常信息e
```

##18 函数

函数**定义**：

```python
def addMe2Me(x):                      #def 函数名(参数列表):   记得冒号
    'apply + operation to argument'   #函数说明文档
    return (x + x)                    #返回，如果没有return，自动返回None对象    
```

函数**调用**：

```python
>>> addMe2Me(4.25)
8.5
>>> addMe2Me('Python')      #字符串相加
'PythonPython'
>>> addMe2Me([-1, 'abc'])   #列表相加
[-1, 'abc', -1, 'abc']
```

**默认参数**：

```python
>>> def foo(debug=True):    #默认参数
...     'determine if in debug mode with default argument'
...     if debug:
...         print 'in debug mode'
...     print 'done'
...
>>> foo()                   #未提供参数，默认为True
in debug mode
done
>>> foo(False)              #显示提供参数，覆盖默认
done
```

##19 类

**定义**类：

{% highlight python linenos %}
class FooClass(object):     #用class关键字，括号里是基类，没有合适基类就用object作为基类
    """my very first class: FooClass"""     #类文档，可选
    version = 0.1                           #静态变量，为所有成员函数共享

    #创建类对象后，自动执行该函数；显式定义该函数，则覆盖默认的init函数(什么也不做)；
    #所有的__fun__都是特殊方法。
    def __init__(self, nm='John Doe'):      #self参数，即类对象自身的引用　　　　
        """constructor"""
        self.name = nm                      #name，类对象的属性，不是类本身的部分
        print'Created a class instance for', nm

    def showname(self):
        """display instance attribute and class name"""
        print 'Your name is', self.name
        print 'My name is', self.__class__.__name__   #输出实例化该对象的类名，self.__class__引用实际的类
        
    def showver(self):
        """display class(static) attribute"""
        print self.version      #访问静态变量
 
    def addMe2Me(self, x):      #没有使用self
        """apply + operation to argument"""
        return x + x
{% endhighlight %}

创建**类对象**：

```python
>>> foo1 = FooClass()       #自动调用__init__
Created a class instance for John Doe
```

**方法调用**：

```python
>>> foo1.showname()
Your name is John Doe       #打印定义时的默认参数
My name is __main__.FooClass
>>> foo1.showver()
0.1
>>> print foo1.addMe2Me('xyz')
xyzxyz
```

**提供参数**：

```python
>>> foo2 = FooClass('Jane Smith')
Created a class instance for Jane Smith
>>> foo2.showname()
Your name is Jane Smith
My name is FooClass         #与上不同
```

##20 模块

`模块`就是Python源文件；`模块名`就是文件名去掉后缀.py。模块包括**可执行代码/函数/类**。

`import`导入模块，访问模块属性：

```python
>>> import sys
>>> sys.stdout.write('Hello World\n')  #访问函数，write函数需要显式提供\n来输出换行
Hello World
>>> sys.platform                        #访问变量
'linux2'
```

##21 有用的函数

{% highlight python linenos %}
dir([obj])  #显示对象的属性；若未提供参数，则显示全局变量的名字
help([obj]) #以整齐美观的形式显示对象的文档字符串；若未提供参数，则会进入交互式帮助
int(obj)    #将一个对象转换为整数
len(obj)    #返回对象的长度
open(fn, mode)  #以mode('r' = 读，'w'= 写)方式打开一个文件名为fn的文件
range([start,]stop[,step]) #返回一个整数列表。起始为start(默认为0)，结束为stop-1；step默认值为1
raw_input(str)  #等待用户输入一个字符串，可以提供一个可选的参数str用作提示信息
str(obj)        #将一个对象转换为字符串
type(obj)       #返回对象的类型(返回值本身是一个type对象!)
{% endhighlight %}

