<template>
    <div class="playListContainer">
        <div class="playListItem" v-for="item in playList" :key="item.id">
            <img :src="item.picUrl" alt="" />
            <span>{{ item.name }}</span>
        </div>
        <!-- 占位标签，为了flex最后一行左对齐 -->
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
    </div>
</template>

<script>
export default {
    name: "recom-Playlist",
    props: {
        playList: {
            type: Array,
            default() {
                return [];
            }
        }
    }
};
</script>

<style lang="less" scoped>
.playListContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 50px;
    margin-top: -10px;

    flex: 1 1 150px;

    & > i {
        width: 150px;
    }
}
.playListItem {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* width: 200px;
    height: 250px; */
    margin-top: 10px;
    margin-left: 10px;
}
img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    margin-top: 10px;
}
span {
    margin-top: 10px;
    width: 150px;
    text-align: center;
    font-size: 0.8rem;
    line-height: 1.2rem;
}
</style>
