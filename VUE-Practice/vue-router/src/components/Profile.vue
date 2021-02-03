<template>
  <div class="hello">
    <h2>Profile页面</h2>
    <h4>{{$route.query.name}}--{{$route.query.age}}--{{$route.query.sex}}</h4>
    
  </div>
</template>s

<script>
export default {
  name: 'Profile',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
   activated() {
      console.log('profile activated======>');
    },
    deactivated() {
      console.log('profile deactivated======>');
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
