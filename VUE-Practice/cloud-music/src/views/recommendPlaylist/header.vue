<template lang="">
    <div class="header-wrapper">
        <img class="header-wrapper-bg" :src="headerImg" alt="" />
        <img class="header-wrapper-img" :src="headerImg" alt="" />
        <button class="header-wrapper-btn">精品歌单</button>
        <p class="header-wrapper-title">{{ headerTitle }}</p>
        <p class="header-wrapper-desc">{{ headerDesc }}</p>
    </div>
</template>

<script>
import * as playList from "network/playList";

export default {
    created() {
        this.fetchHighqualityPlaylist("全部");
    },
    data() {
        return {
            headerImg: "",
            headerTitle: "",
            headerDesc: ""
        };
    },
    methods: {
        fetchHighqualityPlaylist(cate) {
            playList.highqualityPlaylist(cate).then(res => {
                this.headerImg = res.playlists[0].coverImgUrl;
                this.headerTitle = res.playlists[0].copywriter;
                this.headerDesc = res.playlists[0].description;
            });
        }
    }
};
</script>

<style lang="less" socpe>
.header-wrapper {
    margin: 10px 10px 0 10px;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 200px;
    .header-wrapper-img {
        width: 160px;
        height: 160px;
        border-radius: 5px;
        position: absolute;
        left: 0;
        top: 30px;
    }
    .header-wrapper-bg {
        position: absolute;
        filter: blur(50px);
        z-index: -10;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .header-wrapper-btn {
        position: absolute;
        left: 170px;
        top: 30px;
        border: solid 2px rgb(218, 128, 25);
        border-radius: 3px;
        padding: 3px 15px;
        background-color: rgb(46, 17, 4);
        color: rgb(218, 128, 25);
    }
    .header-wrapper-title {
        // float: left;
        position: absolute;
        left: 170px;
        top: 60px;
        color: white;
        font-weight: bold;
    }

    .header-wrapper-desc {
        position: absolute;
        left: 170px;
        top: 100px;
        text-align: left;
        font-size: 0.8rem;
        color: #ece3e3;
        padding-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
    }
}
</style>
