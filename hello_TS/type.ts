// 主要列举各种类型操作

function t_typeof() {
  function f() {
    return { x: 10, y: 3 };
  }
  type P = ReturnType<typeof f>;
  let p1: P = { x: 101, y: 32 };
}

function IndexedAccessTypes() {
  const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
  ];
  type Person = typeof MyArray[number];
  type Age = typeof MyArray[number]["age"];
  type Age2 = Person["name"];

  type key = "age";
  type Age1 = Person[key];
}

function ovverideFunc() {
  let suits = ["hearts", "spades", "clubs", "diamonds"];
  interface card {
    suit: string;
    card: number;
  }
  const card1 = { suit: "string", card: 123 };
  type suiteType = typeof card1;

  function pickCard(x: suiteType[]): number;
  function pickCard(x: number): suiteType;
  function pickCard(x): number | card {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
    }
  }

  let myDeck = [
    { suit: "diamonds", card: 2 },
    { suit: "spades", card: 10 },
    { suit: "hearts", card: 4 },
  ];
  let pickedCard1 = myDeck[pickCard(myDeck)];
  console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

  let pickedCard2 = pickCard(15);
  console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
}
// ovverideFunc();

function conditionalTypeFunc() {
  //1、函数重载简写
  interface IdLabel {
    id: number /* some fields */;
  }
  interface NameLabel {
    name: string /* other fields */;
  }
  function createLabel(id: number): IdLabel;
  function createLabel(name: string): NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
  }
  let p1 = createLabel(123);
  let p2 = createLabel("123");

  //对比下面的简写
  type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;
  let s: NameOrId<number>;
  let s1: NameOrId<string>;
  function createLabel1<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
  }
  let p3 = createLabel(123);
  let p4 = createLabel("123");

  type MessageOf<T extends { message: unknown }> = T["message"];
  interface Email {
    message: string;
  }
  type EmailMessageContents = MessageOf<Email>;

  type MessageOf1<T> = T extends { message: unknown } ? T["message"] : never;
  interface Email {
    message: string;
  }
  interface Dog {
    bark(): void;
    // message: number;
  }
  type EmailMessageContents1 = MessageOf1<Email>;
  type DogMessageContents = MessageOf1<Dog>;
}

function mappingType() {
  interface Horse {
    height: number;
    name?: string;
  }
  type OnlyBoolsAndHorses = {
    [key: string]: boolean | Horse;
  };
  type OnlyBoolsAndHorses1 = {
    [key: number]: boolean | Horse;
  };
  const conforms: OnlyBoolsAndHorses = {
    del: true,
    rodney: false,
    0: { height: 123 },
  };
  const conforms1: OnlyBoolsAndHorses1 = [true, false, { height: 123 }];

  type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
  };
  let p1: OptionsFlags<Horse> = {
    height: true,
    name: false,
  };

  type CreateMutable<Type> = {
    -readonly //移除属性的readonly
    [Property in keyof Type]: Type[Property];
  };
  type LockedAccount = {
    readonly id: string;
    readonly name: string;
  };
  type UnlockedAccount = CreateMutable<LockedAccount>;
  /**
   * 少了readonly
   * type UnlockedAccount = {
    id: string;
    name: string;
}
   */

  type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
  };
  type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
  };

  type User = Concrete<MaybeUser>;
  /*  
  少了问号
  type User = {
      id: string;
      name: string;
      age: number;
  }
  */

  type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<
      string & Property
    >}`]: () => Type[Property];
  };
  interface Person {
    name: string;
    age: number;
    location: string;
  }
  type LazyPerson = Getters<Person>;
  /**
   *  
type LazyPerson = {
    getName: () => string;
    getAge: () => number;
    getLocation: () => string;
}
   */

  // Remove the 'kind' property
  type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
  };
  interface Circle {
    kind: "circle";
    radius: number;
  }
  type KindlessCircle = RemoveKindField<Circle>;
  /*          
type KindlessCircle = {
    radius: number;
}*/

  // 映射类型可以很好地与此类型操作部分中的其他功能配合使用，例如，此处是使用条件类型的映射类型，该类型返回或取决于对象是否将属性设置为文本：truefalsepiitrue
  type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends { pii: true }
      ? true
      : false;
  };
  type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true };
  };
  type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
  /*
type ObjectsNeedingGDPRDeletion = {
    id: false;
    name: true;
}
*/
}

function pick_type() {
  // 高级类型Pick的定义
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  interface A {
    name: string;
    age: number;
    sex: number;
  }

  type A1 = Pick<A, "name" | "age">;
  // 报错：类型“"key" | "noSuchKey"”不满足约束“keyof A”
  //   type A2 = Pick<A, "name" | "noSuchKey">;
  
}

function infer_type() {
  /**
     * 在这个条件语句 T extends (...args: infer P) => any ? P : T 中，infer P 表示待推断的函数参数。
整句表示为：如果 T 能赋值给 (...args: infer P) => any，则计算结果是 (...args: infer P) => any 中的参数P的类型，否则返回为 T。
     */
  type ParamType<T> = T extends (...args: infer P) => any ? P : T;
  interface User {
    name: string;
    age: number;
  }
  interface StringArray {
    [index: string]: string;
  }
  let p2: StringArray = { sdfsdf: "sdfsf", 123: "123123" };
  console.log(p2);

  type Func = (user: User) => void;
  type Param = ParamType<Func>; // Param = User
  let p1: Param = [{ name: "sdf", age: 123 }];
  type AA = ParamType<string>; // string

  type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;
  type Func1 = () => User;
  type Test = ReturnType<Func1>; // Test = User

  // 获取参数类型
  type ConstructorParameters<T extends new (...args: any[]) => any> =
    T extends new (...args: infer P) => any ? P : never;
  // 获取实例类型
  type InstanceType<T extends new (...args: any[]) => any> = T extends new (
    ...args: any[]
  ) => infer R
    ? R
    : any;
  class TestClass {
    constructor(public name: string, public age: number) {}
  }
  type Params = ConstructorParameters<typeof TestClass>; // [string, number]
  type Instance = InstanceType<typeof TestClass>; // TestClass

  type TTuple = [string, Object, boolean];
  type Res = TTuple[number];

  type T1 = Parameters<(s: string) => void>;
  let p3: T1 = ["123"];

  type T0 = ConstructorParameters<ErrorConstructor>;
  let p4: T0 = ["123"];
  type T2 = ConstructorParameters<FunctionConstructor>;
  let p5: T2 = ["123"];

  function padLeft(value: string, padding: string | number) {
    //   typeof不但会检查类型，还会在判断为某种类型的时候，直接缩减为该类型
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  }
}
// infer_type();

function partial() {
  interface Todo {
    title: string;
    description: string;
  }

  function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    console.log(fieldsToUpdate);
    return { ...todo, ...fieldsToUpdate };
  }

  const todo1 = {
    title: "organize desk",
    description: "clear clutter",
  };

  const todo2 = updateTodo(todo1, {
    description: "throw out trash",
    title: "sfsdf",
  });
  console.log(todo2);
}
// partial()

function mixin() {
  //返回first和second的混合类型
  function extend<First, Second>(first: First, second: Second): First & Second {
    const result: Partial<First & Second> = {};
    for (const prop in first) {
      if (first.hasOwnProperty(prop)) {
        (result as First)[prop] = first[prop];
      }
    }
    console.log(Object.keys(second));
    // console.log(Reflect.ownKeys(second));
    console.log(Object.getOwnPropertyNames(second));
    for (const prop of Object.getOwnPropertyNames(second)) {
      if (second.hasOwnProperty(prop)) {
        (result as Second)[prop] = second[prop];
      }
    }
    return result as First & Second;
  }

  class Person {
    constructor(public name: string) {}
  }

  interface Loggable {
    log(name: string): void;
  }

  class ConsoleLogger implements Loggable {
    log(name) {
      console.log(`Hello, I'm ${name}.`);
    }
  }

  const jim = extend(new Person("Jim"), ConsoleLogger.prototype);
  console.dir(ConsoleLogger);
  jim.log(jim.name);
}
// mixin();

function NarrowingType() {
  //in 收窄
  interface Fish {
    swim();
  }
  type Bird = {
    fly();
  };
  /*in操作符可以作为类型细化表达式来使用。
对于n in x表达式，其中n是字符串字面量或字符串字面量类型且x是个联合类型
那么true分支的类型细化为有一个可选的或必须的属性n，false分支的类型细化为有一个可选的或不存在属性n。
*/
  function move(pet: Fish | Bird) {
    // 如果swin 在pet里面，那么Pet就会收窄类型为pet
    if ("swim" in pet) {
      return pet.swim();
    }
    return pet.fly();
  }

  //is Fish收窄返回类型为Fish
  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }
  function move1(pet: Fish | Bird) {
    //条件为真，pet收窄为确定类型Fish
    if (isFish(pet)) {
      pet.swim();
    } else {
      pet.fly();
    }
  }

  //typeof收窄
  function padLeft(value: string, padding: string | number) {
    //typeof 也可以在判断为真的时候收窄类型为 判断时的条件，比如此处的number
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  }

  /*instanceof收窄
instanceof的右侧要求是一个构造函数，TypeScript将细化为：
1、此构造函数的prototype属性的类型，如果它的类型不为any的话
2、构造签名所返回的类型的联合
*/
  interface Padder {
    getPaddingString(): string;
  }
  class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) {}
    getPaddingString() {
      return Array(this.numSpaces + 1).join(" ");
    }
  }
  class StringPadder implements Padder {
    constructor(private value: string) {}
    getPaddingString() {
      return this.value;
    }
  }
  function getRandomPadder() {
    return Math.random() < 0.5
      ? new SpaceRepeatingPadder(4)
      : new StringPadder("  ");
  }
  // 类型为SpaceRepeatingPadder | StringPadder
  let padder: Padder = getRandomPadder();
  if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
  }
  if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
  }
}

//可辨识联合类型
function discriminUnion(){
    interface Square {
        kind: "square";
        size: number;
    }
    interface Rectangle {
        kind: "rectangle";
        width: number;
        height: number;
    }
    interface Circle {
        kind: "circle";
        radius: number;
    }
    type Shape = Square | Rectangle | Circle;
    function area(s: Shape) {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * s.radius ** 2;
        }
    }

}

discriminUnion()

function indexType(){
    function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
        return propertyNames.map(n => o[n]);
      }
      
      interface Car {
          manufacturer: string;
          model: string;
          year: number;
      }
      let taxi: Car = {
          manufacturer: 'Toyota',
          model: 'Camry',
          year: 2014
      };
      let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);
      console.log(makeAndModel);
      

      function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }
    console.log(getProperty(taxi,"manufacturer"))
}

