## Node

### 一、命令行中常用的命令

###### 切换盘

- win
  - d:

###### 查看当前文件夹下文件

- win
  - dir
- mac
  - ls

###### 切换工作目录-cd

### 二、Buffer 缓冲区

> Buffer是一个类似于数组的对象，用于表示固定长度的字节序列

- 特点
  - 大小固定
  - 每个元素的大小为一字节
  - 性能比较好，可以直接对计算机内存进行操作

- 使用

```js
// 通过alloc直接分配创建，会将内存空间清零
const buffer1 = Buffer.alloc(10)
// 通过allocUnsafe分配，不会清空内存中的数据
const buffer2 = Buffer.allocUnsafe(10000)
// from将一个数据转化为Buffer
const buffer3 = Buffer.from('hello node')
```

- 操作和转化

```js
	const buffer = Buffer.from('hello node')
  //可以通过toString方法转化为字符串
  buffer.toString()
	//可以通过中括号的方式对buffer中的数据进行读取和修改
	buffer[0]
```

- 溢出和中文

buffer中最多储存8位2进制，也就是最多储存的数据是255，大于这个数的会被舍弃，例如361 => 0001 0110 1001 最后只会储存0110 1001

### 三、fs模块

###### 1、文件写入

```js
const fs = require('fs')
fs.writeFile('./one.txt', '小岳爱学习', error => console.log(error))
```

###### 2、文件尾部追加写入

```js
const fs = require('fs')
fs.appendFile('./one.txt', '还爱打游戏', error => console.log(error))
```

###### 3、文件流式写入

```js
const fs = require('fs')
const ws = fs.createWriteStream('./log.txt')
ws.write('这是第一行\n')
ws.write('这是第二行\n')
ws.close()
```

###### 4、文件的读取

- 普通读取
  - readFile
- 同步读取
  - readFileSync
- 流式读取
  - createReadStream

######  5、文件的复制

```js
const fs = require('fs')
const rs = fs.createReadStream('./one.txt')
const ws = fs.createWriteStream('./one-1.txt')
rs.pipe(ws)
```

###### 6、文件重命名和移动

```js
const fs = require('fs')
// 重命名
fs.rename('./src/原名字.txt','./src/新名字.txt')
// 移动
fs.rename('./src/原名字.txt','./原名字.txt')
```

###### 7、文件的删除

```js
const fs = require('fs')
// 方法1
fs.unlink('./src/原名字.txt')
// 方法2
fs.rm('./src/原名字.txt')
```

###### 8、文件夹操作

- 创建
  - mkdir
- 读取
  - readdir
- 删除
  - rmdir

###### 9、查看资源状态

```js
const fs = require('fs')
fs.stat('./src/test.mp4', (err,data) => {
  if(!err) console.log(data)
})
```



### 四、path模块

###### 1、拼接规范的绝对路径

path.resolve(__dirname, './index.html')

###### 2、解析路径，返回名字，后缀符等信息

path.parse





