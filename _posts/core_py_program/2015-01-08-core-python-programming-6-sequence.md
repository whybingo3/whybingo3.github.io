---
layout: post
title: "Python核心编程--学习笔记--6 序列"
description: "Python核心编程学习笔记系列文章"
category: tech
tags: [python, python核心编程]
---
{% include JB/setup %}

本章研究Python中的序列：字符串、列表和元组。

<!--break-->

---

##1 序列

按下标**[0, N-1]**访问某一元素，也可以通过切片操作一次得到多个元素。

###1.1 标准类型操作符

`比较`运算、`逻辑`运算（见4.5节）一般都适用。

###1.2 序列类型操作符

{% highlight python linenos%}
in, not in  #成员关系操作符
+           #连接操作符
*           #重复操作符
[]          #切片操作符
{% endhighlight %}

`成员关系`操作符——`obj [not] int seq`，判断obj是否属于seq：

```python
>>> 'py' in 'python'
True
>>> 4 not in range(6)
False
```

`连接`操作符——`seq1 + seq2`，返回一个**新**序列，它将两个序列合并成一个：

```python
>>> 'Py' + 'thon'
'Python'
>>> range(4) + range(4,8)
[0, 1, 2, 3, 4, 5, 6, 7]
```

`重复`操作符——`seq * copies_int`，返回一个**新**序列，包含copies_int个重复的seq：

```python
>>> '-' * 20
'--------------------'
```

`切片`操作符——`seq[index]`，`seq[start:stop]`，`seq[start:stop:step]`，访问元素/子序列/按**步长**访问：

```python
>>> aList = range(10)   #[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

>>> aList[:]        #切片操作，不指定起点和终点，则复制全部元素
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

>>> aList[None:8]   #起始为None，则默认从第一个元素开始
[0, 1, 2, 3, 4, 5, 6, 7]

>>> aList[3:]       #终点为空，则默认直到最后一个元素
[3, 4, 5, 6, 7, 8, 9]

>>> aList[1::3]     #步长为3
[1, 4, 7]

>>> aList[-len(aList):-1]   #负索引
[0, 1, 2, 3, 4, 5, 6, 7, 8]
                       
>>> aList[-1:-len(aList)]   #负索引。不管正负索引，起始元素一定要在终点元素的左边，否则返回空
[]

>>> aList[-100:100:2]       #切片操作可以超出范围
[0, 2, 4, 6, 8]
```

`逆序`访问序列，以及循环输出每次都去掉最后一个字符的序列：

```python
>>> aList = range(5)    #[0, 1, 2, 3, 4]

>>> aList[::-1]     #逆序输出
[4, 3, 2, 1, 0]

>>> for i in [None] + range(-1, -len(aList), -1):   #加[None]，否则第一个输出不包含最后一个元素
...     print aList[ :i]
... 
[0, 1, 2, 3, 4]
[0, 1, 2, 3]
[0, 1, 2]
[0, 1]
[0]
```

###1.3 内建函数

`类型转换`工厂函数：

{% highlight python linenos %}
str(obj)     #把obj对象转换成字符串(对象的字符串表示法) 
list(iter)   #把可迭代对象转换成一个列表对象 
tuple(iter)  #把可迭代对象转换成一个元组对象 
unicode(obj) #把对象转换成Unicode字符串(使用默认编码) 
basestring() #抽象工厂函数，其作用仅仅是为str和unicode函数提供父类，所以不能被实例化，也不能被调用(详见第2节) 
{% endhighlight %}

```python
>>> list('abcd')
['a', 'b', 'c', 'd']
>>> tuple('abcd')
('a', 'b', 'c', 'd')
```

**功能**函数：

{% highlight python linenos %}
len(seq)          #返回seq的长度  
sum(seq, init=0)  #返回seq和可选参数init的总和
reversed(seq)     #接受一个序列作为参数，返回一个以逆序访问的迭代器
enumerate(iter)   #接受一个可迭代对象作为参数，返回一个enumerate对象(也是一个迭代器)，该对象生成由iter每个元素的index值和item值组成的元组
 
#返回iter或(arg0,arg1,...)中的最大值；如果指定了key，则key必须是一个可以传给sort()方法的用于比较的回调函数
max(iter,key=None) 
max(arg0, arg1, ..., key=None)

#返回iter或(arg0,arg1,...)中的最小值；如果指定了key，key同上 
min(iter, key=None)
min(arg0, arg1, ..., key=None)

#接受一个可迭代对象作为参数，返回一个有序的列表;可选参数func,key 和 reverse 的含义跟 list.sort()内建函数的参数含义一样.
sorted(iter, func=None, key=None, reverse=False)

#返回一个列表，其第一个元素是it0,it1,...这些迭代对象各自第一个元素组成的一个元组，以此类推。返回列表长度等于it..中的最小值。
zip([it0, it1,... itN])
{% endhighlight %}

##2 字符串

`单/双/三引号`括起来的内容；str和Unicode字符串都是`抽象类basestring`的子类，这个basestring **不能**被实例化。

**访问**：通过`下标`和`切片`访问字符和子串，**不允许**通过下标修改内容，因为字符串是**不可变**类型。   
**更新**：更新字符串的值，实际上是创建了一个**新**对象，并将其`引用`赋值给原来的变量。   
**删除**：要么赋`空字符串值`，要么`del`掉这个变量引用。**不能**直接删除其中字符或子串。

一些`string模块`预定义的字符串：

```python
>>> import string
>>> string.ascii_uppercase  #大写字母
'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
>>> string.ascii_lowercase  #小写字母
'abcdefghijklmnopqrstuvwxyz'
>>> string.ascii_letters    #大小写字母合集
'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
>>> string.digits           #数字字符
'0123456789'
```

##3 字符串适用的操作符

###3.1 标准类型操作符

`比较`运算、`逻辑`运算都适用，实际按照`ASCII值`来比较。

###3.2 序列操作符

切片操作符`[]`、成员操作符`[not] in`、连接操作符`+`、重复操作符`*`都适用。

```python
>>> b = 'hello' ' ' "word"  #编译时连接字符串，同其他语言，Python默认将相邻的字符串连接为一个
>>> b
'hello word'
```

普通字符串和Unicode字符串连接时，普通字符串会被先`转换`成Unicode字符串，再连接：

```python
>>> 'hello' + u' ' + 'world'
u'hello world'
```

##4 只适用于字符串的操作符

###4.1 格式化操作符

字符串格式化符号：

{% highlight python linenos %}
%c    #转换成字符(ASCII码值，或者长度为一的字符串) 
%r    #优先用repr()函数进行字符串转换  
%s    #优先用 str()函数进行字符串转换 
%d/%i #转成十进制数 
%u    #转成十进制数  
%o    #转成八进制数 
%x/%X #转成十六进制数(x/X代表转换后的十六进制字符的大小写) 
%e/%E #转成科学计数法(e/E控制输出e/E) 
%f/%F #转成浮点数(小数部分自然截断) 
%g/%G #%e和%f / %E和%F的简写 
%%    #输出% 
{% endhighlight %}

格式化操作符**辅助**命令：

{% highlight python linenos %}
*     #定义宽度或者小数点精度 
-     #左对齐 
+     #在正数前面显示加号( + ) 
<sp>  #在正数前面显示空格 
#     #在八进制数前面显示零('0')，在十六进制前面显示'0x'或者'0X'(取决于用的是'x'还是'X') 
0     #显示的数字前面填充‘0’而不是默认的空格 
%     #'%%'输出一个单一的'%' 
(var) #映射变量(字典参数) 
m.n   #m是显示的最小总宽度,n是小数点后的位数(如果可用的话) 
{% endhighlight %}

例子：

```python
>>> '%#X' % 108    #打印十六进制的前缀，大写X
'0X6C'

>>> '%.2f' % 1234.567890    #保留两位小数位，默认为六位
'1234.57'

>>> '%e' % 1234.567890      #科学计数法，默认小数点后六位
'1.234568e+03'
>>> '%G' % 1234.567890      #默认整数位和小数位一共保留6位，从左到右第一个非0数字开始计算
'1234.57'
>>> '%g' % 0.001234567890   #前面的0不计入这六位数
'0.00123457'

>>> "%+d" % 4    #整数加符号
'+4'
>>> "% d" % 4    #整数前加空格
' 4'

>>> "we are at %d%%" % 100    #输出%
'we are at 100%'

>>> num = 123
>>> 'dec: %d/ oct: %#o/ hex: %#X' % (num, num, num) #分别输出十进制、带前缀的八进制和十六进制
'dec: 123/ oct: 0173/ hex: 0X7B'

>>> "MM/DD/YY = %02d/%02d/%02d" % (5, 15, 2014)     #输出宽度至少为2，不够的前面补0
'MM/DD/YY = 05/15/2014'

>>> 'There are %(howmany)d %(lang)s Quotation Symbols' % \
... {'lang': 'Python', 'howmany': 3}    #字典的键作为格式符，输出对应值的相应格式
'There are 3 Python Quotation Symbols'
```

###4.2 字符串模板：更简单的替代品

上例中，如果忘记了`%(lang)s`等这种`转换类型参数`，就会产生错误。

`Template对象`使用符号`$`、方法`substitute()`和`safe_substitute()`来显示字符串：

```python
>>> from string import Template
>>> s = Template('There are ${howmany} ${lang} Quotation Symbols')    #两个变量

>>> print s.substitute(howmany=3, lang='Python')    #使用模板，必须提供两个参数，否则报错
There are 3 Python Quotation Symbols

>>> print s.safe_substitute(lang='Python')  #安全函数，可以只提供一个参数
There are ${howmany} Python Quotation Symbols
```

###4.3 原始字符串操作符（r/R）

字符串前面加`r`，**取消**串内的`转义`：

```python
>>> f = open(r'C:\windows\temp\readme.txt', 'r')   #取消\t \r转义，否则报错
>>> f.readline()
'Table of Contents (please check timestamps for last update!)\n'
>>> f.close()
```

###4.4 Unicode字符串操作符（u/U）

```python
>>> u'abc'
u'abc'
>>> ur'Hello\nWorld'    #u必须在r之前
u'Hello\\nWorld'
```

##5 字符串适用的内建函数

###5.1 标准类型函数

`cmp(obj1, obj2)`——对于字符串，则是按照`ASCII值`来比较大小的。

###5.2 序列类型函数

- `len()`返回字符个数
- `max()`和`min()`分别返回`ASCII值`最大和最小的字符
- `enumerate()`返回包含**下标和字符**的`元组`组成的`迭代对象`、`zip()`返回一个`列表`：

```python
>>> enumerate('abc')
<enumerate object at 0xb72b0cac>    #返回一个可迭代对象

>>> for i in enumerate('abc'):      #迭代单元为元组
...     print i
... 
(0, 'a')
(1, 'b')
(2, 'c')

>>> for i,c in enumerate('abc'):    #迭代单元为元组里的元素
...     print i,c
... 
0 a
1 b
2 c

>>> zip('123', 'ABC', 'abc')    #各自第n个元素组成的元组，成为返回值列表的第n个元素
[('1', 'A', 'a'), ('2', 'B', 'b'), ('3', 'C', 'c')]
```

###5.3 字符串类型函数

{% highlight python linenos %}
raw_input() #可以用一个字符串作参数，作为提示，将用户输入转为字符串返回
str()       #工厂函数，将对象转换成可打印的字符串表示
unicode()   #工厂函数，将对象转换成Unicode的字符串表示
chr()       #接收[0,255]内的数，返回对应的字符
unichr()    #接收一定范围内的数，返回Unicode字符（具体范围视系统配置而定）
ord()       #接收一个字符
{% endhighlight %}

```python
>>> unichr(12345)
u'\u3039'
>>> ord(u'\u2345')    #\u表明后面是一个Unicode字符，如果不加，就是一个字符串'2345'
9029
```

##6 字符串的类方法

字符串是不可变类型，下面这些`方法`都是生成一个**新**对象并返回，原字符串并未变化：

{% highlight python linenos%}
string.capitalize()  #把字符串的第一个字符大写
string.center(width) #返回一个原字符串居中，并使用空格填充两边至长度width的新字符串
string.count(str, beg=0, end=len(string))   #返回str在一定范围里面出现的次数

#以encoding指定的格式编/解码string，出错默认报ValueError的异常，除非errors指定'ignore'或'replace' 
string.decode(encoding='UTF-8', errors='strict') 
string.encode(encoding='UTF-8', errors='strict')   

string.endswith(obj, beg=0, end=len(string))    #检查一定范围内的子字符串是否以obj结束  
string.startswith(obj, beg=0, end=len(string))  #检查一定范围内的子字符串是否是以obj开头

string.expandtabs(tabsize=8)    #把字符串string中的tab符号转为tabsize个空格  

string.find(str,   beg=0, end=len(string))  #检测str是否在一定范围子串内，在则返回其第一次出现下标，否则返回-1  
string.index(str,  beg=0, end=len(string))  #跟find()方法一样，不过如果str不在string中会报一个异常
string.rfind(str,  beg=0, end=len(string))  #类似于find()函数，不过是从右边开始查找
string.rindex(str, beg=0, end=len(string))  #类似于index()，不过是从右边开始

string.format ( *args, **kwargs) #格式化输出字符串，用参数代替字符串内的{}占位符

string.isalnum()  #如果string非空，且所有字符都是字母或数字，则返回True
string.isalpha()  #如果string非空，且所有字符都是字母，则返回True
string.isdigit()  #如果string非空，且所有字符都是数字，则返回True
string.islower()  #如果string非空，且所包含的字母都是小写，则返回True
string.isspace()  #如果string中只包含空格，则返回True
string.istitle()  #如果string是标题化的(见title())则返回True
string.isupper()  #如果string非空，且所包含的字母都是大写，则返回True

string.join(seqs) #以string作为分隔符，将seqs中所有的元素(的字符串表示)合并为一个新的字符串

string.ljust(width) #返回一个原字符串左对齐，并使用空格填充至长度width的新字符串
string.rjust(width) #返回一个原字符串右对齐，并使用空格填充至长度width的新字符串
string.lstrip()     #截掉string左边的空格
string.rstrip()     #删除string字符串末尾的空格
string.strip([obj]) #在string上执行lstrip()和rstrip()
string.split(str=" ", num=string.count(str))    #以str为分隔符，将string从前num个分隔符上切开
string.rsplit()     #见split()函数，不过从右边开始计算
string.splitlines(num=string.count('\n'))       #同上，不过分隔符改成换行符

string.lower()  #将string中存在的所有大写字符转为小写
string.upper()  #将string中的所有的小写字母转换为大写

string.partition(str)  #把string分成一个以str为中间元素的3元素元组，如果string中不包含str，则string为第一个元素
string.rpartition(str) #类似于partition()函数，不过是从右边开始查找

string.replace(str1, str2, num=string.count(str1)) #把string中的前num个str1替换成str2
string.swapcase()    #翻转string中的大小写
string.title()       #返回"标题化"的string，即所有单词都是以大写开始，其余字母均为小写
string.translate(str, del="")  #根据str给出的表(包含256个字符)转换string的字符，要过滤掉的字符放到del参数中
string.zfill(width)  #返回长度为width的字符串，原字符串string右对齐，前面填充0
{% endhighlight %}

`format()`函数在原书中没有，`dir(str)`可看到，所以举几个例子：

```python
>>> '{1},{0}'.format('world', 'hello')    #{}占位符，可以调整顺序
'hello,world'
>>> '{1},{0},{py}'.format('world', 'hello', py = 'pythoner')   #{变量}占位符
'hello,world,pythoner'
```

##7 字符串的独特特性

###7.1 特殊字符串和控制字符

`转义字符`，控制字符的一个用处就是用作`定界符`，它们不可打印：

|八进制|十进制|十六进制|字符|说明|
|---|---|---|---|---|
|\0000|0|0x00|NUL|空字符Nul, Python中不是字符串的结束符|
|\a007|7|0x07|BEL|响铃字符|
|\b010|8|0x08|BS|退格|
|\t011|9|0x09|HT|横向制表符|
|\n012|10|0x0A|LF|换行|
|\v013|11|0x0B|VT|纵向制表符|
|\f014|12|0x0C|FF|换页|
|\r015|13|0x0D|CR|回车|
|\e033|27|0x1B|ESC|转义|
|\"042|34|0x22|"|双引号|
|\'047|39|0x27|'|单引号|
|\\134|92|0x5C|\|反斜杠|
|\000 ~ \177||||八进制值|
|\x00 ~ \xff||||x开头的十六进制值|
|\||||连字符，将本行和下一行的内容连接起来|

###7.2 三引号

允许跨多行，字符串中可以**包含**换行符、制表符及其他特殊字符。对HTML或SQL很有用：

```python
>>> s='''hello
... world
... \tI'm
... here'''
>>> s
"hello\nworld\n\tI'm\nhere"
>>> print s
hello
world
    I'm
here
```

###7.3 字符串不变性

字符串是`不可变`类型：

```python
>>> s = 'abc'
>>> id(s)
139902686038944
>>> s += 'def'
>>> id(s)    #新分配内存，生成一个新对象，原对象被回收
139902685293376
```

##8 Unicode

###8.1 术语

{% highlight python linenos %}
ASCII  #美国标准信息交换码 
BMP    #基本多文种平面(第零平面) 
BOM    #字节顺序标记(标识字节顺序的字符) 
CJK/CJKV    #中文-日文-韩文(和越南语)的缩写 
Code point  #类似于ASCII值，代表Unicode字符的值，范围在range(1114112)或者说0x000000到0x10FFFF 
Octet       #八位二进制数的位组 
UCS    #通用字符集 
UCS2   #UCS的双字节编码方式(见 UTF-16) 
UCS4   #UCS的四字节编码方式
UTF    #Unicode或者UCS的转换格式
UTF-8  #八位UTF转换格式(无符号字节序列，长度为1~4个字节)                          
UTF-16 #16位UTF转换格式(无符号字节序列，通常是16位长[两个字节]，见 UCS2)
{% endhighlight %}

###8.2 什么是Unicode

使用1个或**多个**字节，可表示90,000+字符。

###8.3 怎么用Unicode

Python中字符串已经不再是个类型，而是`对象`。ASCII字符串是`StringType`，Unicode字符串是`UnicodeType`。

string模块已停止更新，只保留了**ASCII码**的支持，已不推荐使用。任何需要跟Unicode **兼容**的代码里都**不要**再用该模块。

`str()`和`chr()`处理Unicode字符串时会先`转换`成ASCII字符串，超出范围则**报错**；   
`unicode()`和`unichr()`则是Unicode版本的str()和chr()。

###8.4 Codecs是什么

`codec`是COder/DECoder的首字母组合，它定义了文本跟二进制值的转换方式。支持四种编码方式：**ASCII**，ISO8859-1/Latin-1，**UTF-8**和UTF-16。 

`UTF-8`编码，用**一个**字节来编码ASCII 字符，用**1~4个**字节来表示其他语言的字符，`汉语`一般用**3个**字节来表示。 

`UTF-16`以后可能会常用，所有字符都是用**2B**来存储。这两个字节的`顺序`需要定义，一般的UTF-16编码文件都需要一个`BOM`(Byte Order Mark)，或者显式定义`UTF-16-LE`（小端）或者`UTF-16-BE`（大端）字节序。

###8.5 编码解码

写文件时必须定义一个编码(**encoding参数**)用于把对应的Unicode内容转换成定义的格式。

{% highlight python linenos %}
#!/usr/bin/env python 

''' 
An example of reading and writing Unicode strings:
Writes a Unicode string to a file in utf-8 and reads it back in. 
''' 

CODEC = 'utf-8' 
FILE  = 'unicode.txt' 

hello_out = u"Hello world\n" 
bytes_out = hello_out.encode(CODEC) #编码

f = open(FILE, "w")
f.write(bytes_out)   #将编码的内容写入文件
f.close()

f = open(FILE, "r")
bytes_in = f.read()  #读文件
f.close()

hello_in = bytes_in.decode(CODEC) #解码
print hello_in,
{% endhighlight %}

```python
$ python pytest.py #执行
Hello world
$ cat unicode.txt  #显示生成的文件内容
Hello world
```

###8.6 Unicode应用到实际应用中

以下经验可以避免很多错误：

- 程序中出现字符串时一定要加个**前缀u**。
- 不要用str()函数，用**unicode()**代替。
- **不要**用过时的string模块。
- 尽量**不在**程序里面编解码Unicod字符，只在**写入**文件/数据库/网络时才调用encode()函数；只在**读数据**时才调用decode()函数。

###8.7 Python的Unicode支持

`unicode()`、`encode()`、`decode()`函数，接受一个字符串为参数，分别返回一个unicode对象、编码/解码后的字符串。

**类型**：Unicode类型是basestring的子类，用`unicode()`函数/字符串`前加u`来创建对象。   
**序数**：`ord()`——unicode字符->码值；`unichr()`——码值->Unicode字符。   
**转换**：**普通**字符串和Unicode字符串运算，会将普通串**强制转换**为Unicode串。   
**异常**：Unicode编解码异常继承自UnicodeError，这是exceptions模块中ValueError的子类。   
**RE**：正则表达式引擎需要Unicode支持。   
**格式化操作**：如果格式化字符串是Unicode对象（比如u"%s"），或输出中包含Unicode串，则执行转换`数字->普通字符串->Unicode字符串`。

```python
>>> u'%s' % 'abc'    #格式化字符串是Unicode对象
u'abc'
>>> '%s' % u'abc'    #输出是Unicode对象
u'abc'
>>> '%s-%s' % (u'abc', 12)    #数字->字符串->Unicode串
u'abc-12'
```

常用Unicode编码：

{% highlight python linenos %}
utf-8      #变量长度为8的编码(默认编码) 
utf-16     #变量长度为16的编码(大/小端) 
utf-16-le  #小端UTF-16编码 
utf-16-be  #大端UTF-16编码 
ascii      #7位ASCII码表
iso-8859-1 #ISO8859-1(Latin-1)码表 
unicode-escape     #(定义见Python Unicode构造函数) 
raw-unicode-escape #(定义见Python Unicode构造函数) 
native     #Python用的内部格式
{% endhighlight %}

##9 字符串相关模块

{% highlight python linenos %}
string      #字符串操作相关函数和工具，比如Template类 
re          #正则表达式：强大的字符串模式匹配模块 
struct      #字符串和二进制之间的转换 
c/StringIO  #字符串缓冲对象，操作方法类似于file对象 
base64      #Base 16,32,64数据编解码 
codecs      #解码器注册和基类 
crypt       #进行单方面加密 
difflib     #找出序列间的不同 
hashlib     #多种不同安全哈希算法和信息摘要算法的API  
hma         #HMAC信息鉴权算法的Python实现  
md5         #RSA的MD5信息摘要鉴权 
rotor       #提供多平台的加解密服务 
sha         #NIAT的安全哈希算法SHA  
stringprep  #提供用于IP协议的Unicode字符串 
textwrap    #文本打包和填充
unicodedata #Unicode数据库
{% endhighlight %}

`正则表达式`在第15章会做详细介绍。`re模块`中重要的函数有：

{% highlight python linenos %}
compile() #将一个RE表达式编译成一个可重用的RE对象
match()   #试图从字符串的开始匹配一个模式
search()  #找出字符串中所有匹配的项
sub()     #进行查找替换操作。其中的一些函数返回匹配到的对象，可以通过组匹配来访问（如果找到的话）。
{% endhighlight %}

##10 字符串关键点总结

- 单/双引号包围
- 不可变类型
- 格式化操作符%
- 三引号
- 取消转义
- NUL或'\0'不是结束符

##11 列表

类似于数组，但是列表可以包含**不同**类型的任意对象。列表是**可变**类型。

**创建**列表——手动赋值、工厂函数：

```python
>>> aList = [12, 'abc']
>>> print aList
[12, 'abc']
>>> list('foo')    #参数为可迭代对象
['f', 'o', 'o']
```

**访问**列表元素——下标[]或者切片[:]。

**更新**列表——直接对索引/索引范围赋值：

```python
>>> aList[0], aList[1] = 'mn', 'xyz'    #对一个索引范围赋值
>>> aList
['mn', 'xyz']

>>> aList[:] = 'ab', 'cd'    #列表重新赋值
>>> aList
['ab', 'cd']

>>> aList.append('gh')    #append()方法，在后面添加
>>> aList
['ab', 'cd', 'ef', 'gh']
```

`删除`列表元素/列表本身：

```python
>>> del aList[2]        #根据下标删除
>>> aList
['ab', 'cd', 'gh']

>>> aList.remove('cd')  #如果知道元素内容，则直接删除该元素
>>> aList
['ab', 'gh']

>>> del aList    #删除列表本身，并不需要显示调用，在程序结束时自会收回内存的
>>> aList
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'aList' is not defined
```

##12 列表适用的操作符

###12.1 标准类型操作符

`比较`运算：两个列表的元素**顺序**比较，**直到**有一方的元素胜出。

###12.2 序列类型操作符

切片操作符`[]`、成员操作符`[not] in`、连接操作符`+`、重复操作符`*`都适用。

有几个要注意的点：

```python
>>> alist = [1, 2]

>>> alist[1] = [1, 2]     #对某一索引赋值，则新值代替该元素
>>> alist
[1, [1, 2]]

>>> alist[:1] = [1, 2]    #对某一范围赋值，则新值直接作为元素覆盖原来范围
>>> alist
[1, 2, [1, 2]]

>>> alist + [3, 4]
[1, 2, [1, 2], 3, 4]

>>> alist        #连接操作符并不在原对象上进行修改，且只能和列表对象连接
[1, 2, [1, 2]]

>>> alist.extend('abc')    #extend()函数将参数的每个元素作为原对象的元素，参数为可迭代对象
>>> alist
[1, 2, [1, 2], 'a', 'b', 'c']

>>> alist.append('abc')    #append()函数将参数整体作为最后一个元素
>>> alist
[1, 2, [1, 2], 'a', 'b', 'c', 'abc']
```

###12.3 列表解析

列表**没有**自己专门的操作符，但是有自己专属的`列表解析`：

```python
>>> [ i * 2 for i in [8, -2, 5] ] 
[16, -4, 10] 
>>> [ i for i in range(8) if i % 2 == 0 ] 
[0, 2, 4, 6]
```

##13 列表适用的内建函数

###13.1 标准类型函数

`cmp()`也适用。逐元素比较，直到比出大小(数字永远小于字符串)。

###13.2 序列类型函数

{% highlight python linenos %}
len()           #返回元素个数。
max()/min()     #返回最大/最小元素值。包含复杂对象时，返回不一定准确。
sorted()        #返回排序的列表。字符串排序按照字典序。
reversed()      #返回逆序的迭代对象

enumerate()
zip()           #同序列中的功能。

sum()           #求和。只对整数列表，而且还有个默认参数。
list()/tuple()  #将一个可迭代对象转换成一个列表/元组对象。（生成一个新对象）
{% endhighlight %}

###14 列表类型的内建函数（方法）

**没有**用于列表的专用内建函数，但是列表类型有自己的类**方法**。

列表是**可变**类型，这些方法直接在**原列表上**进行修改，所以没有返回值：

{% highlight python linenos %}
list.append(obj)    #向列表中添加一个对象obj 
list.count(obj)     #返回一个对象obj在列表中出现的次数 
list.extend(seq)    #把序列seq的元素作为列表元素添加到列表中 
list.index(obj, i=0, j=len(list))   #返回第一个值为obj的下标，不存在则引发ValueError异常 
list.insert(index, obj) #在索引值为index的位置插入对象obj 
list.pop(index=-1)  #删除并返回指定位置的对象，默认是最后一个对象 
list.remove(obj)    #从列表中删除对象obj 
list.reverse()      #原地翻转列表 
#重排序列表。如果func和key参数指定，则按指定方式比较各元素；如果reverse标志被置为True，则列表以反序排列
list.sort(func=None,key=None, reverse=False)
{% endhighlight %}

##15 列表的特殊特性

列表有`容器`和`可变`的特性，可以用来实现其他数据结构——**栈、队列**。

下面给出`队列`代码—— **先进先出**： 

{% highlight python linenos %}
#!/usr/bin/env python 

'my queue'

queue = []

def enQ():  #入队
    queue.append(raw_input('Enter new string: ').strip())

def deQ():  #出队
    if len(queue) == 0:
        print 'Cannot pop from an empty queue!'
    else:
        print 'Removed [', `queue.pop(0)`, ']'    #弹出第一个元素

def viewQ():
    print queue

CMDs = {'e': enQ, 'd': deQ, 'v': viewQ}  #字典

def showmenu(): 
    pr = """
[E]nqueue 
[D]equeue
[V]iew 
[Q]uit 
Enter choice: """

    while True:
        while True:
            try:
                choice = raw_input(pr).strip()[0].lower()   #一个语句，多重计算
            except (EOFError, KeyboardInterrupt, IndexError):   #分别捕获^D(EOF)、^C(中断退出)、输入为空或只有空字符 时导致的异常 
                choice = 'q'

            print '\nYou picked: [%s]' % choice
            if choice not in 'devq':    #判断成员
                print 'Invalid option, try again'
            else:
                break

        if choice == 'q':
            break

        CMDs[choice]()

if __name__ == '__main__':
    showmenu()
{% endhighlight %}

##16 元组

和列表有很多相似性，不同点在于：元组用圆括号`()`包围；元组是`不可变`类型。

`创建`元组——直接赋值、工厂函数：

```python
>>> atuple = (12, 'abc', [34, 'def'])
>>> atuple
(12, 'abc', [34, 'def'])

>>> btuple = (123, )  #只有一个元素时要加逗号表示一个元组，否则表示一个int
>>> btuple
(123,)

>>> tuple('foo')      #参数为可迭代对象
('f', 'o', 'o')
```

**访问**元素：下标[]或者切片[:]。   
**更新**元组：当变量被赋与其它元组时，其实是生成了一个**新**的元组对象。   
**删除**元组：删除元组元素是不可能的，可以调用`del`来删除**整个**元组。

##17 元组适用的操作符和内建函数

`标准`类型操作符：`比较`运算符、`逻辑`运算符都适用。   
`序列`类型操作符：切片`[]`、成员`[not] in`、连接`+`、重复`*`都适用。   
`内建`函数：`cmp()`函数、`序列类型`函数仍然适用。

> sorted()内建函数返回的是排序好的**列表**。

**没有**专门用于元组的操作符和内建函数，元组类型只有两个`方法`——`统计`和`查找`：

{% highlight python linenos %}
tuple.count(obj)                     #返回一个对象obj在元组中出现的次数
tuple.index(obj, i=0, j=len(tuple))  #返回第一个值为obj的下标，如果不存在则引发ValueError异常 
{% endhighlight %}

##18 元组的特殊性

###18.1 不可变性的影响

切片操作**不能**作为左值被赋值；被传给其他函数时，可以确保数据不被修改。

###18.2 元组的一个“可变性”

如果元组里面有**可变类型的元素**，那个这个元素的内容还是可以改变的：

```python
>>> t1 = ([1,2], 3)
>>> t1[0][1] = [4, 'abc']   #元组的列表元素被修改
>>> t1
([1, [4, 'abc']], 3)
```

###18.3 默认集合类型

没有明确符号定义的，只是用逗号隔开的对象，**默认**是一个元组类型：

```python
>>> 1, 3 < 2, 4    #逗号优先级小于比较符号，不加括号带来的副作用
(1, False, 4)
>>> (1, 3) < (2, 4)
True
>>> def foo():
...    return rt1, rt2, rt3    #实际返回的是一个元组
```

###18.4 单元素元组

单元素的元组创建时，应该在这个元素后面加一个**逗号**。

###18.5 字典的关键字

字典的原理就是**哈希表**，其**键**应该是唯一的，所以键必须是不可变类型。

**列表VS元组**

`不可变`类型：需要把数据传递给一个陌生函数时，应该使用元组，防止数据被修改。   
`可变`类型：在管理动态数据集时，需要不定期的增删改元素。   
`转换`：list()和tuple()可以将对象在列表和元组之间转换。

##19 序列相关模块

与序列类型相关的模块：

{% highlight python linenos %}
数组                 #一种受限制的可变序列类型，要求所有的元素必须都是相同的类型
copy                #提供浅拷贝和深拷贝的能力
operator            #包含函数调用形式的序列操作符，比如operator.concat(m,n)就相当于连接操作(m+n)
re                  #Perl风格的正则表达式查找(和匹配);见第 15 章
StringIO/cStringIO  #把长字符串作为文件来操作，比如read()、seek()函数等，C版的更快一些，但是不能被继承
textwrap            #用作包裹/填充文本的函数，也有一个类
types               #包含Python支持的所有类型
collections         #高性能容器数据类型
{% endhighlight %}

##20 拷贝Python对象

`拷贝`只发生在**容器**类型中。

`浅拷贝`的例子：

```python
>>> aList = ['a', ['aa', 100]]
>>> bList = aList[:]    #切片，返回一个新列表对象
>>> cList = list(aList) #通过工厂函数来复制列表

>>> [id(x) for x in aList, bList, cList]   #打印三个列表id值，都不一样
[158368652, 158358316, 158212652]

>>> for xList in aList, bList, cList:      #打印三个列表的元素值，都一样
...     [id(x) for x in xList]
... 
[3073138104L, 157929228]
[3073138104L, 157929228]
[3073138104L, 157929228]
```

> 浅拷贝时，只创建了一个同类型的新对象（类型、元素数目、值都一样），而其中的元素仍指向了**原对象**的元素。如果更新某一个对象中的**可变**类型，会**影响**到其他的对象。

`深拷贝`的意思则显而易见：

```python
>>> import copy

>>> dList = copy.deepcopy(aList)  #模块里的深拷贝函数
>>> eList = copy.copy(aList)      #模块里的浅拷贝函数

>>> [id(x) for x in aList, dList, eList]    #仍然生成两个新的列表对象
[158368652, 158368140, 158215884]

>>> for xList in aList, dList, eList:
...     [id(x) for x in xList]
... 
[3073138104L, 157929228]
[3073138104L, 158358348]  #第一个元素都是指向同一个字符串对象，而深拷贝的时候，第二个列表元素则为新创建的列表对象
[3073138104L, 157929228]
```

总结：

- `浅拷贝`有三种：①切片[:]，②工厂函数list()、dict()等、③copy()函数。
- **元组**浅拷贝时甚至不生成新对象，直接把被复制对象的**引用**赋值给新变量。
- `深拷贝`时，创建一个新对象，其中的**不可变**类型元素仍指向被复制对象的相应元素，而**可变类型**元素则为新创建对象。如果元组中只包含**非容器**类型的元素，则仍然进行浅拷贝。

##21 序列类型小结

- 序列：顺序存储——字符串、列表、元组。
- 操作符：连接+、重复*、切片[:]、成员[not] in。
- 方法：seq.method()。 
