/**
 * DOM渲染器
 * @param {object} vnode 虚拟DOM节点
 * @param {string} container 容器
 */
function mountElement (vnode, container) {
  const { tag, props, children} = vnode
  // 生成DOM节点
  const el = document.createElement(tag)
  // 处理props属性
  for ( const key in props) {
    // 如果是on开头说明是事件
    if(/^on/.test(key)) {
      el.addEventListener(key.slice(2).toLowerCase(), props[key])
    } else {
      el.setAttribute(key, props[key])
    }
  }
  // 处理children
  if (typeof children === 'string') el.appendChild(document.createTextNode(children))
  else if (Array.isArray(children)) children.forEach(child => renderer(child, el))
  container.appendChild(el)
}
/**
 * 组件渲染器
 * @param {object} vnode 虚拟DOM节点
 * @param {string} container 容器
 */
function mountComponent (vnode, container) {
  // 获取虚拟DOM
  const sunTree = vnode.tag.render()
  renderer(sunTree, container)
}
function renderer (vnode, container) {
  // 是dom节点
  if (typeof vnode.tag === 'string') mountElement(vnode, container)
  // 是组件节点
  else if (typeof vnode.tag === 'object') mountComponent(vnode, container)
}

const MyComponent ={
  render () {
    return {
      tag: 'div',
      props: {
        class: 'component',
        onClick: () => alert(1)
      },
      children: 'click component'
    }
  }
}
const vnode = {
  // 标签名称
  tag: MyComponent,
}
renderer(vnode, document.querySelector('#app'))