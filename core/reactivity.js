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
