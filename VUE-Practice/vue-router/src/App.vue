<template>
  <div id="app"> 
    <!-- 通过route-link标签跳转 -->
    <router-link to="/home" replace tag="button" active-class="active">首页</router-link>
    <router-link to="/about" replace tag="button" active-class="active">关于</router-link>

    <!-- 动态传入参数 -->
    <router-link :to="'/user/'+userid" replace tag="button" active-class="active">用户</router-link>
    <router-link :to="url" replace tag="button" active-class="active">个人</router-link>

    <!-- 通过代码跳转 -->
    <!-- <button @click="jumpToHome">首页</button>
    <button @click="jumpToAbout">关于</button> -->

<!-- 页面不会被destory，而是会被缓存, exclude：匹配组件的name属性，匹配的组件不被缓存，include：匹配的组件被缓存 -->
     <keep-alive exclude="Profile,User">
            <!-- router-view标签会被路由渲染出来的页面替换，一个占位符 -->
         <router-view/>
     </keep-alive>

  </div>
</template>



<script>
export default {
  name: 'App',
  methods: {
    jumpToHome(){
      // this.$router.push("/Home")
      this.$router.replace("/Home")
    },
    jumpToAbout(){
      this.$router.push("/About")
    }
  },
  data() {
    return {
      userid:'ximu13123',
      url:{
        path:"/profile",
        query:{
          name:"ximu",
          age:19,
          sex:"男"
        }
      }
    }
  },
}
</script>



<style>
  #app {

  }
  .active{
    color: red;
  }
</style>
