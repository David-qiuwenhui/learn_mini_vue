// 自定义渲染器
function insert(el, parent) {
  parent.append(el);
}

function createTextNode(children) {
  return document.createTextNode(children);
}

function patchProps(el, key, prevValue, nextValue) {
  el.setAttribute(key, nextValue);
}

function createElement(tag) {
  return document.createElement(tag);
}

/**
 * 挂载元素
 * @param {*} vnode 虚拟的DOM节点
 * @param {*} container 目标挂载的容器
 */
export const mountElement = (vnode, container) => {
  const { tag, props, children } = vnode;
  // tag
  const el = createElement(tag);

  // props
  if (props) {
    for (const key in props) {
      const value = props[key];
      patchProps(el, key, null, value);
    }
  }

  // children
  if (typeof children === "string") {
    const text = createTextNode(children);
    insert(text, el);
  } else if (Array.isArray(children)) {
    children.forEach((item) => {
      mountElement(item, el);
    });
  }

  // insert
  insert(el, container);
};
