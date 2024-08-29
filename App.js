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

    // test1 change node
    // return h(context.obj.tag, { class: "div123" }, String(context.obj.age));

    // test2 change attribute
    return h(context.obj.tag, context.obj.props, String(context.obj.age));

    // return h("div", { class: "main-container", id: "123" }, [
    //   h("p", null, "age"),
    //   h("p", null, String(context.obj.age)),
    // ]);
  },

  setup() {
    // template
    const obj = reactive({
      age: 10,
      tag: "div",
      props: { class: "div123", id: "id123" },
    });
    window.obj = obj;

    return {
      obj,
    };
  },
};
