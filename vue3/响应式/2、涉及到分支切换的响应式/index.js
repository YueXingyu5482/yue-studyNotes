// 当前的副作用
let activeEffect = null
// 注册副作用的函数
function effect (fn) {
  activeEffect = () => {
    cleanup(activeEffect)
    fn()
  }
  activeEffect.deps = []
  activeEffect()
}
function cleanup (effectFn) {
  for(let i=0; i<effectFn.deps.length; i++){
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps = []
}
// 储存副作用函数的桶
const bucket = new WeakMap ()
const data = { ok: true, text: 'hello Word' }
var obj = new Proxy ( data, {
  // 拦截读取操作
  // 1、看桶中是否有这个target绑定的字段集合，没有创建
  // 2、看字段集合里有没有这个字段，没有创建
  // 3、给这个字段副作用集合添加新的副作用
  get (target, key) {
    // 在桶中添加依赖关系
    track(target, key)
    return target[key]
  },
  // 拦截操作
  // 1、设置新值
  // 2、从桶中取出target对应的字段集合
  // 3、从字段集合中取出副作用集合
  // 4、执行所有的副作用
  set (target, key, newValue) {
    // 根据依赖关系从桶中取出副作用执行
    target[key] = newValue
    trigger(target, key)
  }
})
const track = (target, key) => {
  if (!activeEffect) return
  // 1、看桶中是否有这个target绑定的字段集合，没有创建
  let depMap = bucket.get(target)
  if (!depMap) bucket.set(target, (depMap = new Map ()))
  // 2、看字段集合里有没有这个字段，没有创建
  let deps = depMap.get(key)
  if(!deps) depMap.set(key, (deps = new Set ()))
  // 3、给这个字段副作用集合添加新的副作用
  deps.add(activeEffect)
  activeEffect.deps.push(deps) //分支切换新增
}
const trigger = (target, key) => {
  const depMap = bucket.get(target)
  if (!depMap) return
  const deps = depMap.get(key)
  const effectsToRun = new Set(deps)
  effectsToRun.forEach(effectFn => effectFn())
}
effect(() => {
  document.body.innerText = obj.ok ? obj.text : 'not'
})
