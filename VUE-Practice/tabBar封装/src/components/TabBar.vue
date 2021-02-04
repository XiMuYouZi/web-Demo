<template lang="">
    <div class="tab-bar">
        <slot></slot>
    </div>
</template>


<script>
export default {
    
}
</script>


<style lang="">
    .tab-bar{
        width: 100vw;
        height: 49px;
        display: flex;
        /* justify-content: center; */
        /* align-items: center; */
        background-color: #f3f3f3;
        box-shadow: 0 -3px 5px rgba(100, 100, 100, 0.5);
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        
    }
    
</style>