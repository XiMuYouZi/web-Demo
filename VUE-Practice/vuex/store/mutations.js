import Vue from "vue";

// mutation定义的都是同步操作
export default {
  increment(state) {
    state.counter++;
  },
  decrement(state) {
    state.counter--;
  },
  addStudent(state, payload) {
    console.log(payload);
    state.students.push(payload);
  },
  updateInfo(state, payload) {
    // 无效的方式：
    // delete staste.info.age
    //address不是初始化时候定义的
    // state.info['address'] = "sdsdsdsdds"

    // 有效的方式
    state.info["age"] = payload.age;
    Vue.set(state.info, "height", payload.height);
    // state.info = {...state.info,'height':10}
    Vue.delete(state.info, "name");
    Vue.set(state.info, "address", payload.address);
  }
};
