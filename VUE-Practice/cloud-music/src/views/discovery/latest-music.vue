<template lang="">
    <div id="latest-music-container">
        <div
            class="latest-music-item"
            v-for="(item, index) in latestMusic"
            :key="item.id"
        >
            <span>{{ index }}</span>
            <img :src="item.picUrl" alt="" />
            <span>{{ item.song.name }}</span>
            <span>{{ item.song.artists[0].name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        latestMusic: {
            type: Array,
            default() {
                return [];
            }
        }
    }
};
</script>

<style scoped lang="less">
#latest-music-container {
    height: 500px;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 50px;
    margin-left: 10px;
}

.latest-music-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    left: 20px;
    span:nth-of-type(1) {
        position: absolute;
        left: -20px;
    }
    span:nth-of-type(2) {
        position: absolute;
        top: 20px;
        left: 90px;
    }
    span:nth-of-type(3) {
        position: absolute;
        top: 60px;
        left: 90px;
        font-size: 0.7em;
        color: rgb(97, 100, 95);
    }
}

img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
}
</style>
