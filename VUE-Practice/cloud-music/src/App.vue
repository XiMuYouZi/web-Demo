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
                <keep-alive exclude="Profile,User">
                    <router-view />
                </keep-alive>
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

export default {
    components: {
        Header,
        Menu,
        MiniPlayer
    },
    data() {
        return {
            titles: ["12313", "1233", "wddsd", "3ee"]
        };
    },
    methods: {}
};
</script>

<style lang="less" scoped>
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
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
    }

    footer {
        width: 100vw;
        height: 60px;
        background-color: rgb(21, 151, 43);
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
        margin-top: 50px;
        margin-bottom: 30px;
        nav {
            width: 250px;
            height: 100%;
            background-color: rgb(237, 237, 237);
            position: fixed;
            left: 0;
            top: 50px;
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
