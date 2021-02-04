<template lang="">
    <div class="tab-bar-item"  @click="clickItem">
        <!-- 每个solt都用div包裹起来，然后在div上面应用属性，如果把属性直接应用在slot上面，会被替换后slot属性覆盖 -->
        <div class="img" v-if="!isSelected" >
            <slot name="item-img-default"></slot>
        </div>
         <div class="img" v-else >
            <slot name="item-img-selected"></slot>
        </div>
        
        <div :style="selectedTextColor">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {            
        }
    },
    computed:{
        isSelected(){
            return this.$route.path.indexOf(this.path) != -1
        },
        selectedTextColor(){
            return this.isSelected ? {color:this.textColor} :{}
        }
    },
    props:{
        path:String,
        textColor:{
            type:String,
            default:"red"
        }
    },
    methods: {
        clickItem(){
            this.$router.push(this.path)
        }
    },
}
</script>


<style lang="">
    .tab-bar-item{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .active{
        color:red
    }
    .img{
        display: flex;
        width: 20px;
        height: 20px;
    }
    
</style>