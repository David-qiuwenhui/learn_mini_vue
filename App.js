import { h, reactive } from "./core/index.js";

export default {
  // template -> render
  render(context) {
    // ui render
    // const element = document.createElement("div");
    // const textNode = document.createTextNode("age");
    // const textNode2 = document.createTextNode(context.obj.age);
    // element.append(textNode);
    // element.append(textNode2);
    // return element;

    return h("div", { class: "main-container", id: "123" }, [
      h("p", null, "age"),
      h("p", null, String(context.obj.age)),
    ]);
  },

  setup() {
    // template
    const obj = reactive({
      age: 10,
    });
    window.obj = obj;

    return {
      obj,
    };
  },
};
