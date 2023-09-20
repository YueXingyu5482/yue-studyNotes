/**
 * 渲染器
 * @param {object} vnode 虚拟DOM
 * @param {string} container 容器
 */
function renderer (vnode, container) {
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
const vnode = {
  // 标签名称
  tag: 'div',
  // 标签属性
  props: {
    class: 'dom',
    onClick: () => alert(1)
  },
  // 子节点
  children: 'click me'
}
renderer(vnode, document.querySelector('#app'))