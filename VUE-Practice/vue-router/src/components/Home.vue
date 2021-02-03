<template>
  <div class="hello">
    <h2>home标题</h2>
    <p>home内容，home内容，home内容</p>
    <router-link to="/home/news" >新闻</router-link>
    <router-link to="/home/msg" >消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
      return {
        path: '/home/news'
      }
    },
    
    beforeRouteLeave (to, from, next) {
      console.log('beforeRouteLeave======>',from.path);
      this.path = from.path
      next()
    },
    created() {
      console.log('created======>');
    },
    //下面两个函数，只有在App里面对route-view包裹keep-alive标签才会起作用，也就是home组件自身是keep-alive才可以
    activated() {
      console.log('home activated======>');
      this.$router.push(this.path)
    },
    deactivated() {
      console.log('home deactivated======>');
    },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
