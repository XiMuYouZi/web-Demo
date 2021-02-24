<template>
    <div id="app">
        <header>
            <!-- <Header></Header> -->
        </header>

        <center>
            <nav v-show="isMenuShow">
                <Menu></Menu>
            </nav>
            <main>
                <keep-alive exclude="Profile,User">
                    <router-view />
                </keep-alive>
            </main>
        </center>

        <footer>
            <MiniPlayer></MiniPlayer>
        </footer>
        <BigPlayer />
        <SidePlaylist />
    </div>
</template>

<script>
// import Header from "@/views/header";
import Menu from "@/views/menu/menu";
import MiniPlayer from "@/views/miniPlayer/miniPlayer";
import BigPlayer from "@/views/bigPlayer/bigPlayer";
import SidePlaylist from "@/views/sidePlaylist/sidePlaylist";
import variablesWhite from "style/variables-white"
import { mapState } from "@/store/helper/music";


export default {
    components: {
        Menu,
        MiniPlayer,
        BigPlayer,
        SidePlaylist
    },
    data() {
        return {
            titles: ["12313", "1233", "wddsd", "3ee"]
        };
    },
    created() {
        this.changeTheme()
    },
    computed:{
        ...mapState(["isMenuShow"]),
    },
    methods: {
        changeTheme() {
            const theme = variablesWhite;
            Object.keys(theme).forEach(key => {
                const value = theme[key];
                document.documentElement.style.setProperty(key, value);
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "~style/base.css";

#app {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 100%;

    header {
        width: 100vw;
        height: 0px;
        background-color: red;
        position: fixed;
        left: 0;
        top: 0;
        // z-index: 100;
    }

    footer {
        width: 100vw;
        height: 60px;
        position: fixed;
        left: 0;
        top: calc(100% - 60px);
        z-index: 100;
    }
    center {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 0px;
        margin-bottom: 30px;
        nav {
            width: 250px;
            height: 100%;
            background-color: rgb(237, 237, 237);
            position: fixed;
            left: 0;
            top: 0px;
            overflow: scroll;
        }
        main {
            flex: 1;
            height: 100%;
            padding-left: 250px;
            min-width: 650px;
        }
    }
}
</style>
