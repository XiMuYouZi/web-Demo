<template>
    <div class="menu-wrapper">
        <Profile />
        <section class="menu-router">
            <router-link to="/discovery" tag="li" active-class="active"
                >发现音乐</router-link
            >
            <router-link to="/recommendPlaylist" tag="li" active-class="active"
                >推荐歌单</router-link
            >
            <router-link to="/latestMusic" tag="li" active-class="active"
                >最新音乐</router-link
            >
            <router-link to="/latestMV" tag="li" active-class="active"
                >最新MV</router-link
            >

            <!-- <router-link :to="'/user/'+userid" replace tag="button" active-class="active">用户</router-link> -->
            <!-- <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link> -->
        </section>

        <div v-show="isLogin">
            <h3>创建的歌单</h3>
            <section>
                <router-link
                    v-for="item in myCreatePlaylist"
                    :to="'/playlistDetail/' + item.id"
                    :key="item.id"
                    tag="li"
                    active-class="active"
                    >{{ item.name }}</router-link
                >
            </section>

            <h3>收藏的歌单</h3>
            <section>
                <router-link
                    v-for="item in myCollectPlaylist"
                    :to="'/playlistDetail/' + item.id"
                    :key="item.id"
                    tag="li"
                    active-class="active"
                    >{{ item.name }}</router-link
                >
            </section>
        </div>
    </div>
</template>

<script>
import Profile from "views/Profile";
import * as playList from "network/playList";
import { LocalStorageKEY } from "common-cpn/const";

export default {
    name: "sideMenus",
    props: {
        msg: String
    },
    components: {
        Profile
    },
    computed: {
        isLogin() {
            let ret = localStorage.getItem(LocalStorageKEY.USERINFO) !== null;
            return ret;
        }
    },
    data() {
        return {
            myCreatePlaylist: [],
            myCollectPlaylist: []
        };
    },
    created() {
        this.fetchMyPlayList();
    },
    methods: {
        async fetchMyPlayList() {
            if (this.isLogin) {
                let profile = JSON.parse(
                    localStorage.getItem(LocalStorageKEY.USERINFO)
                );
                let result = await playList.myPlaylist(profile.userId);
                this.myCreatePlaylist = result.playlist.filter(
                    item => item.creator.userId === profile.userId
                );
                this.myCollectPlaylist = result.playlist.filter(item => {
                    return item.creator.userId !== profile.userId;
                });
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.menu-wrapper {
    // padding-left: 10px;
    text-align: left;
    padding-left: 20px;
    padding-bottom: 130px;
    .menu-router {
        margin-top: 10px;
    }
    h3{
        margin-left: 10px;
    }
    li {
        list-style-type: none;
        padding: 10px 10px;
        text-decoration: none;
        font-size: 0.8rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 1.5rem;
        &:hover {
            background-color: rgb(226, 226, 226);
        }
        &:visited {
            color: red;
        }
    }
    .active {
        color: red;
        background-color: rgb(226, 226, 226);
    }
}
</style>
