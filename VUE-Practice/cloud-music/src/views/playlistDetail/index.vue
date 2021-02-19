<template>
    <div>
        <Header :playlist="playlist"></Header>
        <Tabs
            class="play-detail-tabs"
            :isShowIndicator="true"
            :isShowBgColor="false"
            :titles="tabs"
            alignType="left"
            @tab-click="tabClick"
        />

        <div class="songlist" v-show="SONG_IDX === activeTab">
            <el-table
                class="play-detail-table"
                :data="songs"
                style="width: 100%"
            >
                <el-table-column label="ID" prop="id" width="100px">
                </el-table-column>
                <el-table-column label="封面" width="140px" prop="img">
                    <template slot-scope="scope">
                        <img
                            class="play-detail-table-img"
                            :src="scope.row.img"
                            min-width="70"
                            height="70"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="name">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                        <img
                            v-show="isShowMV(scope.row.mvID)"
                            class="play-detail-table-mv-ico"
                            src="~img/mv_ico.svg"
                            width="20"
                            height="20"
                            @click="playMV(scope.row.mvID)"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="歌手" width="180px" prop="artistName">
                </el-table-column>
                <el-table-column label="专辑" prop="album"> </el-table-column>
                <el-table-column label="时长" idth="100px" prop="duration">
                </el-table-column>
            </el-table>
        </div>

        <div class="comments" v-show="COMMENT_IDX === activeTab">
            <Comments
                :id="playListId"
                @update="onCommentsUpdate"
                type="playlist"
            />
        </div>
    </div>
</template>

<script>
import * as playListAPI from "network/playList";
import Header from "./header";
// import Tabs from "common-cpn/Tabs";
import { fromatDurationStr } from "common-cpn/utils";
// import Comments from "business-cpn/comments";

const SONG_IDX = 0;
const COMMENT_IDX = 1;

export default {
    name: "playlistDetail",
    components: {
        Header,
        // Tabs,
        // Comments
    },

    data() {
        return {
            songs: [],
            songids: [],
            playlist: {},
            tabs: ["歌曲", "评论(0)"],
            activeTab: SONG_IDX
        };
    },
    computed: {
        playListId() {
            return parseInt(this.$route.params.playListId);
        }
    },
    created() {
        this.SONG_IDX = SONG_IDX;
        this.COMMENT_IDX = COMMENT_IDX;
    },
    methods: {
        async init() {
            const { playlist } = await playListAPI.playlistDetail(
                this.playListId
            );
            this.playlist = playlist;
            let songids = [];
            playlist.trackIds.map(item => {
                songids.push(item.id);
            });
            //只显示前100首
            if (songids.length > 100) {
                songids.splice(100);
            }
            let songidsStr = songids.join(",");
            this.songs.length = 0;
            const { songs } = await playListAPI.songlistDetail(songidsStr);
            songs.map((item, index) => {
                let tabRowData = {
                    id: index + 1,
                    img: item.al.picUrl,
                    name: item.name,
                    artistName: item.ar[0].name,
                    album: item.al.name,
                    mvID: item.mv,
                    duration: fromatDurationStr(item.dt)
                };
                this.songs.push(tabRowData);
            });
        },
        onCommentsUpdate({ total }) {
            this.tabs.splice(COMMENT_IDX, 1, `评论(${total})`);
        },
        tabClick(val) {
            this.activeTab = val.index;
        },
        isShowMV(mvID) {
            return mvID > 0;
        },
         playMV(id){
            this.$router.push(`/mv/${id}`)
        }
    },
    watch: {
        playListId: {
            handler() {
                this.init();
            },
            immediate: true
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.play-detail-tabs {
    margin-left: 20px;
}
.play-detail-table {
    margin-left: 20px;
    margin-bottom: 30px;
}
.comments{
    margin-left: 20px;
    padding-top: 10px;
}
.play-detail-table-mv-ico {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    position: absolute;
    &:hover {
        cursor: pointer;
    }
}
</style>
