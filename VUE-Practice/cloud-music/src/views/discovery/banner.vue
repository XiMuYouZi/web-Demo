<template lang="">
    <div class="banner">
        <el-carousel :interval="2500" type="card" height="200px">
            <el-carousel-item v-for="item in imgs" :key="item.scm">
                <img :src="item.imageUrl" alt="" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    props: {
        imgs: {
            type: Array,
            default() {
                return [];
            }
        }
    }
    // watch:{
    //     imgs: function (val) {
    //         // console.log("imgs收到賦值", val);
    //      },
    // }
};
</script>

<style scoped lang="less">
.banner {
    height: 200px;
    margin-bottom: 50px;
    margin-top: 20px;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
}
</style>
