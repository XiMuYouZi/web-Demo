// commonJS模块化
const math = require('../src/js/math-commonJS')
console.log("hello webpack");
console.log(math.add(10,20));
console.log(math.mul(10,20));
require("../src/css/normal.css")

// es6模块化
import {sub} from '../src/js/math-es6'
console.log(sub(10,20));

