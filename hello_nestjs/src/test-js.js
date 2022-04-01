// 函数提升：https://juejin.cn/post/6844904083661258759
'use strict' //严格模式和非严格模式输出不同
function f() {
    console.log("global")
  }
  
  {
    f();//block-level
  
    function f() {
      console.log("block-level")
    }
  
    f();//block-level
  }
  
  f();//block-level