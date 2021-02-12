<template>
    <div class="discovery">
        <Banner :imgs="bannersData" />

        <h2>推荐歌单</h2>
        <RecomPlaylist :playList="recomPlaylitsData" />

        <h2>最新音乐</h2>
        <LatestMusic :latestMusic="latestMusicsData" />

        <h2>推荐MV</h2>
        <RecomMV :recomMVs="recomMVData" />
    </div>
</template>

<script>
import Banner from "./banner";
import LatestMusic from "./latest-music";
import RecomMV from "./recom-mv";
import RecomPlaylist from "./recom-playlist";
import * as discovery from "network/discovery";

export default {
    name: "discovery",
    props: {},
    components: {
        Banner,
        LatestMusic,
        RecomMV,
        RecomPlaylist
    },
    data() {
        return {
            bannersData: [],
            latestMusicsData: [],
            recomMVData: [],
            recomPlaylitsData: []
        };
    },
    created() {
        discovery.banner().then(res => {
            this.bannersData = res.banners;
        });
        discovery.recommendPlaylist().then(res => {
            this.recomPlaylitsData = res.result;
        });
        discovery.latestMusic().then(res => {
            this.latestMusicsData = res.result;
        });
        discovery.recommMV().then(res => {
            this.recomMVData = res.result;
        });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.discovery {
    margin-left: 30px;
    margin-right: 30px;
    height: 100%;
}

h2 {
    text-align: left;
    margin-left: 10px;
}
</style>
