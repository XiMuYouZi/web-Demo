<template>
  <div id="app">
    <header>
      <Header></Header>
    </header>

    <center>
      <nav>
        <Menu></Menu>
      </nav>
      <main>
        <Discovery></Discovery>
      </main>
    </center>

    <footer>
      <MiniPlayer></MiniPlayer>
    </footer>
  </div>
</template>



<script>
import Header from "@/views/header";
import Menu from "@/views/menu";
import MiniPlayer from "@/views/miniPlayer";
import Const from "common-cpn/const";
import Discovery from "@/views/discovery";

export default {
  components: {
    Header,
    Menu,
    MiniPlayer,
    Discovery,
  },
  data() {
    return {
      
    }
  },
};
console.log(Const.a);
</script>



<style lang="less">
@import "~css/base.css";

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  

  header {
    width: 100vw;
    height: 50px;
    background-color: red;
  }

  footer {
    width: 100vw;
    height: 60px;
    background-color: blue;
  }
  center{
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    nav{
      width: 100px;
      background-color: rgb(107, 197, 114);
      height: 100%;
    }
    main{
      flex: 1;
      height: 100%;
    }
  }
}
</style>
