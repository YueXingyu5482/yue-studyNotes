import { effect, reactive } from "./effect.js"
const data = reactive({
  foo: true,
  bar: true
})
let temp1, temp2
effect(function effect1(){
  console.log('effect1执行')
  effect(function effect2(){
    console.log('effect2执行')
    temp2 = data.bar
  })
  temp1 = data.foo
})
window.btn.addEventListener('click',()=>{
  data.foo = false
})