<template>
    <div>
        <Tabs
            :isShowIndicator="false"
            :isShowBgColor="false"
            :titles="tabs"
            @tab-click="tabClick"
        />
    </div>
</template>

<script>
import Tabs from "common-cpn/Tabs";

const tabs = ["全部", "欧美", "华语", "流行", "说唱","摇滚","民谣","电子","轻音乐","影视原声","ACG","怀旧","治愈","旅行"];

export default {
  name: 'recommendPlaylist',
  props: {
    msg: String
  },
  components:{
     Tabs
  },
  created() {
    this.tabs = tabs
  },
  methods: {
    tabClick(paras) {
            console.log(paras.index, paras.title);
        }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
