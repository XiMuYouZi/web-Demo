<template>
    <div>
        <h2 class="title">{{message}}</h2>
        <button @click="click">点击</button>
        <h3>嵌套子组件</h3>
        <cpn/>
    </div>
</template>

<script>
import cpn from "./cpn"
export default {
    name:"App",
    data() {
        return {
            message:"xcxcxc"
        }
    },
    methods: {
        click(){
            console.log("click btn")
        }
    },
    components:{
        cpn
    }
    
}
</script>

<style lang="stylus" scoped>
  .title{
        color:red
    }
</style>
