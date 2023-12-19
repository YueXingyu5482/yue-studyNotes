## React

### 一、Jsx的使用

```jsx
function App() {
  return (
  	<div>Hello Word</div>
  )
}
```

#### 1.1基础语法

jsx描述页面时，要遵循以下规则

- 跟元素只能有一个
- JSX中使用javaScript表达式要写在{}中
- 属性值指定为字符串字面量，或在属性值中插入一个javaScript表达式
- style对应样式对象，class要写作className
- 注视需要写在花括号中
- JSX允许在模版中插入数组，数组会自动展开所有成员

```jsx
function MyApp() {
        const text = 'hello world'
        const rid = '345'
        const arr = ['第一行','第二行','第三行']
        return (
          <>
            <div>{text}</div>
            <div id="123" rid= {rid}></div>
            <div className='test' style={{color: red}}>红色的</div>
            {/*z这样写注释*/}
            {arr.map((i,index)=><div key={index}>{i}</div>)}
          </>
        )
      }

export default MyApp
```

#### 1.2createElement

JSX语法最终会被编译成为createElement写法，

```jsx
<div className="name">hello world</div>

// 等价于
React.createElement('div',{className:'name'},'hello world')
```

### 二、组件与事件绑定

#### 2.1组件创建

组件的创建分两种方式，一是类组件，二是函数组件

- 类组件

```jsx
class Acomponent extends React.Component {
  render() {
    return (
      // 一般jsx
    )
  }
}
```

- 函数组件

```jsx
function Bcomponent () {
  return (
  	// 一般jsx
  )
}
```

#### 2.2事件绑定

- react中事件的绑定是在jsx上添加属性on+事件，事件要求大写例如onClick
- react事件不能通过return false的方法组织默认行为，需要强制e.preventDefault()
- react事件中的事件对象是合成事件对象，并不是js原生的事件对象，如果想要拿到原生的事件对象调用event.nativeEvent
- 当使用类组件时要注意this的处理问题
- 事件传值可以用箭头函数的方式\<div  onClick={()=>a('text',e)}  \>\<div\>

