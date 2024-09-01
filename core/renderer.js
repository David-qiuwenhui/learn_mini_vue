// 自定义渲染器
function insert(el, parent) {
  parent.append(el);
}

/**
 * 从父元素中移除子元素
 * @param {Element} node
 * @param {Element} parent
 */
function removeElement(node, parent) {
  parent.removeChild(node);
}

function createTextNode(children) {
  return document.createTextNode(children);
}

/**
 * 修改 DOM 元素的属性值
 * @param {Element} el DOM元素
 * @param {String} key 属性键值
 * @param {String} prevValue 上一个值
 * @param {String} nextValue 下一个值
 */
function patchProps(el, key, prevValue, nextValue) {
  if (nextValue === null) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, nextValue);
  }
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
  const el = (vnode.el = createElement(tag));

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

/**
 * diff算法比较 vnode tree
 * @param {Object} n1 oldVnode
 * @param {Object} n2 newVnode
 */
export const diff = (n1, n2) => {
  // 1. tag
  if (n1.tag !== n2.tag) {
    n1.el.replaceWith(createElement(n2.tag));
  } else {
    // 2. props
    const { props: oldProps } = n1;
    const { props: newProps } = n2;

    const el = (n2.el = n1.el);
    // 场景一 n2增加或者修改props
    if (newProps) {
      for (const key in newProps) {
        if (oldProps[key] !== newProps[key]) {
          patchProps(el, key, oldProps[key], newProps[key]);
        }
      }
    }

    // 场景一 n2删除props
    if (oldProps) {
      for (const key in oldProps) {
        if (!(key in newProps)) {
          patchProps(el, key, oldProps[key], null);
        }
      }
    }
  }

  const el = (n2.el = n1.el);
  // 3. children: string | array
  // 3.1 oldChild: string; newChild: string
  // 3.2 oldChild: string; newChild: array
  // 3.3 oldChild: array; newChild: string
  // 3.4 oldChild: array; newChild: array
  const { children: oldChild } = n1;
  const { children: newChild } = n2;

  // newChild -> string
  if (typeof newChild === "string") {
    if (typeof oldChild === "string") {
      if (oldChild !== newChild) {
        el.innerText = newChild;
      }
    } else if (Array.isArray(oldChild)) {
      el.innerText = newChild;
    }
  } else if (Array.isArray(newChild)) {
    if (typeof oldChild === "string") {
      el.innerText = "";
      newChild.forEach((child) => {
        mountElement(child, el);
      });
    } else if (Array.isArray(oldChild)) {
      // newChild -> array
      // new -> [a, b, c]
      // old -> [a, b, c]
      // 1. 依次对比
      // 2. new > old add
      // new -> [a, b, c]
      // old -> [a, b]
      // 3. new < old remove
      // new -> [a, b]
      // old -> [a, b, c]
      const minLength = Math.min(oldChild.length, newChild.length);

      // update
      for (let index = 0; index < minLength; index++) {
        const oldVnode = oldChild[index];
        const newVnode = newChild[index];
        diff(oldVnode, newVnode);
      }

      // add
      if (newChild.length > minLength) {
        for (let index = minLength; index < newChild.length; index++) {
          const newVnode = newChild[index];
          mountElement(newVnode, el);
        }
      }

      // remove
      if (oldChild.length > minLength) {
        for (let index = minLength; index < oldChild.length; index++) {
          const oldVnode = oldChild[index];
          removeElement(oldVnode.el, el);
        }
      }
    }
  }
};
