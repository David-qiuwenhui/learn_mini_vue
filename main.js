/**
 * Vue 用法
 */
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

/**
 * 案例：ref
 */
// import { Dep, effectWatch } from "./core/reactivity.js";

// const a = new Dep(10);
// let b = 0;

// effectWatch(() => {
//   // 收集依赖
//   b = a.value + 10;
// });

// // 触发的依赖
// a.value = 20;

/**
 * 案例：实现 reactivity 的reactive
 */
// import { effectWatch, reactive } from "./core/reactivity.js";
// const user = reactive({
//   age: 10,
// });
// let nextAge = 0;
// effectWatch(() => {
//   nextAge = user.age + 1;
//   console.log(nextAge);
// });

// user.age++;

/**
 * 实现 mini-vue 的雏形
 */
// import { reactive, effectWatch } from "./core/index.js";

// const App = {
//   // template -> render
//   render(context) {
//     // ui render
//     effectWatch(() => {
//       document.querySelector("#app").textContent = "";

//       const element = document.createElement("div");
//       const textNode = document.createTextNode("age");
//       const textNode2 = document.createTextNode(context.obj.age);
//       element.append(textNode);
//       element.append(textNode2);

//       document.querySelector("#app").append(element);
//     });
//   },

//   setup() {
//     // template
//     const obj = reactive({
//       age: 10,
//     });
//     window.obj = obj;

//     return {
//       obj,
//     };
//   },
// };

// App.render(App.setup());

/**
 * mini-vue 框架的演化
 */
import App from "./App.js";
import { createApp } from "./core/index.js";

// 模拟 vue3 真实的api
createApp(App).mounted(document.querySelector("#app"));
