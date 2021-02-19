<template lang="">
    <div class="recom-mv-container">
        <div class="recom-mv-item" v-for="item in recomMVs" :key="item.id" @click="goMV(item.id)">
            <img :src="item.picUrl" alt="" />
            <span>{{ item.name }}</span>
            <span>{{ item.artistName }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        recomMVs: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods:{
        goMV(id){
            this.$router.push(`/mv/${id}`)
        }

    }
};
</script>

<style scoped lang="less">
.recom-mv-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1;
    height: 200px;
    margin-bottom: 20px;

}
.recom-mv-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
    
    img {
        width: 150px;
        height: 100px;
        object-fit: cover;
        border-radius: 10px;
    }
    span {
        // width: 70%;
        // text-align: center;
    }
    span:nth-of-type(1) {
        margin-top: 5px;
        font-size: 0.9rem;
        height: 2rem;
        width: 70%;
        text-align: left;

    }
    span:nth-of-type(2) {
        padding-top: 10px;
        font-size: 0.8rem;
        color: #857f7f;
    }
}
</style>
