class obj  {
    foo
    constructor(height, width) {
        this.height = height;
        this.width = width;
      }
    bar() { return 'abc' }
  };
  const ret = Object.getOwnPropertyDescriptors(new obj())
console.log(ret)