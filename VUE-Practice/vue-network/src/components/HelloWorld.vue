<template>
  <div class="hello">
    <img :src="picUrl" alt="">
    <span>{{name}}</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    picUrl: String,
    name: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* width: 200px;
    height: 250px; */
    margin-top: 10px;
  }
  img{
    width: 200px;
    height: 200px;
    border-radius: 10px;

  }
  span{
    margin-top: 5px;
    width: 200px;
    text-align: center;
  }

</style>
