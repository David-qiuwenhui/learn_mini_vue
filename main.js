// import {
//   ref,
//   effect,
// } from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";

// const a = ref(10);
// let b = 0;

// effect(() => {
//   // 收集依赖
//   b = a.value + 10;
//   console.log(b);
// });

// // 触发的依赖
// a.value = 20;

import { Dep, effectWatch } from "./core/reactivity.js";

const a = new Dep(10);
let b = 0;

effectWatch(() => {
  // 收集依赖
  b = a.value + 10;
  console.log(b);
});

// 触发的依赖
a.value = 20;
