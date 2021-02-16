<template>
  <div>
    {{playListId}}
  </div>
</template>



<script>
import * as playListAPI from 'network/playList'

export default {
  name: 'playlistDetail',
  props: {
    msg: String
  },
  computed:{
    playListId(){
      return this.$route.params.playListId
    }
  },
  created() {
    this.fetchPlaylistDetail(this.playListId)
  },
  activated() {
            console.log(2222222333);

  },
   beforeRouteEnter (to, from, next) {
    console.log("beforeRouteEnter===>user")
    // 访问组件实例
    next(vm => {
        console.log(vm);
    })
  },
  methods: {
    fetchPlaylistDetail(id){
      playListAPI.playlistDetail(id).then(res =>{
        console.log(res);
      })
    }
  },
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
