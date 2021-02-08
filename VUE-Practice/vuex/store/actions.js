// actions定义的都是异步操作
export default {
  asyncUpdateInfo(context, payload) {
    console.log(context);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit("updateInfo", payload);
        // 完成后的回调
        resolve("12333");
      }, 3000);
    });
  }
};
