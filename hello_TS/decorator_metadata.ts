import "reflect-metadata";

function classDecorator() {
  type Consturctor = { new(...args: any[]): any };
  function toString<T extends Consturctor>(BaseClass: T) {
    return class extends BaseClass {
      toString() {
        return JSON.stringify(this);
      }
      getAllKey() {
        return Reflect.ownKeys(this);
      }
    };
  }
  @toString
  class C {
    public foo = "foo";
    public num = 24;
  }
  console.log(new C().toString());
}

function propertyDecorator() {
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function observable(target: any, key: string): any {
    console.dir(target);
    console.dir(key);
    // prop -> onPropChange
    const targetKey = "on" + capitalizeFirstLetter(key) + "Change";

    target[targetKey] = function (fn: (prev: any, next: any) => void) {
      let prev = this[key];
      Reflect.defineProperty(this, key, {
        set(next) {
          fn(prev, next);
          prev = next;
        },
      });
    };
  }

  class C {
    @observable
    foo = -1;

    @observable
    bar = "bar";
    onFooChange(prev) { }
    onBarChange(prev) { }
  }

  const c = new C();

  c.onFooChange((prev, next) => console.log(`prev: ${prev}, next: ${next}`));
  c.onBarChange((prev, next) => console.log(`prev: ${prev}, next: ${next}`));

  c.foo = 100; // -> prev: -1, next: 100
  c.foo = -3.14; // -> prev: 100, next: -3.14
  c.bar = "baz"; // -> prev: bar, next: baz
  c.bar = "sing"; // -> prev: baz, next: sing
}
// propertyDecorator()

function metadata() {
  class Greeter1 {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
      this.greeting = message;
    }
    greet() {
      let formatString = getFormat(this, "greeting");
      console.dir(`formatString:${formatString}`);
      return formatString.replace("%s", this.greeting);
    }
  }
  function format(formatString: string) {
    return Reflect.metadata("formatMetadataKey", formatString);
  }
  function getFormat(target: any, propertyKey: string) {
    console.dir(target);
    console.dir(propertyKey);
    return Reflect.getMetadata("formatMetadataKey", target, propertyKey);
  }
  const g1 = new Greeter1("xmu");
  console.dir(g1.greet());
}

function methodDecorator() {
  function enumerable(value: boolean) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      descriptor.enumerable = value;
    };
  }
  function logger(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args) {
      console.log("params: ", ...args);
      const result = original.call(this, ...args);
      console.log("result: ", result);
      return result;
    };
  }

  class C {
    @logger
    @enumerable(false)
    add(x: number, y: number) {
      return x + y;
    }
  }

  const c = new C();
  c.add(1, 2);
  console.dir(c.add);
}
// methodDecorator()

function AccessorDecorators() {
  function configurable(value: boolean) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      descriptor.configurable = value;
    };
  }
  class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
      this._x = x;
      this._y = y;
    }
    @configurable(false)
    get x() {
      return this._x;
    }

    set x(value) {
      this._x = value;
    }

    @configurable(false)
    get y() {
      return this._y;
    }
  }
  const p = new Point(1, 2);
  //   p.x = 123
}

function paraDecorations() {
  class Greeter {
    greeting: string;

    constructor(message: string) {
      this.greeting = message;
    }

    @validate
    greet(@required name?: string) {
      return "Hello " + name + ", " + this.greeting;
    }
  }

  function required(
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    let existingRequiredParameters: number[] =
      Reflect.getOwnMetadata("requiredMetadataKey", target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(
      "requiredMetadataKey",
      existingRequiredParameters,
      target,
      propertyKey
    );
  }

  function validate(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<Function>
  ) {
    let method = descriptor.value;
    descriptor.value = function () {
      let requiredParameters: number[] = Reflect.getOwnMetadata(
        "requiredMetadataKey",
        target,
        propertyName
      );
      if (requiredParameters) {
        for (let parameterIndex of requiredParameters) {
          if (
            parameterIndex >= arguments.length ||
            arguments[parameterIndex] === undefined
          ) {
            throw new Error("Missing required argument.");
          }
        }
      }

      return method.apply(this, arguments);
    };
  }
  let f = new Greeter("sdf");
  f.greet();
}

// paraDecorations();

function IOC() {
  type Constructor<T = any> = new (...args: any[]) => T;
  const Injectable = (): ClassDecorator => (target) => { };
  // const inject = function (st:string){
  //   return function (target:string){
  //     console.log(target+st)
  //   }
  // }
  // type block = (string) => string;
  // const inject2 = (st):block => (target) => {
  //   console.log(target+st)
  //   return '123'
  // }
  // inject2('sfsf')('123123')

  // function buildName(firstName: string, ...restOfName: number[]): string {
  //   return firstName + " " + restOfName.join(" ");
  // }
  // console.log(buildName("2", 2, 1232, 1313));

  class OtherService {
    a = 1;
  }

  @Injectable()
  class TestService {
    constructor(public readonly otherService: OtherService) { }
    testMethod() {
      console.log(this.otherService.a);
    }
  }

  const Factory = <T>(target: Constructor<T>): T => {
    // 获取所有注入的服务
    const providers = Reflect.getMetadata("design:paramtypes", target); // [OtherService]
    const args = providers.map((provider: Constructor) => {
      return new provider();
    });
    return new target(...args);
  };

  Factory(TestService).testMethod(); // 1
  //   console.log(ret)
}
// IOC();

function keyword_keyof_in() {
  interface Person {
    name: string;
    age: number;
    phoneNum: number;
  }
  type PersonProperty = keyof Person;
  // type PersonProperty = "name" | "age" | "phoneNum"
  const p1: PersonProperty = "name";

  //T[K] 在TS里称作索引访问操作符（indexed access operator）。它可以为我们准确解析目标对象上的对应属性的正确类型
  function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
  const obj1: Person = {
    name: "asfas",
    age: 13,
    phoneNum: 123,
  };
  //key 只能是name,age,phoneNum
  const ret1 = getProperty(obj1, "name");
  console.dir(ret1);

  enum Letter {
    A = 1,
    B,
    C,
  }
  type LetterMap = {
    [key in Letter]: string;
  };
  const p3: LetterMap = { 1: "123", 2: "13123", 3: "32434" };

  type Property = "name" | "age" | "phoneNum";
  type PropertyObject = {
    [key in Property]: string;
  };
  const p2: PropertyObject = { name: "asfasf", age: "fsdf", phoneNum: "sfdsf" };

  type ToString<T> = {
    [key in keyof T]: string;
  };
  const p4: ToString<Person> = {
    name: "asfasf",
    age: "fsdf",
    phoneNum: "sfdsf",
  };
  const p5: ToString<LetterMap> = {
    1: "123",
    2: "13123",
    3: "32434",
  };

  type StringKey = {
    [key in string]: any;
  };
  const p6: StringKey = { dfa: 123 };

  type NumberKey = {
    [key in number]: any;
  };
  const p7: NumberKey = [1, "2", 3];

  interface NumberDictionary {
    //必须是联合类型，不然下面的length，或者name报错，
    [index: string]: number | string;
    length: number; // 可以，length是number类型
    name: string; // 错误，`name`的类型与索引类型返回值的类型不匹配
  }

  interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
  }

  function getCounter(): Counter {
    let counter = function (start: number) { } as Counter;
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
  }

  let c = getCounter();
  c(10);
  c.reset();
  c.interval = 5.0;

  /**
   * 此函数用于判断参数 value 是不是 string 类型
   * 由于返回类型声明了类型谓词，可以帮助TS在代码分支中进行类型保护（默认返回 boolean 类型是没办法做到的）
   **/
  function isString(value: any): value is string {
    return typeof value === "string";
  }

  function doSometing(value: string | number) {
    if (isString(value)) {
      // TS 可以识别这个分支中 value 是 string 类型的参数（这就叫类型保护）
    } else {
      // TS 可以识别这个分支中 value 是 number 类型的参数
    }
  }
}
// keyword_keyof_in();


function route_decorator() {
  function isConstructor(item:any):boolean {
   return item === 'constructor'
  }
  function isFunction(item:any):boolean {
    let ret = typeof item === 'function'
    return ret
  }

  const METHOD_METADATA = 'method'
  const PATH_METADATA = 'path'
  const Controller = (path: string): ClassDecorator => {
    return target => {
      Reflect.defineMetadata(PATH_METADATA, path, target);
    }
  }
  const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
    return (target, key, descriptor) => {
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
      Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
    }
  }
  const Get = createMappingDecorator('GET');
  const Post = createMappingDecorator('POST');

  function mapRoute(instance: Object) {
    const prototype = Object.getPrototypeOf(instance);
    // 筛选出类的 methodName
    const methodsNames = Object.getOwnPropertyNames(prototype)
      .filter(item => !isConstructor(item) && isFunction(prototype[item]))
    return methodsNames.map(methodName => {
      
      const fn = prototype[methodName];
      console.dir(fn)
      // 取出定义的 metadata
      const route = Reflect.getMetadata(PATH_METADATA, fn);
      const method = Reflect.getMetadata(METHOD_METADATA, fn)
      return {
        route,
        method,
        fn,
        methodName
      }
    })
  };

  class parentClass{
    protected a =123
    method1(){

    }
    b = '123'
  }
  @Controller('/test')
  class SomeClass extends parentClass{
    @Get('/a')
    someGetMethod() {
      return 'hello world';
    }

    @Post('/b')
    somePostMethod() { }
  }

  
  Reflect.getMetadata(PATH_METADATA, SomeClass); // '/test'
  const r1 = mapRoute(new SomeClass());
  console.log(r1);
  console.dir( Object.getPrototypeOf(new SomeClass()))
  /**
 * [{
 *    route: '/a',
 *    method: 'GET',
 *    fn: someGetMethod() { ... },
 *    methodName: 'someGetMethod'
 *  },{
 *    route: '/b',
 *    method: 'POST',
 *    fn: somePostMethod() { ... },
 *    methodName: 'somePostMethod'
 * }]
 *
 */
}

route_decorator()