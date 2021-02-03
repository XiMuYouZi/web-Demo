<template>
  <div class="hello">
    <h2>user标题</h2>
    <p>user内容,user内容,user内容</p>
    <h3>{{userId}}</h3>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    userId(){
      //this.$route当前的活跃路由,如果在user页面，那么活跃路由就是user
      return this.$route.params.userid
    }
  },
  //组件路由
  beforeRouteEnter (to, from, next) {
    console.log("beforeRouteEnter===>user")
    // 访问组件实例
    next(vm => {
        console.log(vm);
    })
  },
  //可以再用户离开之前拦截
  beforeRouteLeave (to, from, next) {
      const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      if (answer) {
        next()
      } else {
        next(false)
      }
  },
  //重用的组件才会调用
  beforeRouteUpdate(to, from, next) {
     console.log("beforeRouteUpdate===>user")
      next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
