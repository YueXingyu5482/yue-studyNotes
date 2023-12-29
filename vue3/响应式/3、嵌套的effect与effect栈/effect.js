// 当前的副作用函数
let activeEffect = null
const effectStack = []
// 注册副作用函数
export function effect (fn) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(activeEffect)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.deps = []
  effectFn()
}
// 清除绑定
function cleanup (effectFn) {
  for (let i = 0; i<effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps = []
}

const bucket = new WeakMap ()

export function reactive (obj) {
  const options = {
    get(target, key) {
      console.log('get', target,key)
      // 追踪副作用
      track(target, key)
      // 返回数据
      return target[key]
    },
    set(target, key, newValue) {
      console.log('set', target,key,newValue)
      target[key] = newValue
      trigger(target, key)
      return true
    }
  }

  return new Proxy(obj, options)
}

// get函数内部追踪副作用
function track (target, key) {
  // 1.判断target有没有被追踪
  let depMap = bucket.get(target)
  if (!depMap) bucket.set(target, (depMap = new Map()))
  // 2.判断key有没有被追踪
  let deps = depMap.get(key)
  if (!deps) depMap.set(key, (deps = new Set()))
  // 3.将key和effect相互绑定
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

// set函数内部触发副作用
function trigger (target, key) {
  // 1.取出target
  const depMap = bucket.get(target)
  // 2.取出key绑定的effect函数
  const deps = depMap.get(key)
  if (!deps) return
  const effectsToRun = new Set(deps)
  effectsToRun.forEach(effectFn => effectFn())
}