## 一、API学习

### 全局对象global

global等同于浏览器中的window，是node环境中的顶层全局对象，global上的属性可以直接进行使用

<img src="E:\study\yue-studyNotes\node\assets\1712628630569-5566426b-3815-4c81-9d49-aeaa4a495c60.png" style="zoom:67%;" />

常用属性：

- setTimeout
- setInterval
- clearTimeout
- clearInterval
- setImmediate

- 进行一个立即执行的定时器，执行时机优先于setTimeout(fn,0)

- clearImmediate
- console
- __dirname **并非global属性**

- 获取当前文件所在文件夹路径

- __filename **并非global属性**

- 获取当前文件路径

- Buffer

- 类型化数组

- process

- 获取进程(命令行)相关信息
  - cwd()
    - 获取当前命令行的执行路径

  - exit()
    - 强制退出当前node进程，可以传入消息码作为参数

  - argv
    - 获取命令行中所写的全部参数

  - platform
    - 获取当前的操作系统

  - kill()
    - 杀死一个进程

  - env
    - 获取环境变量


## 二、模块化细节

### 2.1模块的查找

#### 2.1.1路径的查找

模块的查找在require函数中可以输入绝对路径和以./或../开头的相对路径，但是最终都会被转化为绝对路径

在输入类似于require('abc')这样的相对路径会遵循如下规律

- 先查找看看是不是node的内置模块，例如fs、path等
- 检查当前目录中的node_modules
- 检查上级目录中的node_modules
- 转化为绝对路径
- 加载模块

#### 2.1.2后缀名

在模块的导入时如果省略后缀名，node会自动进行后缀名的补全

- 先找js文件
- 再找json文件
- 再找node文件
- 最后找mjs文件

#### 2.1.3文件名补全

如果在模块导入时没有输入文件名，会先去补全后缀名进行匹配都找不到会进行文件名补全

- 先运行后缀名补全去查找文件
- 之后运行文件名补全找index.js
- 如果导入的是第三方包会去查看package.json中的main字段所指向的文件，默认为index.js

### 2.2module对象

记录当前模块的信息

![img](E:\study\yue-studyNotes\node\assets\1712736757845-921344d5-8b87-415c-a2bb-213278bb2ff7.png)

module中储存本模块的模块信息，例如模块路径和文件路径，以及是否加载完成，还有paths中会储存查找路径，一层一层的向上查找

### 2.3require函数

<img src="E:\study\yue-studyNotes\node\assets\1712736857765-fa454db6-e96b-4e2d-a7f9-94f49feca529.png" alt="img" style="zoom:67%;" />

require函数中主要包含一些模块的处理和缓存信息

- resolve 

- 将require中传入的路径转化为绝对路径

- main

- main就是调用require的这个模块的信息

- extensions

- 这个记录着不同的尾缀对文件处理所要用的不同的方法

- cache

- cache中记录着模块导入的缓存，模块的文件路径为key，模块信息在其中

每个文件的执行其实都是在require内部的一个函数内，该函数内定义了一个方法，和module，类似于如下

```plain
function require() {
// 处理文件路径
// 查找缓存
const module = {
    export:{}
}
const export = module.export
function run(module,export,require,__dirname,__firname) {
 // 要加载的模块
 return module.export
}
run.call(export,module,export,require,__dirname,__firname)
}
```

这也是为什么最开始的时候module.export和this和export指向同一个对象

### 2.4node中的es模块规范

文件名后缀需要是.mjs或者在package.json中将type的值设定为module

## 三、基本内置模块

### 3.1 os模块 —处理操作系统

- EOL

- 处理一行结束的分隔符，根据不同的操作系统，生成不同的分隔符

- arch()

- 生成操作系统的架构名 x64  x32等

- cpus()

- 获取cpu每个核的信息

- freemem()

- 获取当前空闲内存量

- homedir()

- 获取用户目录

- hostname()

- 获取主机名

- tmpdir()

- 获取操作系统的临时目录

### 3.2 path模块

- basename()

- 获取文件的名字

- sep

- 路径的分隔符，mac是/，win是\

- delimiter

- 分隔符，这个主要指的是；或：等，常用于环境变量的分割

- dirname()

- 获取目录

- extname()

- 获取文件的后缀名

- join()

- 路径的拼接

- normalize()

- 将文件路径进行规范化

- relative()

- 得到一个，第二个参数相对第一个参数的相对路径

- resolve()

- 获得绝对路径

### 3.3 url模块

url模块是一个构造函数，会生成一个对象，对传入的url链接进行解析获得如下信息

- origin 

- url的域名

- protocol

- 协议

- host

- 地址

- pathname

- 路径

- searchParams

- 获得对象参数信息
- 使用方法类似于map，可以用get、has等方法

### 3.4util模块

- callbackify()

## 四、文件I/O

### 4.1fs核心模块

fs模块的操作一般都为异步的，因为文件的读写是向网络请求一样极其消耗性能的，所以在使用fs模块是一般尽量避免使用同步操作API，常用API如下

- readFile(path, options, callback(err,result))
  - path要求是一个绝对路径
  - options可以是一个对象，或是一个字符串直接指明得到的result的数据格式
  - callback回调函数第一个参数是错误信息，第二个参数是结果，结果正常是一个Buffer
- readFileSync(path, options)
  - 方法是同步的
  - path要求是一个绝对路径
  - options可以是一个对象，或是一个字符串直接指明得到的result的数据格式（utf-8）
- writeFile(path, content, options)
  - path要求是一个绝对路径
    - 路径中文件不存在会直接创建，但文件夹不存在会发生报错
  - content是文件内容
  - options可以是一个对象，或是一个字符串直接指明得到的result的数据格式（utf-8）

- state(path)

  - 获取文件和目录的状态信息，可获取文件的创建修改时间以及大小

  - path要求是一个绝对路径

  - 属性信息

    <img src="E:\study\yue-studyNotes\node\assets\image-20240411163726291.png" alt="image-20240411163726291" style="zoom:80%;" />

    - size 文件占用大小
    - atime 上次访问的时间
    - mtime 上次修改的时间
    - ctime 上次状态修改的时间
    - birthtime 文件生成的时间
    - birthtime 文件生成的时间

  - 原型链方法

    - isDirectory()   是否是文件夹
    -  isFile()    是否是文件 

- readdir(path)

  - 获取文件夹内的文件和文件夹数组列表，数组中存的文件和文件夹的名称
  - path要求是一个绝对路径

- makdir(path)

  - 创建一个文件夹
  - path要求是一个绝对路径

- unlink(path)

  - 删除文件
  - path要求是一个绝对路径

### 4.2文件流

流是数据的流动，从一个地方缓缓流动到另一个地方，**流是有方向的**

#### 4.2.1为什么需要流？

因为两端的数据规模不一致，例如硬盘到内存，硬盘中要读取的数据的大小可能远远大于内存，所以就需要流来一点一点获取

两端数据处理速度能力不一致，也需要用到流来协助处理

#### 4.2.1可读流

> 数据从源头流向内存

fs.createReadStream(path, options)

- path要求是一个绝对路径
- options
  - encoding - 编码格式，默认为buffer
  - start - 起始字节
  - end - 结束字节
  - highWaterMark - 每次读取的字节数量，默认为64*1024
  - autoClose - 读完后是否自动关闭通道，默认为true
- 返回一个ReadStream子类
  - rs.on(事件名,  处理函数)
    - 事件枚举
    - open - 文件打开
    - error - 文件读取报错
    - close - 文件关闭触发
      - 可通过rs.close手动关闭
      - 文件读取完毕通道关闭也会触发
    - data
      - 没得到一部分流数据会触发一次
      - 只有事件注册了之后才会开始进行数据读取
    - end
      - 数据读取完毕就会触发
    - pause
      - 读取通道暂停触发
    - resurme
      - 读取通道恢复触发
  - rs.pause()
    - 暂停读取
    - 会触发pause事件
  - rs.resurme()
    - 恢复读取
    - 会触发resurme事件
  - rs.pipe(WriteStream)
    - 创建一个通道，将可写流和可读流连接起来
    - WriteStream为一个可写流
    - 返回值为WriteStream - 传入的参数



#### 4.2.2可写流

> 数据从内存流向源头

fs.createWriteStream(path,options)

- path是一个绝对路径
- options可选的选项
  - flags - 操作文件的方式，a为新增
  - encoding - 编码方式，默认为utf-8
  - start - 起始字节
  - highWaterMark - 每次写入的字节数量
  - autoClose - 读完后是否自动关闭通道，默认为true
- 返回一个WriteStream子类
  - ws.on(事件名，处理函数)
    - 事件枚举
    - open
    - error
    - close
    - dran
      - 写入队列清空时会触发该事件
  - ws.write(data)
    - data
      - 要求为字符串或者bufffer
    - 会返回一个布尔值
      - true表示写入通道没有排满，可以继续写入无需排队
      - false表示写入通道排满了，需要排队
  - ws.end(data)
    - 关闭写入通道，可以传入data进行最后一次写入

## 五、网络net模块

net模块主要用于通信，可以进行进程间的IPC通信以及网络之间的TCP/IP通信

### 5.1客户端

net.createConnection(options)

- options 客户端通道配置项
  - host 服务端地址
  - port 端口号 必须要
- 返回一个socket对象是一个双工流（可读流、可写流）

### 5.2服务端

net.createServer()

- 返回一个server对象

server对象属性

- server.listen(port)
  - 监听一个端口
- server.on(事件名,回调函数)
  - listening - 在调用完server.listen(port)绑定端口后触发
  - connection - 有客户端访问服务端简历新连接后触发
    - 回调函数有内置参数socket，是一个双工流

## 六、net模块的上层模块http模块

http模块是net模块的封装，让我们不用去组装消息格式和关注socket处理

### 6.1客服端

http.request(url,[ options, callback])

- url - 是一个http链接
- options
  - method - 请求方法
- callback - 回调函数
  - res 可读流为参数
- 返回一个writeStreame可写流

需要进行请求体的写入和关闭才可以正常的发送请求

### 6.2服务端

http.createServer(options, requestListener)

- options 可选配置项
- requestListener回调函数，有两个参数
  - incomingMessage 一个可读流
  - serverResponse 一个可写流
- 返回http.server实例

132465

## 七、事件循环

在node中，事件循环的处理比较特殊，在运行完主线程代码后，会先去优先清空nextTick队列中的内容，然后是去执行Promise中的内容，后续会进行一个小循环，定时器、pill和check（setImmediate内容）
