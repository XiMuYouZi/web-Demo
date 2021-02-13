<template>
  <div>
    {{playListId}}
  </div>
</template>

<script>
export default {
  name: 'playlistDetail',
  props: {
    msg: String
  },
  computed:{
    playListId(){
      //this.$route当前的活跃路由,如果在user页面，那么活跃路由就是user
      return this.$route.params.playListId
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
