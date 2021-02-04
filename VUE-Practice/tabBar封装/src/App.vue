<template>
  <div id="app">
    <tab-bar>
      <tab-bar-item path="/home" textColor="blue">
        <img src="./assets/img/home-default.png" slot="item-img-default">
        <img src="./assets/img/home-selected.png" slot="item-img-selected">
        <div slot="item-text">
          首页
        </div>
      </tab-bar-item>

      <tab-bar-item path="/category">
        <img src="./assets/img/category-default.png" slot="item-img-default">
        <img src="./assets/img/category-selected.png" slot="item-img-selected">
        <div slot="item-text">
          分类
        </div>
      </tab-bar-item>

      <tab-bar-item path="/cart">
        <img src="./assets/img/cart-default.png" slot="item-img-default">
        <img src="./assets/img/cart-selected.png" slot="item-img-selected">
        <div slot="item-text">
          购物车
        </div>
      </tab-bar-item>

      <tab-bar-item path="/profile">
        <img src="./assets/img/profile-default.png" slot="item-img-default">
        <img src="./assets/img/profile-selected.png" slot="item-img-selected">
        <div slot="item-text">
          我的
        </div>
      </tab-bar-item>
    </tab-bar>

    <router-view/>
  </div>
</template>

<script>
  import TabBar from "./components/TabBar"
  import TabBarItem from "./components/TabBarItem"

  export default {
    name: 'App',
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
