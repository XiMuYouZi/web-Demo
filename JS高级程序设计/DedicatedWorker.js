let factorialWorker = function () {
    function factorial(n) {
        let result = 1;
        while (n) {
            result *= n--;
        }
        return result;
    }

    self.onmessage = ({data}) => {
        self.postMessage(`${data}! = ${factorial(data)}`);
    };
}


let BroadcastChannelWorker = function () {
    const channel = new BroadcastChannel('worker_channel');
    channel.onmessage = ({data}) => {
        console.log(`heard ${data} in worker`);
        channel.postMessage('bar');
    }
};


let MessageChannelWoker = function () {
    // 在监听器中存储全局messagePort
    let messagePort = null;

    function factorial(n) {
        let result = 1;
        while (n) {
            result *= n--;
        }
        return result;
    }

// 在全局对象上添加消息处理程序
    self.onmessage = ({ports}) => {
        // 只设置一次端口
        if (!messagePort) {
            // 初始化消息发送端口， // 给变量赋值并重置监听器
            messagePort = ports[0];
            self.onmessage = null;
            // 在全局对象上设置消息处理程序
            messagePort.onmessage = ({data}) => {
                // 收到消息后发送数据
                messagePort.postMessage(`${data}! = ${factorial(data)}`);
            };
        }
    };
}


//多worker之间传递数据
let multiMessageChannelWoker = function () {
    let messagePort = null;
    let contextIdentifier = null;

    function addContextAndSend(data, destination) { // 添加标识符以标识当前工作者线程
        data.push(contextIdentifier);
// 把数据发送到下一个目标
        destination.postMessage(data);
    }

    self.onmessage = ({data, ports}) => { // 如果消息里存在端口(ports)
// 则初始化工作者线程
        if (ports.length) {
// 记录标识符
            contextIdentifier = data;
// 获取MessagePort
            messagePort = ports[0];
// 添加处理程序把接收的数据
// 发回到父页面
            messagePort.onmessage = ({data}) => {
                addContextAndSend(data, self);
            }
        } else {
            addContextAndSend(data, messagePort);
        }
    };
}

//可转移对象
let transferableObjectsWorker = function () {
    self.onmessage = ({data}) => {
        console.log(`worker's buffer size: ${data.foo.bar.byteLength}, ${data.foo.baz.byteLength}`); // 32
    };
};


let shareArrBufferWorker = function () {
    self.onmessage = ({data}) => {
        const view = new Uint8Array(data);
        console.log(`buffer value before worker modification: ${view[0]}`);
// 工作者线程为共享缓冲区赋值
        view[0] += 1;
// 发送空消息，通知赋值完成
        self.postMessage(null);
    };
};


//工作者线程池
let workThreadPoolWorker = function () {
    self.onmessage = ({data}) => {
        let sum = 0;
        let view = new Float32Array(data.arrayBuffer)
// 求和
        for (let i = data.startIdx; i < data.endIdx; ++i) {
// 不需要原子操作，因为只需要读
            sum += view[i];
        }
// 把结果发送给工作者线程
        self.postMessage(sum);
    };
// 发送消息给TaskWorker,通知工作者线程准备好接收任务了
    self.postMessage('ready');
}();

