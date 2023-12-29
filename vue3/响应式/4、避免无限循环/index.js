import { reactive, effect } from './effect.js'
const data = reactive({ a: 1 })
window.btn.addEventListener('click',()=>{
  effect(()=>{
    data.a++
  })
})