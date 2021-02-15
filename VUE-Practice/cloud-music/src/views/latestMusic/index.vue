<template>
    <div>
        <Tabs
            :isShowIndicator="false"
            :isShowBgColor="false"
            :titles="tabs"
            alignType="right"
            @tab-click="tabClick"
        />

        <el-table class="latest-music-table" :data="tableData" style="width: 100%">
            <el-table-column prop="id" width="100px"> </el-table-column>
            <el-table-column prop="img" >
                <template slot-scope="scope">
                    <img class="latest-music-table-img" :src="scope.row.img" min-width="70" height="70" />
                </template>
            </el-table-column>
            <el-table-column prop="name" > </el-table-column>
            <el-table-column prop="album" > </el-table-column>
            <el-table-column prop="duration"  > </el-table-column>
        </el-table>
    </div>
</template>



<script>
import Tabs from "common-cpn/Tabs";
import * as playList from "network/playList";
import {calcDurationStr} from "common-cpn/untils"

const tabs = ["全部", "欧美", "华语", "日本", "韩国"];

export default {
    name: "latestMusic",
    props: {
        msg: String
    },
    components: {
        Tabs
    },
    created() {
        this.tabs = tabs;
        this.fetchLatestMusic(this.category);
    },
    methods: {
        tabClick(paras) {
            this.category = paras.title;
            switch (this.category) {
                case "全部":
                    this.category = 0;
                    break;
                case "欧美":
                    this.category = 96;
                    break;
                case "华语":
                    this.category = 7;
                    break;
                case "日本":
                    this.category = 8;
                    break;
                case "韩国":
                    this.category = 16;
                    break;
                default:
                    break;
            }
            this.fetchLatestMusic(this.category);
        },
        fetchLatestMusic(type) {
            playList.latestMusic(type).then(res => {
                let data = res.data;
                data.map((item, index) => {
                    let tabRowData = {
                        id: index + 1,
                        img: item.album.picUrl,
                        name: item.name,
                        album: item.album.name,
                        duration:calcDurationStr(item.duration)  
                    };
                    this.tableData.push(tabRowData);
                });
            });
        }
    },
    data() {
        return {
            category: "0",
            tableData: []
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .latest-music-table{
        padding-bottom: 50px;
    }
    .latest-music-table-img{
        border-radius: 5px;
    }
</style>
