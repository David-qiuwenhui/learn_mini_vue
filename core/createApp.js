import { effectWatch, mountElement } from "./index.js";

export const createApp = (rootComponent) => {
  return {
    mounted(rootContainer) {
      const setupResult = rootComponent.setup();

      effectWatch(() => {
        document.querySelector("#app").textContent = "";
        const vnode = rootComponent.render(setupResult);

        mountElement(vnode, rootContainer);
        // rootContainer.append(element);
      });
    },
  };
};
