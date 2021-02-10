<template>
  <div class="app">
    <HelloWorld v-for="item in result" :key="item.id" :picUrl="item.picUrl" :name="item.name">
  </HelloWorld>
  </div>
  
</template>


<script>
import HelloWorld from './components/HelloWorld.vue'
import {getPersonalized} from './network/person'

export default {
  name: 'App',
  data() {
    return {
      result:[]
    }
  },
  components: {
    HelloWorld
  },
  created() {
     getPersonalized().then(res =>{
       this.result = res.result
       console.log(this.result);
     }).catch(err =>{
       console.log(err);
     })
    
  },
}
</script>

<style>
@import "./css/base.css";

.app {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
