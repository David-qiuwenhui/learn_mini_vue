import { effectWatch } from "./index.js";

export const createApp = (rootComponent) => {
  return {
    mounted(rootContainer) {
      const setupResult = rootComponent.setup();

      effectWatch(() => {
        document.querySelector("#app").textContent = "";
        const element = rootComponent.render(setupResult);

        rootContainer.append(element);
      });
    },
  };
};
