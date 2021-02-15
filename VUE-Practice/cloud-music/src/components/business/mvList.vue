<template>
    <div class="playListContainer">
        <div class="playListItem" v-for="item in MVList" :key="item.mvID">
            <img :src="item.cover" alt="" />
            <span>{{ item.name }}</span>
            <span class="playListItem-artist">{{ item.artistName }}</span>
            <span class="playListItem-duration">{{ item.duration }}</span>
            <span class="playListItem-count">{{ item.playCount }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "MVList",
    props: {
        MVList: {
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: repeat(10, 1fr);

    margin: 10px 0 50px 15px;
    grid-column-gap: 10px;
    // height: 500px;
}
.playListItem {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* width: 200px;
    height: 250px; */
    margin-top: 10px;
    margin-left: 10px;
    position: relative;
    overflow: hidden;
    .playListItem-artist {
        color: #aaa3a3;
    }
    .playListItem-duration {
        color: white;
        position: absolute;
        width: 40px;
        top: 0;
        left: 170px;
        color:white;
    }
    .playListItem-count {
        color: white;
        position: absolute;
        bottom: 60px;
        width: 60px;
        right: 50px;
        text-align: right;
        color:white;
    }
    img {
        width: 210px;
        height: 120px;
        border-radius: 10px;
        margin-top: 10px;
    }
    span {
        margin-top: 10px;
        width: 200px;
        text-align: left;
        font-size: 0.8rem;
        line-height: 1.2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>
