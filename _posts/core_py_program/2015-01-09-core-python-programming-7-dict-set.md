---
layout: post
title: "Python核心编程--学习笔记--7 字典和集合"
description: "Python核心编程学习笔记系列文章"
category: tech
tags: [python, python核心编程]
---
{% include JB/setup %}

本章介绍Python语言中的字典和集合类型，包括操作符、工厂函数、内建函数与方法。

<!--break-->

---

##1 字典

Python中唯一的`映射`类型——`键key`直接映射到`值value`。

字典是`容器`类型，其对象是**可变**的。字典中的数据是**无序**排列的。

`创建`字典——直接赋值`{}`、工厂函数`dict()`、内建方法`fromkeys()`：

```python
>>> dict1={}
>>> dict2={'name':'earth','port':80}
>>> dict1, dict2
({}, {'name': 'earth', 'port': 80})

>>> dict3=dict(['ab','cd']) #要求参数中列表元素长度为2
>>> dict3
{'a': 'b', 'c': 'd'}

>>> dict4={}.fromkeys(['ab','cd'])     #对应同一值，默认对应None
>>> dict5={}.fromkeys(('ab','cd'), -1)
>>> dict4,dict5
({'ab': None, 'cd': None}, {'ab': -1, 'cd': -1})
```

`访问`字典元素——dict[key]、dict.method()：

```python
>>> d={'a':1, 'b':2, 'c':3}

>>> d['b']    #直接通过dict[key]访问值
2
>>> d['d']    #如果key不存在则报错
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'd'

>>> 'a' in d        #判断dict中是否有key
True
>>> d.has_key('c')  #用方法来判断是否有key，不再推荐使用
True

>>> d.values(), d.keys(), d.items()   #dict方法，分别返回 键、值、键值对 组成的无序列表
([1, 3, 2], ['a', 'c', 'b'], [('a', 1), ('c', 3), ('b', 2)])

>>> for key in d:   #直接用迭代器访问字典，迭代的是字典的键
...     print key
... 
a
c
b

>>> print '%(a)d %(b)d %(c)d' % d   #字典简化了print的格式化符
1 2 3
```

`添加`新元素/`修改`已存在元素——dict[key]=new_value：

```python
>>> d['d'] = 4    #不存在的键，则添加键值对
>>> d['a'] = -1   #存在的键，则覆盖原来的值
>>> d
{'a': -1, 'c': 3, 'b': 2, 'd': 4}
```

`删除`字典元素和字典：

{% highlight python linenos %}
del dict[key]   #删除键为“key”的条目 
del dict        #删除整个dict字典 

dict.pop(key)   #删除并返回键为key的条目
dict.clear()    #删除dict中所有的条目，成为空字典 
{% endhighlight %}

##2 字典适用的操作符

###2.1 标准类型操作符

`比较`运算符、`逻辑`运算符 同样适用。

字典的`比较`操作并不常用，比较流程为：

- ①比较长度，长度大的字典大。
- ②长度一样时，比较键，键比较时的顺序和keys()方法返回的顺序一样。
- ③键一样时，按照键的顺序比较相应的值。
- ④之前的比较都一样，则两个字典相同。

###2.2 字典操作符

键`查找`操作符`[]`、键`成员`操作符`[not] in`。

##3 字典适用的内建函数和工厂函数

###3.1 标准类型函数

`type()`、`str()`、`cmp()`、`len()`同样适用。cmp()的比较过程同比较操作符。

###3.2 字典相关的函数

`dict()`——参数可以是**空/可迭代的/另一个字典**：

```python
>>> dict()  #生成空字典
{}

>>> dict( zip(('x', 'y'), (1, 2)) ) #zip返回一个列表，即一个可迭代对象，其中每个可迭代的元素必须成对出现
{'y': 2, 'x': 1}

>>> dict({'x':1})    #参数为另一个字典，即浅拷贝，效率不高，不要使用这种方法
{'x': 1}

>>> {'x':1}.copy()   #高效率的浅拷贝
{'x': 1}

>>> dict(ab=1,cd=2)  #关键字参数
{'ab': 1, 'cd': 2}
```

`hash(obj)`——返回obj哈希值，可用于判断是否能作为字典的键。如果不可哈希则报错。

##4 字典的内建方法

{% highlight python linenos %}
dict.items()    #返回一个包含字典中(键, 值)对元组的列表 
dict.keys()     #返回一个包含字典中键的列表  
dict.values()   #返回一个包含字典中所有值的列表
dict.iter*()    #方法iteritems(),iterkeys(),itervalues()，返回一个迭代子而非列表，当元素很多时可以节省内存。

dict.copy()                     #返回字典(浅拷贝)的一个副本 
dict.fromkeys(seq, val=None)    #创建并返回一个新字典，以seq中的元素为键，val为所有键对应的初始值(默认为None) 

dict.has_key(key)                   #如果键存在，返回True。推荐使用成员操作符。 
dict.get(key, default=None)         #读取key对应的值，如果不存在此键，则返回default的值(默认值为None)。
dict.setdefault(key, default=None)  #如果不存在key键，由dict[key]=default为它赋值并返回值；存在则直接返回值 
dict.update(dict2)                  #将字典dict2的键-值对添加到字典dict，重复的键则覆盖dict中原值 

dict.clear()                #删除字典中所有元素 
dict.pop(key[, default])    #如果键存在，删除键值对并返回值；如果key键不存在，且没有指定default，则引发KeyError异常
dict.popitem()              #删除并返回第一个键值对，如果字典为空则产生错误。
{% endhighlight %}

##5 字典的键

**一个键只能对应一个值**。

键必须是**可哈希**的，不可变类型——**字符串**、**数字**、只包含**不可变类型**的元组——都可哈希。

> 值相同的数字哈希值也相同，hash(1) == hash(1.0)。

实现了`__hash__()`特殊方法的`类`，如果该方法返回一个**不可变**类型，则也是可哈希的。解释器**调用**哈希函数，根据字典中键的哈希值来计算数据**存储**的位置。

##6 集合类型

集合对象的成员是一组**无序**的**可哈希**的值，成员可以用作字典的键。

分为`可变`集合和`不可变`集合，可变集合**不可**哈希。

支持`[not] in`检查成员、`len()`得到元素个数、`for迭代`集合成员。**不支持**索引、切片。

Python中的集合和数学上的集合差不多，操作符如下：

|数学符号 |Python符号|说明|
|---|---|---|
|∈ |in    |是集合成员|
|∉ |not in|不是集合成员|
|= |==    |等于|
|≠ |!=  |不等于|
|⊂ |<   |真子集|
|⊆ |<=  |子集|
|⊃ |>   |严格超集|
|⊇ |>=  |超集|
|∩ |&   |交集|
|∪ |I   |并集|
|- |-   |差补|
|△ |^   |对称差(A^B = AIB - A&B)|

`创建`集合类型——**只能**用工厂函数`set()`和`frozenset()`：

```python
>>> s=set('abc')            #可变集合，传入一个序列或者可迭代的对象。
>>> s                                 
set(['a', 'c', 'b'])                  

>>> fs=frozenset([1,2,3])   #不可变集合
>>> fs                                
frozenset([1, 2, 3]) 
```

`访问`集合成员——检查成员、遍历成员：

```python
>>> 'c' in s       #检查成员
True

>>> for i in fs:   #遍历成员
...     print i
... 
1
2
3
```

`更新`集合——使用**集合内建**的方法和操作符，只能对**可变**集合添加或删除元素：

```python
>>> s.add(321)     #可变集合添加元素
>>> s
set(['a', 321, 'c', 'b'])

>>> fs.remove(1)   #不可变集合删除元素，错误
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'frozenset' object has no attribute 'remove'
```

`删除`集合——**del set**即可。

##7 集合适用的操作符

###7.1 标准类型操作符

- `成员`操作符： in、not in
- `集合`等价： ==、!=（两个集合成员**完全**相同时集合相同，**不区分**可变与不可变类型）
- `子集/超集`： 真子集<、子集<=、真超集>、超集>=

###7.2 集合类型操作符

适用于**所有**集合——并集`|`、交集`&`、差补`-`、对称差`^`，返回一个**新**集合：

```python
>>> s1=set([1,2])
>>> s2=set([2,3])
>>> fs=frozenset([2,3])

>>> s1|s2, s1.union(s2)          #s1和s2的交集，分别使用符号和方法
(set([1, 2, 3]), set([1, 2, 3]))

>>> s1&s2, s1.intersection(s2)   #交集
(set([2]), set([2]))

>>> s1-s2, s1.difference(s2)     #差补，即属于s1但是不属于s2的元素集合
(set([1]), set([1]))

>>> s1^s2, s1.symmetric_difference(s2)    #对称差，即s1|s2 - s1&s2
(set([1, 3]), set([1, 3]))

>>> s1|fs, fs|s1                 #可变与不可变类型集合运算，返回类型与左边的类型相同
(set([1, 2, 3]), frozenset([1, 2, 3]))
```

仅适用于**可变**集合——复合运算 `|=`、`&=`、`-=`、`^=`，直接应用于左边的集合，没有返回值：

```python
>>> s1 = set([1,2])
>>> s2 = set([1,2])
>>> s3 = set([2,3]) ###原始集合。由于是在原集合上直接修改，下面的每次运算都需重新赋值，以下省略而已。

>>> s1 |= s3        #求并集并将新集合赋值给左值，没有返回值。分别使用 符号和方法。
>>> s2.update(s3)
>>> s1,s2
(set([1, 2, 3]), set([1, 2, 3]))

>>> s1 &= s3        #交集
>>> s2.intersection_update(s3)
>>> s1,s2
(set([2]), set([2]))

>>> s1 -= s3        #差补
>>> s2.difference_update(s3)
>>> s1,s2
(set([1]), set([1]))

>>> s1 ^= s3        #对称差
>>> s2.symmetric_difference_update(s3)
>>> s1,s2
(set([1, 3]), set([1, 3]))
```

##8 集合适用的内建函数

###8.1 标准类型函数

`len()`——返回集合成员个数。

###8.2 工厂函数

`set()`、`frozenset()`——生成一个集合。参数必须是**可迭代**的——序列、迭代器、支持迭代的对象（文件或字典）。

##9 集合的内建方法

适用于**所有**集合的，之前也讲述过：

{% highlight python linenos %}
s.issubset(t)             #符号<= 如果s是t的子集，则返回True  
s.issuperset(t)           #符号>= 如果t是s的超集，则返回True 
s.union(t)                #符号|  返回一个新集合，该集合是s和t的并集 
s.intersection(t)         #符号&  返回一个新集合，该集合是s和t的交集
s.isdisjoint(t)           #如果s和t没有交集，则返回True 
s.difference(t)           #符号-  返回一个新集合，该集合成员是s的成员，但不是t的成员 
s.symmetric_difference(t) #符号^  返回一个新集合，该集合是s或t的成员，但不是s和t共有的成员 
s.copy()                  #返回一个新集合，它是集合s的浅拷贝。比工厂函数快
{% endhighlight %}

仅适用于**可变**集合，有之前讲述的，也有一些新方法： 

{% highlight python linenos %}
s.update(t)                      #符号|= s为s和t的并集
s.intersection_update(t)         #符号&= s为s和t的交集 
s.difference_update(t)           #符号-= s中的成员是属于s但不包含在t中的元素 
s.symmetric_difference_update(t) #符号^= s中的成员是属于s或t，但不属于s和t共有 
s.add(obj)                       #在集合s中添加对象obj 
s.remove(obj)                    #从集合s中删除对象obj，如果obj不存在，则引发KeyError错误 
s.discard(obj)                   #从集合s中删除对象obj，如果obj不存在也不报错
s.pop()                          #删除集合s中的任意一个对象，并返回它 
s.clear()                        #删除集合s中的所有元素 
{% endhighlight %}

操作符和方法：当用**操作符**时，操作符两边的操作数必须是**集合**。在使用**内建方法**时，对象也可以是**迭代类型**的。
