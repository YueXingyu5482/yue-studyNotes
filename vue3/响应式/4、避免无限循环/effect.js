let activeEffect = null
const effectStack = []
export function effect(fn) {
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
function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const dep = effectFn.deps[i]
    dep.delete(effectFn)
  }
  effectFn.deps = []
}
const bucket = new WeakMap()
export function reactive(obj) {
  const options = {
    get(target, key) {
      console.log('get', target, key)
      track(target, key)
      return target[key]
    },
    set(target, key, newValue) {
      console.log('set', target, key, newValue)
      target[key] = newValue
      trigger(target, key)
      return true
    }
  }
  return new Proxy(obj, options)
}

function track(target, key) {
  let depsMap = bucket.get(target)
  if (!depsMap) bucket.set(target, (depsMap = new Map()))
  let deps = depsMap.get(key)
  if (!deps) depsMap.set(key, (deps = new Set()))
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  const deps = depsMap.get(key)
  if (!deps) return
  const effectsToRun = new Set()
  deps.forEach(dep => {
    if (dep !== activeEffect) effectsToRun.add(dep)
  })
  effectsToRun.forEach(effect => effect())
}