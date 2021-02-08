<template>
  <div id="app">
    <h1>--------------app 内容--------------</h1>
    <h3>{{ $store.state.counter }}</h3>
    <button @click="add">+1</button>
    <button @click="sub">-1</button>

    <h1>--------------getters 内容--------------</h1>
    <h4>counter的平方：{{ $store.getters.powerCounter }}</h4>
    <h4>{{ $store.getters.ageGreaterThan20 }}</h4>
    <h4>年龄大于20的人数：{{ $store.getters.ageGreaterThan20Num }}</h4>
    <h4>{{ $store.getters.studentsAgeGreaterThan(40) }}</h4>

    <h1>--------------mutations 内容--------------</h1>
    <button @click="addStudent">添加studen</button>
    <button @click="updateInfo">同步更新信息</button>
    <h3>{{ $store.state.info }}</h3>

    <h1>--------------actions 内容--------------</h1>
    <button @click="asyncUpdateInfo">异步更新信息</button>
    <h3>{{ $store.state.info }}</h3>

    <h1>--------------modulesA 内容--------------</h1>
    <h3>{{ $store.state.moduleA.name }}</h3>
    <button @click="moduleAUpdateName">moduleA mutations同步操作</button>
    <button @click="moduleAAsyncUpdateName">moduleA actions异步操作</button>
    <h3>{{ $store.getters.fullname1 }}</h3>
    <h3>{{ $store.getters.fullname2 }}</h3>
    <h3>{{ $store.getters.fullname3 }}</h3>

    <h1>--------------hello world子组件 内容--------------</h1>
    <HelloWorld />
  </div>
</template>



<script>
import HelloWorld from "./components/HelloWorld";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  methods: {
    add() {
      this.$store.commit("increment");
    },
    sub() {
      this.$store.commit("decrement");
    },
    addStudent() {
      let stu = { id: 10, name: "ttttt", age: 55 };
      this.$store.commit("addStudent", stu);
    },
    updateInfo() {
      let info = { name: "youzi", height: 12, age: 55, address: "wall street" };
      this.$store.commit("updateInfo", info);
    },
    asyncUpdateInfo() {
      let info = { name: "youzi", height: 12, age: 55, address: "wall street" };
      this.$store.dispatch("asyncUpdateInfo", info).then((res) => {
        console.log(res);
      });
    },
    moduleAUpdateName(){
          this.$store.commit("updateName", 'lisi');
    },
    moduleAAsyncUpdateName(){
      this.$store.dispatch('moduleAAsyncUpdateName','nikaita')
    }
  },
};
</script>



<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
