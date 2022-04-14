class obj {
  foo;
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  bar() {
    return "abc";
  }
}
const ret = Object.getOwnPropertyDescriptors(new obj());
console.log(ret);

const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
console.log(o,newObj,x);


let z1 = { a: 3, b: 4 };
let z2 = { a1: 3, b2: 4 };
let n = { ...z1,...z2 };
console.log(n);