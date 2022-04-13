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

ovverideFunc();

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
