function testable(isTestable) {
    return function(target) {
      target.isTestable = isTestable;
    }
  }

@testable(false)
class MyTestableClass {
    static isTestable:false
}

console.log(MyTestableClass.isTestable);


