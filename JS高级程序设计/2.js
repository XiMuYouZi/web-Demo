function fun1() {
  const workerScript = ` self.onmessage = ({data}) => {
    const view = new Uint32Array(data);
// 执行1000000次加操作
for (let i = 0; i < 1E6; ++i) {
// 线程安全的加操作
Atomics.add(view, 0, 1); }
self.postMessage(null); };
`;
  //URL.createObjectURL()方法会根据传入的参数创建一个指向该参数对象的URL. 这个URL的生命仅存在于它被创建的这个文档里. 新的对象URL指向执行的File对象或者是Blob对象.
  const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]));
  // 创建容量为 4 的工作线程池
  const workers = [];
  for (let i = 0; i < 4; ++i) {
    workers.push(new Worker(workerScriptBlobUrl));
  }
  // 在最后一个工作线程完成后打印出最终值
  let responseCount = 0;
  for (const worker of workers) {
    worker.onmessage = () => {
      if (++responseCount == workers.length) {
        console.log(`Final buffer value: ${view[0]}`);
      }
    };
  }
  // 初始化SharedArrayBuffer
  const sharedArrayBuffer = new SharedArrayBuffer(4);
  const view = new Uint32Array(sharedArrayBuffer);
  view[0] = 1;
  // 把 SharedArrayBuffer 发送到每个工作线程
  for (const worker of workers) {
    worker.postMessage(sharedArrayBuffer);
  }
}

function fun2() {
  let filesList = document.getElementById("files11");
  filesList.addEventListener("change", (event) => {
    //输出文件信息
    let files1 = event.target.files,
      i = 0,
      len = files1.length;
    while (i < len) {
      const f = files1[i];
      console.log(`${f.name} (${f.type}, ${f.size} bytes)`);
      i++;
    }

    //显示图片和文件内容
    let info = "",
      output = document.getElementById("output"),
      progress = document.getElementById("progress"),
      files = event.target.files,
      type = "default",
      reader = new FileReader();
    if (/image/.test(files[0].type)) {
      reader.readAsDataURL(files[0]);
      type = "image";
    } else {
      reader.readAsText(files[0]);
      type = "text";
    }
    reader.onerror = function () {
      output.innerHTML =
        "Could not read file, error code is " + reader.error.code;
    };
    reader.onprogress = function (event) {
      if (event.lengthComputable) {
        progress.innerHTML = `${event.loaded}/${event.total}`;
      }
    };
    reader.onload = function () {
      let html = "";
      switch (type) {
        case "image":
          html = `<img src="${reader.result}">`;
          break;
        case "text":
          html = reader.result;
          break;
      }
      output.innerHTML = html;
    };
  });

  //显示拖放到浏览器的文件信息
  let droptarget = document.getElementById("files11");
  function handleEvent(event) {
    let info = "",
      output = document.getElementById("output"),
      files,
      i,
      len;
    event.preventDefault();
    if (event.type == "drop") {
      files = event.dataTransfer.files;
      i = 0;
      len = files.length;
      while (i < len) {
        info += `${files[i].name} (${files[i].type}, ${files[i].size} bytes)<br>`;
        i++;
      }
      output.innerHTML = info;
    }
  }
  droptarget.addEventListener("dragenter", handleEvent);
  droptarget.addEventListener("dragover", handleEvent);
  droptarget.addEventListener("drop", handleEvent);
}

function fun3() {
  // 取得元素的引用
  let player = document.getElementById("player"),
    btn = document.getElementById("video-btn"),
    curtime = document.getElementById("curtime"),
    duration = document.getElementById("duration");
  // 更新时长
  duration.innerHTML = player.duration;
  // 为按钮添加事件处理程序
  btn.addEventListener("click", (event) => {
    if (player.paused) {
      player.play();
      btn.value = "Pause";
    } else {
      player.pause();
      btn.value = "Play";
    }
  });
  // 周期性更新当前时间
  setInterval(() => {
    curtime.innerHTML = player.currentTime;
  }, 250);
}

function fun4() {
  // 先检查浏览器是否支持
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // 检查用户是否同意接受通知
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // 否则我们需要向用户获取权限
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // 如果用户接受权限，我们就可以发起一条消息
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }
}

//steams api
function fun5() {
  async function* ints() {
    // 每 1000 毫秒生成一个递增的整数
    for (let i = 0; i < 5; ++i) {
      yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
    }
  }
  const integerStream = new ReadableStream({
    async start(controller) {
      for await (let chunk of ints()) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });
  //对每个数据块进行加倍处理
  const doublingStream = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk * 2);
    },
  });
  // 通过管道连接流
  const pipedStream = integerStream.pipeThrough(doublingStream);
  // 从连接流的输出获得读取器
  const pipedStreamDefaultReader = pipedStream.getReader();
  // 消费者
  (async function () {
    while (true) {
      const { done, value } = await pipedStreamDefaultReader.read();
      if (done) {
        break;
      } else {
        console.log(value);
      }
    }
  })();
}

function fun6() {
  const entry = performance.getEntries()[0];
  console.log(entry.name); // "https://foo.com"
  console.log(entry.entryType); // navigation
  console.log(entry.startTime); // 0
  console.log(entry.duration); // 182.36500001512468

  performance.mark("foo");
  for (let i = 0; i < 1e6; ++i) {}
  performance.mark("bar");
  performance.measure("baz", "foo", "bar");
  const [differenceMark] = performance.getEntriesByType("measure");
  console.log(differenceMark);

  const [performanceNavigationTimingEntry] = performance.getEntriesByType(
    "navigation"
  );
  console.log(performanceNavigationTimingEntry);
}

//HTML模板，影子DOM
function fun7() {
  console.log(document.querySelector("#foo").content); // #document-fragment

  const fragment = new DocumentFragment();
  const foo = document.querySelector("#foo1");
  // 为 DocumentFragment 添加子元素不会导致布局重排
  fragment.appendChild(document.createElement("p"));
  fragment.appendChild(document.createElement("p"));
  fragment.appendChild(document.createElement("p"));
  console.log(fragment.children.length); // 3
  foo.appendChild(fragment);
  console.log(fragment.children.length); // 0
  console.log(document.body.innerHTML);

  for (let color of ["red", "green", "blue"]) {
    const div = document.createElement("div");
    const shadowDOM = div.attachShadow({ mode: "open" });
    document.body.appendChild(div);
    
    shadowDOM.innerHTML = `
            <p>Make me ${color}</p>
            <style> p{
              color: ${color};
            }
            </style>
        `;
  }
//FIXED:SDSD
  document.body.innerHTML = `
         <div id="foo">
        <p>Foo</p>
        </div>
    `;
  document.querySelector("div").attachShadow({ mode: "open" }).innerHTML = `
        <div id="bar">
        <slot></slot>
        <div>`;

  document.body.innerHTML = ` <div>
        <p slot="foo">Foo</p>
        <p slot="bar">Bar</p>
    </div> `;
  document.querySelector("div").attachShadow({ mode: "open" }).innerHTML = `
        <slot name="bar"></slot>
        <slot name="foo"></slot>
    `;

  // 创建一个元素作为影子宿主
  document.body.innerHTML = `
        <div onclick="console.log('Handled outside:', event.target)"></div> `;
  // 添加影子DOM并向其中插入HTML
  document.querySelector("div").attachShadow({ mode: "open" }).innerHTML = `
        <button onclick="console.log('Handled inside:', event.target)">Foo</button>`;
}

//自定义元素
function fun8() {
  // class FooElement extends HTMLElement {
  //     constructor() {
  //         super();
  //         console.log('x-foo') }
  // }
  // customElements.define('x-foo', FooElement);
  // document.body.innerHTML = ` <x-foo></x-foo> <x-foo></x-foo> <x-foo></x-foo>`;

  // class FooElement1 extends HTMLDivElement {
  //     constructor() {
  //         super();
  //         console.log('x-foo')
  //     }
  // }
  // customElements.define('x-foo', FooElement1, { extends: 'div' });
  // document.body.innerHTML = ` <div is="x-foo"></div> <div is="x-foo"></div> <div is="x-foo"></div>`;

  // const template = document.querySelector('#x-foo-tpl');
  // class FooElement extends HTMLElement {
  //     constructor() {
  //         super();
  //         this.attachShadow({ mode: 'open' });
  //         this.shadowRoot.appendChild(template.content.cloneNode(true));
  //     } }
  // customElements.define('x-foo', FooElement); document.body.innerHTML += `<x-foo></x-foo`;

  class FooElement extends HTMLElement {
    static get observedAttributes() {
      // 返回应该触发attributeChangedCallback()执行的属性
      return ["bar"];
    }
    get bar() {
      return this.getAttribute("bar");
    }
    set bar(value) {
      this.setAttribute("bar", value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        console.log(`${oldValue} -> ${newValue}`);
        this[name] = newValue;
      }
    }
  }
  customElements.define("x-foo", FooElement);
  document.body.innerHTML = `<x-foo bar="false"></x-foo>`;
  // null -> false
  document.querySelector("x-foo").setAttribute("bar", true);
  // false -> true
}

function fun9(str1, str2) {
  setTimeout(() => {
    throw new Error("error！！！！！！！！！！");
  }, 1000);
  window.onerror = (message, url, line) => {
    console.log("12313", message);
    return false;
  };

  const image = new Image();
  image.addEventListener("load", (event) => {
    console.log("Image loaded!");
  });
  image.addEventListener("error", (event) => {
    console.log("Image not loaded!");
  });
  image.src = "doesnotexist.gif";

  function concat(str1, str2, str3) {
    let result = str1 + str2;
    if (str3) {
      // 不要!
      result += str3;
    }
    return result;
  }
  let msg = concat("12", 2, 0);
  console.log(msg);

  function log(message) {
    // 这个函数的词法作用域会使用这个实例
    // 而不是window.console
    var my_name = "John";
    let console = document.getElementById("debuginfo");
    if (console === null) {
      console = document.createElement("div");
      console.id = "debuginfo";
      console.style.background = "#dedede";
      console.style.border = "1px solid silver";
      console.style.padding = "5px";
      console.style.width = "400px";
      console.style.position = "absolute";
      console.style.right = "0px";
      console.style.top = "0px";
      document.body.appendChild(console);
    }
    console.innerHTML += `<p> ${message}</p>`;
  }
  log("错误error！！！！！！");
}

function fun10() {
  let book = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas", "Matt Frisbie"],
    edition: 4,
    year: 2017,
  };
  let jsonText = JSON.stringify(book, null, 4);
  console.log(jsonText);

  let bookCopy = JSON.parse(jsonText);
  console.log(bookCopy);

  let book1 = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas", "Matt Frisbie"],
    edition: 4,
    year: 2017,
  };
  let jsonText1 = JSON.stringify(
    book1,
    (key, value) => {
      switch (key) {
        case "authors":
          return value.join(",");
        case "year":
          return 5000;
        case "edition":
          return undefined;
        default:
          return value;
      }
    },
    "-->"
  );
  let jsonText2 = JSON.stringify(book, ["title", "edition"], 4);
  console.log(jsonText1);
  console.log(jsonText2);
}

function addURLParam(url, name, value) {
  url += url.indexOf("?") == -1 ? "?" : "&";
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url;
}

//网络请求
function fun11() {
  //get
  function getData() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          console.log(xhr.responseText);
        } else {
          console.log("Request was unsuccessful: " + xhr.status);
        }
      }
    };
    xhr.open("get", "http://httpbin.org/json", true);
    xhr.send(null);
  }

  //post
  function submitData() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          alert(xhr.responseText);
        } else {
          alert("Request was unsuccessful: " + xhr.status);
        }
      }
    };
    xhr.open("post", "postexample.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let form = document.getElementById("user-info");
    xhr.send(serialize(form));
  }

  //progroess
  function progress() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function (event) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        alert(xhr.responseText);
      } else {
        alert("Request was unsuccessful: " + xhr.status);
      }
    };
    xhr.onprogress = function (event) {
      let divStatus = document.getElementById("status");
      if (event.lengthComputable) {
        21;
        divStatus.innerHTML =
          "Received " + event.position + " of " + event.totalSize + " bytes";
      }
    };
    xhr.open("get", "altevents.php", true);
    xhr.send(null);
  }

  function formData() {
    let data = new FormData();
    data.append("name", "Nicholas");
    let data1 = new FormData(document.forms[0]);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          alert(xhr.responseText);
        } else {
          alert("Request was unsuccessful: " + xhr.status);
        }
      }
    };
    xhr.open("post", "postexample.php", true);
    let form = document.getElementById("user-info");
    xhr.send(new FormData(form));
  }

  //图片探测，像服务器发送name=Nicholas字段
  function imgDetect() {
    let img = new Image();
    img.onload = img.onerror = function () {
      alert("Done!");
    };
    img.src = "http://www.example.com/test?name=Nicholas";
  }

  function jsonP() {
    function handleResponse(response) {
      console.log(
        `You're at IP address ${response.ip}, which is in ${response.city}, ${response.region_name}`
      );
    }
    let script = document.createElement("script");
    script.src =
      "https://www.sogou.com/suggnew/ajajjson/?callback=handleResponse";
    document.body.insertBefore(script, document.body.firstChild);
  }

  function fetchAPI() {
    fetch("http://httpbin.org/json").then((response) => {
      console.log(response);
      console.log(response.status); // 200
      console.log(response.statusText); // OK
    });
    fetch("http://httpbin.org/json")
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      });
  }

  function sendJson() {
    let payload = JSON.stringify({
      foo: "bar",
    });
    let payload1 = "foo=bar&baz=qux";
    let jsonHeaders = new Headers({
      "Content-Type": "application/json",
    });
    fetch("http://httpbin.org/anything", {
      method: "POST", // 发送请求体时必须使用一种 HTTP 方法\
      body: payload1,
      headers: jsonHeaders,
    });
  }

  function sendFile() {
    let imageFormData = new FormData();
    let imageInput = document.querySelector("input[type='file'][multiple]");
    for (let i = 0; i < imageInput.files.length; ++i) {
      imageFormData.append("image", imageInput.files[i]);
    }
    fetch("/img-upload", {
      method: "POST",
      body: imageFormData,
    });
  }

  navigator.sendBeacon(
    "https://example.com/analytics-reporting-url",
    '{foo: "bar"}'
  );
  let socket = new WebSocket("ws://www.example.com/server.php");
}

//cookie
function clientStorage() {
  function cookie() {
    class CookieUtil {
      static get(name) {
        let cookieName = `${encodeURIComponent(name)}=`,
          cookieStart = document.cookie.indexOf(cookieName),
          cookieValue = null;
        if (cookieStart > -1) {
          let cookieEnd = document.cookie.indexOf(";", cookieStart);
          if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
          }
          cookieValue = decodeURIComponent(
            document.cookie.substring(
              cookieStart + cookieName.length,
              cookieEnd
            )
          );
        }
        return cookieValue;
      }
      static set(name, value, expires, path, domain, secure) {
        let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(
          value
        )}`;
        if (expires instanceof Date) {
          cookieText += `; expires=${expires.toGMTString()}`;
        }
        if (path) {
          cookieText += `; path=${path}`;
        }
        if (domain) {
          cookieText += `; domain=${domain}`;
        }
        if (secure) {
          cookieText += "; secure";
        }
        document.cookie = cookieText;
      }
      static unset(name, path, domain, secure) {
        CookieUtil.set(name, "", new Date(0), path, domain, secure);
      }
    }
    // 设置cookie 18
    CookieUtil.set("name", "Nicholas");
    CookieUtil.set("book", "Professional JavaScript");
    // 读取cookie
    console.log(CookieUtil.get("name")); // "Nicholas"
    console.log(CookieUtil.get("book")); // "Professional JavaScript"
    // 设置有路径、域和过期时间的cookie
    CookieUtil.set(
      "name",
      "jack",
      new Date("January 1, 2010"),
      "/books/projs/",
      "www.wrox.com"
    );
    // 删除刚刚设置的cookie
    CookieUtil.unset("name", "/books/projs/", "www.wrox.com");
    // 设置安全cookie
    CookieUtil.set("name", "Nicholas", null, null, null, true);
  }

  function localStorage1() {
    localStorage.setItem("name", "Nicholas");
    localStorage.book = "Professional JavaScript";
    let name = localStorage.getItem("name");
    let book = localStorage.book;
    //可以使用如下代码监听 storage 事件:
    window.addEventListener("storage", (event) =>
      console.log("Storage changed for ${event.domain}")
    );
  }

  function indexDB() {
    let user = {
      username: "007",
      firstName: "James",
      lastName: "Bond",
      password: "foo",
    };
    let user2 = {
      username: "008",
      firstName: "James2",
      lastName: "Bond2",
      password: "foo2",
    };
    let user3 = {
      username: "009",
      firstName: "James3",
      lastName: "Bond3",
      password: "foo3",
    };
    let user4 = {
      username: "010",
      firstName: "James4",
      lastName: "Bond4",
      password: "foo4",
    };
    let user5 = {
      username: "011",
      firstName: "James5",
      lastName: "Bond5",
      password: "foo5",
    };
    let db,
      request,
      version = 2;
    request = indexedDB.open("admin", version);
    request.onerror = (event) => {
      console.log(`Failed to open: ${event.target.errorCode}`);
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      //添加数据
      const transaction = db.transaction("users", "readwrite"),
        store = transaction.objectStore("users");
      //add添加重复数据会报错，导致后面的put或者add操作失败，put会重写重复数据，所以不会报错
      store.put(user);
      store.put(user2);
      store.put(user3);
      store.put(user4);
      store.put(user5);

      //读取 数据
      const request1 = db.transaction("users").objectStore("users").get("007");
      request1.onerror = (event) => {
        console.log("Did not get the object!");
      };
      request1.onsuccess = (event) => {
        console.log(event.target.result.firstName);
      };

      //游标
      const transaction2 = db.transaction("users"),
        store2 = transaction2.objectStore("users"),
        request2 = store2.openCursor();
      request2.onsuccess = (event) => {
        // const cursor = event.target.result;
        // if (cursor) { // 永远要检查
        //     console.log(`Key: ${cursor.key}, Value: ${JSON.stringify(cursor.value)}`);
        //     cursor.continue(); // 移动到下一条记录
        // } else {
        //     console.log("Done!");
        // }
      };

      // 从"007"的下一条记录开始，到"011"的前一条记录停止，也就是查询008，009，010三条记录
      const boundRange = IDBKeyRange.bound("007", "011", true, true);
      const store3 = db.transaction("users").objectStore("users"),
        request = store3.openCursor(boundRange);
      request.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          // 永远要检查
          console.log(
            `Key: ${cursor.key}, Value: ${JSON.stringify(cursor.value)}`
          );
          cursor.continue(); // 移动到下一条记录
        } else {
          console.log("Done!");
        }
      };
    };

    //创建或者指定升级版本号的时候触发
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // 如果存在则删除当前objectStore。测试的时候可以这样做, 但这样会在每次执行事件处理程序时删除已有数据
      if (db.objectStoreNames.contains("users")) {
        db.deleteObjectStore("users");
      }
      db.createObjectStore("users", { keyPath: "username" });
    };
  }
  indexDB();
}

//模块化
// import defaultValue, * as test from "./1.js";
function modularization() {
  function fun1() {
    var globalBar = "fafafssss";
    var Foo = (function (bar) {
      return {
        bar: bar,
        baz: function () {
          console.log(bar);
        },
      };
    })(globalBar);
    Foo.baz();
    console.log(Foo.bar);
  }

  function fun2() {
    // 原始的Foo
    var Foo = (function (bar) {
      var bar = "baz";
      return {
        bar: bar,
      };
    })();
    // 扩展Foo
    var Foo1 = (function (FooModule) {
      FooModule.baz = function () {
        console.log(FooModule.bar);
      };
      return FooModule;
    })(Foo);
    console.log(Foo1.bar); // 'baz'
    Foo.baz(); // 'baz'
  }

  function ES6Modularzation() {
    console.log(test.myfn(), test.myfn1()); // My name is Tom! I'm 20 years old.
    console.log(test.myAge, test.myAge1); // 20
    console.log(test.myName, test.myName1); // Tom
    console.log(test.myClass.a, test.myClass1.a); // yeah!
    console.log(defaultValue, test.default, test.foo); // defaultExport
  }
  ES6Modularzation();
}

function workerThread() {
  function fun1() {}
  // 创建要执行的 JavaScript 代码字符串
  const workerScript = `
    self.onmessage = ({data}) => console.log(data); `;
  // 基于脚本字符串生成 Blob 对象
  const workerScriptBlob = new Blob([workerScript]);
  // 基于Blob实例创建对象URL
  const workerScriptBlobUrl = URL.createObjectURL(workerScriptBlob);
  // 基于对象 URL 创建专用工作者线程
  const worker = new Worker(workerScriptBlobUrl);
  worker.postMessage("blob worker script"); // blob worker script

  function fun2() {
    function fibonacci(n) {
      return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
    }
    const workerScript = ` self.postMessage((${fibonacci.toString()})(9));`;
    const worker = new Worker(URL.createObjectURL(new Blob([workerScript])));
    worker.onmessage = ({ data }) => console.log(data);
  }

  fun2();
}

function fun12() {
  let myMap = new Map();

  let keyObj = {};
  let keyFunc = function () {};
  let keyString = "a string";

  // 添加键
  myMap.set(keyString, "和键'a string'关联的值");
  myMap.set(keyObj, "和键keyObj关联的值");
  myMap.set(keyFunc, "和键keyFunc关联的值");

  const user = {
    data: { name: "sdsd", age: 123 },
    info() {
      console.log(123413);
    },
  };

  // user.data.name = 10
  user.info();
  console.log(user.data.name);
}

function fun13() {
  function User() {}
  // User.__proto__.view = function (){
  //     console.log("类方法")
  // }
  // User.view()
  // console.log(User)
  User.prototype.show = function () {
    console.log("实例方法");
  };
  let user = new User();
  let User1 = user.__proto__.constructor;
  user.show();
  console.dir(User);
  console.dir(user);
  console.dir(new User1());

  console.dir(user.__proto__ === User.prototype);
  // console.dir(Object.getPrototypeOf(user))
  // console.dir(User.prototype)

  Object.prototype.log = function () {
    console.log("object 原型方法");
  };
  // console.dir( Object)
  user.log();
  User.log();

  class parent {
    constructor(name) {
      this.name = name;
    }

    eat() {
      console.log("call eat method");
    }
  }

  let xx = new parent("sdsd");
  xx.eat();
  xx.log();
  // console.dir(xx.__proto__ === parent.prototype)
  // console.dir(xx)
  // console.dir(parent)

  class A {}
  class B extends A {}
  let b = new B();
  let a = new A();

  // console.dir(A)
  // console.dir(B)
  // console.dir(b)
  // console.dir(b instanceof A )
  console.dir(a.isPrototypeOf(b)); //false
  
  let fun = new Function();
  console.log(3123123);
  // console.dir(fun)
  // console.dir( User.__proto__ === Function.prototype)
}

fun13();
