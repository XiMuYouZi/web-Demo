
function fun1() {
    const worker = new Worker('./DedicatedWorker.js');
// Worker 可能仍处于初始化状态
// 但postMessage()数据可以正常处理
    worker.postMessage('foo');
    worker.postMessage('bar');
    worker.postMessage('baz');
}

function fun2() {
    const factorialWorker = new Worker('./DedicatedWorker.js');
    factorialWorker.onmessage = ({data}) => console.log(data);
    factorialWorker.postMessage(5);
    factorialWorker.postMessage(7);
    factorialWorker.postMessage(10);
}

function BroadcastChannelMain() {
    const channel = new BroadcastChannel('worker_channel');
    const worker = new Worker('./DedicatedWorker.js');
    channel.onmessage = ({data}) => {
        console.log(`heard ${data} on page`);
    }
    setTimeout(() => channel.postMessage('foo'), 1000);

}

function MessageChannelMain() {
    const channel = new MessageChannel();
    const factorialWorker = new Worker('./DedicatedWorker.js');
// 把`MessagePort`对象发送到工作者线程
// 工作者线程负责处理初始化信道
    factorialWorker.postMessage(null, [channel.port1]);
    // 工作者线程通过信道响应
    channel.port2.onmessage = ({data}) => console.log("MessageChannelMain: ",data);
    // 通过信道实际发送数据
    channel.port2.postMessage(5);
}


function multiWorkerCommunication() {
    const channel = new MessageChannel();
    const workerA = new Worker('./DedicatedWorker.js');
    const workerB = new Worker('./DedicatedWorker.js');
    workerA.postMessage('workerA', [channel.port1]);
    workerB.postMessage('workerB', [channel.port2]);
    workerA.onmessage = ({data}) => {
        console.log(data)
    };
    workerB.onmessage = ({data}) => {
        console.log(data)
    };
    workerA.postMessage(['page']);
// ['page', 'workerA', 'workerB']
    workerB.postMessage(['page'])
// ['page', 'workerB', 'workerA']
}

//可转移对象
function transferableObjects() {
    const worker = new Worker('./DedicatedWorker.js');
    const arrayBuffer = new ArrayBuffer(32);
    const arrayBuffer1 = new ArrayBuffer(64);

    console.log(`page's buffer size: ${arrayBuffer.byteLength}`);
    let s =  {foo: {bar: arrayBuffer,baz:arrayBuffer1}}
    worker.postMessage(s, [arrayBuffer]);
    //bar对象转移到worker，自己该对象为空，baz对象仅仅是复制，自己还存在改对象
    console.log(`page's buffer size: ${s.foo.baz.byteLength},${s.foo.bar.byteLength}`);
}

function shareArrBuffer(){
    const worker = new Worker('./DedicatedWorker.js'); // 创建 1 字节缓冲区
    const sharedArrayBuffer = new SharedArrayBuffer(1);
// 创建 1 字节缓冲区的视图
    const view = new Uint8Array(sharedArrayBuffer);
// 父上下文赋值1
    view[0] = 1;
    worker.onmessage = () => {
        console.log(`buffer value after worker modification: ${view[0]}`);
    };
// 发送对 sharedArrayBuffer 的引用 26
    worker.postMessage(sharedArrayBuffer);

}


class TaskWorker extends Worker {
    constructor(notifyAvailable, ...workerArgs) {
        super(...workerArgs);
        // 初始化为不可用状态
        this.available = false;
        this.resolve = null;
        this.reject = null;
        // 线程池会传递回调, 以便工作者线程发出它需要新任务的信号
        this.notifyAvailable = notifyAvailable;
        // 线程脚本在完全初始化之后, 会发送一条"ready"消息
        this.onmessage = () => this.setAvailable();
    }

// 由线程池调用，以分派新任务
    dispatch({ resolve, reject, postMessageArgs }) {
        this.available = false;
        this.onmessage = ({ data }) => {
            resolve(data);
            this.setAvailable();
        };
        this.onerror = (e) => {
            reject(e);
            this.setAvailable();
        };
        this.postMessage(...postMessageArgs);
    }

    setAvailable() {
        this.available = true;
        this.resolve = null;
        this.reject = null;
        this.notifyAvailable();
    }
}

class WorkerPool {
    constructor(poolSize, ...workerArgs) {
        this.taskQueue = [];
        this.workers = [];
// 初始化线程池
        for (let i = 0; i < poolSize; ++i) {
            this.workers.push(
                new TaskWorker(() => this.dispatchIfAvailable(), ...workerArgs));
        }
    }

// 把任务推入队列
    enqueue(...postMessageArgs) {
        return new Promise((resolve, reject) => {
            this.taskQueue.push({ resolve, reject, postMessageArgs });
             this.dispatchIfAvailable();
        });
    }

// 把任务发送给下一个空闲的线程(如果有的话)
    dispatchIfAvailable() {
        if (!this.taskQueue.length) {
            return;
        }
        for (const worker of this.workers) {
            if (worker.available) {
                let a = this.taskQueue.shift();
                worker.dispatch(a);
                break;
            } }
        }

// 终止所有工作者线程
    close() {
        for (const worker of this.workers) {
            worker.terminate();
        }
    }
}

function threadPool(){
    const totalFloats = 1E8;
    const numTasks = 20;
    const floatsPerTask = totalFloats / numTasks;
    const numWorkers = 4;
// 创建线程池
    const pool = new WorkerPool(numWorkers, './DedicatedWorker.js');
// 填充浮点值数组
    let arrayBuffer = new SharedArrayBuffer(4 * totalFloats);
    let view = new Float32Array(arrayBuffer);
    for (let i = 0; i < totalFloats; ++i) {
        view[i] = Math.random(); }
    let partialSumPromises = [];
    for (let i = 0; i < totalFloats; i += floatsPerTask) {
        partialSumPromises.push(
            pool.enqueue({
                startIdx: i,
                endIdx: i + floatsPerTask, arrayBuffer: arrayBuffer
            })
        );
    }
    // 等待所有期约完成，然后求和
    Promise.all(partialSumPromises)
        .then((partialSums) => partialSums.reduce((x, y) => x + y))
        .then(console.log);

    self.clients.matchAll({includeUncontrolled: true})
    self.onfetch = (fetchEvent) => { fetchEvent.respondWith(fetch(fetchEvent.request));
    };
}



threadPool()



