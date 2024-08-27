export class Dep {
  constructor(value) {
    this._val = value;
    this.effects = new Set();
  }

  get value() {
    // 触发依赖的收集
    this.depend();
    return this._val;
  }

  set value(val) {
    this._val = val;
    // 触发依赖更新
    this.notice();
  }

  // 收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }

  // 触发依赖
  notice() {
    this.effects.forEach((effect) => {
      effect();
    });
  }
}

let currentEffect = null;
export function effectWatch(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

const targetsMap = new Map();
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      // 依赖收集
      const dep = getDep(target, key);
      dep.depend();

      return Reflect.get(target, key);
    },

    set(target, key, value) {
      const dep = getDep(target, key);
      const result = Reflect.set(target, key, value);
      dep.notice();

      return result;
    },
  });
}

function getDep(target, key) {
  let depsMap = targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}
