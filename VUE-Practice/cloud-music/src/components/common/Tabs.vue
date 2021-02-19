<template lang="">
    <div :class="align">
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
    name:"Tabs",
    props: {
        titles: {
            type: Array,
            default() {
                return [];
            }
        },
        isShowIndicator: {
            type: Boolean,
            default: true
        },
        isShowBgColor: {
            type: Boolean,
            default: true
        },
        alignType: {
            type: String,
            default: "left"
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
                }
                else if (!this.isShowIndicator && this.isShowBgColor) {
                    return { "active-bg-color": this.currentIndex == index };
                }
                 else if (!this.isShowIndicator && !this.isShowBgColor) {
                    return {
                        "active-no-indicator": this.currentIndex == index
                    };
                } else {
                    return {
                        "active-no-indicator": this.currentIndex == index
                    };
                }
            };
        },
        align() {
            if (this.alignType === "left") {
                return "tabs-cpn-container-align-left";
            } else if (this.alignType === "right") {
                return "tabs-cpn-container-align-right";
            } else {
                return "tabs-cpn-container-align-default";
            }
        }
    },
    data() {
        return {
            currentIndex: 0,
        };
    }
};
</script>

<style lang="less">
.tabs-cpn-container-default {
    overflow: hidden;
}
.tabs-cpn-container-align-left {
    float: left;
    overflow: hidden;
}
.tabs-cpn-container-align-right {
    float: right;
    overflow: hidden;
}

.tabs-cpn {
    margin: 10px 0;
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
    background-color: rgb(247, 216, 212);
    border-radius: 15px;
}
</style>
