<template>
    <div>
        <PageHeader ref="header"></PageHeader>
        <Tabs
            :isShowIndicator="false"
            :isShowBgColor="false"
            :titles="tabs"
            alignType="right"
            @tab-click="tabClick"
        />
        <PlayListCardType :playList="catePlaylistData" />
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="totalPage"
                :page-size="50"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import Tabs from "common-cpn/Tabs";
import * as playList from "network/playList";
import PageHeader from "./header";
import PlayListCardType from "business-cpn/playListCardType";

const tabs = [
    "全部",
    "欧美",
    "华语",
    "流行",
    "说唱",
    "摇滚",
    "民谣",
    "电子",
    "轻音乐",
    "影视原声",
    "ACG",
    "怀旧",
    "治愈",
    "旅行"
];

export default {
    name: "recommendPlaylist",
    data() {
        return {
            catePlaylistData: [],
            category: "全部",
            offset: 0,
            totalPage: 0
        };
    },
    components: {
        Tabs,
        PageHeader,
        PlayListCardType
    },
    created() {
        this.tabs = tabs;
        this.fetchCategoryPlayList(this.category, this.offset);
    },
    methods: {
        tabClick(paras) {
            this.category = paras.title;
            this.fetchCategoryPlayList(this.category, this.offset);
            this.$refs.header.fetchHighqualityPlaylist(this.category)
        },
        fetchCategoryPlayList(cat, offset) {
            playList.categoryPlaylist(cat, offset).then(res => {
                this.catePlaylistData = res.playlists;
                this.totalPage = res.total ;
            });
        },
        handleCurrentChange(val) {
            this.offset = (val-1) * 50;
            this.fetchCategoryPlayList(this.category, this.offset);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.pagination {
  position: relative;
    right: -350px;
    bottom: 30px;
}
</style>
