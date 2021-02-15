<template>
    <div class="latest-mv-wrapper">
        <div class="latest-mv-tab">
            <div class="latest-mv-area-tab">
                <span>地区:</span>
                <Tabs
                    :isShowIndicator="false"
                    :isShowBgColor="true"
                    :titles="areas"
                    alignType="right"
                    @tab-click="areaTabClick"
                />
            </div>
            <div class="latest-mv-type-tab">
                <span>类型:</span>
                <Tabs
                    :isShowIndicator="false"
                    :isShowBgColor="true"
                    :titles="types"
                    alignType="right"
                    @tab-click="typeTabClick"
                />
            </div>
            <div class="latest-mv-order-tab">
                <span>排序:</span>
                <Tabs
                    :isShowIndicator="false"
                    :isShowBgColor="true"
                    :titles="orders"
                    alignType="right"
                    @tab-click="orderTabClick"
                />
            </div>
        </div>

        <MVList :MVList="MVListData" />

        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="totalPage"
                :page-size="40"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import * as mvAPI from "network/mv";
import MVList from "business-cpn/mvList";
import Tabs from "common-cpn/Tabs";
import { calcDurationStr } from "common-cpn/untils";

const areas = ["全部", "内地", "港台", "欧美", "日本", "韩国"];
const types = ["全部", "官方版", "原声", "现场版", "网易出品"];
const orders = ["上升最快", "最热", "最新"];

export default {
    name: "latestMV",
    data() {
        return {
            area: "全部",
            type: "全部",
            order: "上升最快",
            offset: 0,
            MVListData: [],
            totalPage: 0
        };
    },
    components: {
        MVList,
        Tabs
    },
    created() {
        this.areas = areas;
        this.types = types;
        this.orders = orders;
        this.fetchAllMV(this.area, this.order, this.type, this.offset);
    },
    methods: {
        areaTabClick(val) {
            this.area = val.title;
            this.fetchAllMV(this.area, this.order, this.type, this.offset);
        },
        typeTabClick(val) {
            this.type = val.title;
            this.fetchAllMV(this.area, this.order, this.type, this.offset);
        },
        orderTabClick(val) {
            this.order = val.title;
            this.fetchAllMV(this.area, this.order, this.type, this.offset);
        },
        handleCurrentChange(val) {
            this.offset = (val - 1) * 40;
            this.fetchAllMV(this.area, this.order, this.type, this.offset);
        },
        fetchAllMV(area, order, type, offset) {
            mvAPI.allMV(area, order, type, offset).then(res => {
                this.MVListData = [];
                if (this.totalPage == 0) {
                    this.totalPage = res.count;
                }
                let data = res.data;
                data.map(item => {
                    let mvdata = {
                        cover: item.cover,
                        name: item.name,
                        artistName: item.artistName,
                        duration: calcDurationStr(item.duration),
                        playCount: item.playCount,
                        mvID: item.id
                    };
                    this.MVListData.push(mvdata);
                });
            });
        }
    }
};
</script>

<style scoped lang="less">
.latest-mv-wrapper {
    .latest-mv-tab {
        position: relative;
        overflow: hidden;
        height: 150px;
        margin-left: 30px;
        span{
          margin-right: 10px;
          font-weight: bold;
        }
        .latest-mv-area-tab {
            position: absolute;
            left:0;
            top:10px;
            display: flex;
            align-items: center;
        }
        .latest-mv-type-tab {
            position: absolute;
            left:0;
            top:50px;
            display: flex;
            align-items: center;
        }
        .latest-mv-order-tab {
            position: absolute;
            left:0;
            top:90px;
            display: flex;
            align-items: center;
        }
    }

    .pagination {
        position: relative;
        right: -350px;
        bottom: 30px;
    }
}
</style>
