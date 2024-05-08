##  TS快速上手

### 一、类型

ts类型和js的类型基本一致，基础数据类型包括string、number、null、undifined、symbol、bigint、boolean，引用类型包括array、object

#### 1.1any类型

any类型就是对类型不做任何限制，不推荐使用any类型，因为any类型会导致失去ts的强约束以及代码提示功能

#### 1.2字面量类型

```ts
const a = "hello"
let b:"hello"
```

代码中的两种情况都会把该变量声明为字面量类型，因为const声明的为常量不可修改，所以变量a被ts推导为hello字面量，变量b则是我们自己声明它的类型就只能是hello不可以是其他字面量

#### 1.3联合类型

联合类型是一种将数个类型拼接一起的类型，可以进行自由的组装，每个类型之间用|分割开，举例如下

```ts
let a = string | number | boolean
```

#### 1.4数组类型

数组类型的声明方式有两种，第一种方式是直接使用数组中的值的类型后拼接数组，下面的例子声明了一个数组中都是number

```ts
let a: number[]
```

第二种方式是利用Array来进行声明

```ts
let a:Array<number>
```

数组也可以使用联合类型，例如

```ts
let a = (string | number)[]
let a:Array<string | number>
```

数组在ts自行推导类型时会有个特性，在我们没有对数组的类型进行声明直接书写时，例如下面这种情况

```ts
let a = []
```

正常情况下，a会被推导为内容为any的数组，但是如果我们的ts配置中strict为true并且noImplicitAny为false的情况下，数组会被推导为never类型的数组

##### 1.4.1元组类型

元组类型是数组类型的一种特殊类型，它强制规定了数组的长度和每一项的值的类型，下面的例子声明了一个变量a，他的数组长度为2，并且第一项是number类型，第二项是string类型

```ts
let a:[number,string]
```

#### 1.5函数类型

函数的类型声明有两种方式，一个是function的写法，一个是箭头函数的写法

```ts
function add(a: number, b: number): number {
  return a + b;
}
const add_: (a: number, b: number) => number = (a, b) => {
  return a + b;
};
const add_ = (a: number, b: number): number => {
  return a + b;
};
```

函数的参数后可以加入?代表为可选参数，如果有必填参数和可选参数，可选参数不能为第一个参数

```ts
function sum(a:number,b:number,c?:number):number {
  return c? a+b-c:a+b
}
```

当我们给参数默认值时，ts会将其转化为可选参数，含义和可选参数是一致的

```ts
function sum(a:number,b:number,c=0):number {
  return c? a+b-c:a+b
}
```

##### 1.5.1泛型

当我们在函数声明时不清楚函数的类型应该是什么时，可以使用泛型，进行一个类型展位，由使用的时候明确函数的类型是什么

```ts
function add<T>(a:T):T {
  return a
}
// 使用时
add<string>('123')
```

#### 1.6对象字面量类型

```ts
let a:{
  id:number,
  name: string,
  sax: '男'｜'女'
}
```

#### 1.7自定义类型

##### 1.7.1类型别名

> 类型别名就是声明一个变量表示一个类型，方便类型的复用

类型别名的书写格式为 type 类型别名 = 类型

```ts
type A = string
let a: A
```

##### 1.7.2接口

> 接口是面向对象的概念，一般用于定义对象类型

接口书写格式为interface 接口名 {/\*属性名：属性类型\*/}

#### 1.8交叉类型

交叉类型就是将多个类型合并为一个类型

```ts
type a = {
  id: number
}
type b = {
  age: number
}
type c = a & b
```

