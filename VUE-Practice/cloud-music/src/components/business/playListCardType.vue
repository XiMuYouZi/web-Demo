<template>
    <div class="playListContainer">
        <div class="playListItem" v-for="item in playList" :key="item.id">
            <img :src="item.coverImgUrl" alt="" />
            <span>{{ item.name }}</span>
        </div>
    </div>
</template>



<script>
    export default {
        name: "playListCardType",
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
    display: grid;
    grid-template-columns: repeat(6,1fr) ;
    grid-auto-rows: repeat(7,1fr);
   
    margin:50px 0 50px 15px;
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
}
img {
    width: 160px;
    height: 160px;
    border-radius: 10px;
    margin-top: 10px;
    border-radius: 5px;
}
span {
    margin-top: 10px;
    width: 150px;
    text-align: center;
    font-size: 0.8rem;
    line-height: 1.2rem;
}
</style>
