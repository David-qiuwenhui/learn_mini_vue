/**
 * 创建一个虚拟DOM节点
 * js -> object
 * 描述一个 DOM 对象
 * @param {String}  tag DOM元素标签
 * @param {Object | null} props 元素属性
 * @param {String | Array | null} children 元素的子元素
 * @returns
 */
export function h(tag, props, children) {
  return { tag, props, children };
}
