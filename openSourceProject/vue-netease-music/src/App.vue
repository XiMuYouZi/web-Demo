<template>
  <div id="app">
    <Layout />
    <Player />
    <MiniPlayer />
    <Playlist />
  </div>
</template>

<script>
import Layout from "@/layout"
import MiniPlayer from "@/components/mini-player"
import Playlist from "@/components/playlist"
import Player from "@/components/player"

export default {
  metaInfo() {
    return {
      title: "网易云音乐"
    }
  },
  name: 'app',
  components: {
    Layout,
    MiniPlayer,
    Playlist,
    Player,
  }
  
}
</script>

<style lang="scss">
#app {
  height: 100%;
  background-color: var(--body-bgcolor);
  font-size: $font-size;
}
</style>
