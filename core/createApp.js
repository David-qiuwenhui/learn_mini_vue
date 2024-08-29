import { effectWatch, mountElement, diff } from "./index.js";

export const createApp = (rootComponent) => {
  return {
    mounted(rootContainer) {
      const setupResult = rootComponent.setup();

      let isMounted = false;
      let preSubTree;

      effectWatch(() => {
        // 区分是否为首次渲染挂载
        if (!isMounted) {
          isMounted = true;

          document.querySelector("#app").textContent = "";
          const subTree = rootComponent.render(setupResult);
          preSubTree = subTree;
          mountElement(subTree, rootContainer);
        } else {
          document.querySelector("#app").textContent = "";
          const subTree = rootComponent.render(setupResult);

          diff(preSubTree, subTree);
          preSubTree = subTree;

          mountElement(subTree, rootContainer);
        }
      });
    },
  };
};
