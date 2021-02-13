<template lang="">
    <div class="tabs-cpn-container">
        <ul class="tabs-cpn">
            <li
                v-for="(title, index) in titles"
                :key="title"
                :class="isSelected(index)"
                @click="tabClick(index, title)"
            >
                {{ title }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        titles: {
            type: Array,
            default() {
                return [];
            }
        },
        isShowIndicator: {
            type: Boolean,
            default: false
        },
        isShowBgColor: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        tabClick(index, title) {
            this.currentIndex = index;
            this.$emit("tab-click", { index, title });
        }
    },
    computed: {
        isSelected() {
            return index => {
                if (this.isShowIndicator && this.isShowBgColor) {
                    return { "active-bg-color": this.currentIndex == index };
                } else if (this.isShowIndicator && !this.isShowBgColor) {
                    return { "active-indicator": this.currentIndex == index };
                } else if (!this.isShowIndicator && !this.isShowBgColor) {
                    return {
                        "active-no-indicator": this.currentIndex == index
                    };
                } else {
                    return {
                        "active-no-indicator": this.currentIndex == index
                    };
                }
            };
        }
    },
    data() {
        return {
            currentIndex: 0
        };
    }
};
</script>

<style lang="less">
.tabs-cpn-container {
    height: 30px;
}
.tabs-cpn {
            float:right;

    li {
        padding: 5px 10px;
        margin: 0px 5px;
        display: inline-block;
        text-decoration: none;
        list-style-type: none;
        &:hover {
            cursor: pointer;
        }
        // &::after{
        //     content: "|";
        // }
    }
}
.active-indicator {
    color: red;
    border-bottom: solid red 1px;
}
.active-no-indicator {
    color: red;
    border-bottom: none;
}
.active-bg-color {
    background-color: rgb(230, 176, 168);
    border-radius: 15px;
}
</style>
