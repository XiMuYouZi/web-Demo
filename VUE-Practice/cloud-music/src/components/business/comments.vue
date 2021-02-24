<template>
    <div class="comments">
        <template v-if="loading">
            <Loading :loading="loading" />
        </template>
        <template v-else>
            <div class="block" v-if="shouldHotCommentShow">
                <p class="title">精彩评论</p>
                <Comment
                    v-for="(comment, index) in hotComments"
                    :key="comment.id"
                    :comment="comment"
                    :border="!$utils.isLast(index, hotComments)"
                />
            </div>
            <div class="block" v-if="shouldCommentShow">
                <p class="title" ref="commentTitle">
                    最新评论
                    <span class="count">({{ total }})</span>
                </p>
                <Comment
                    v-for="(comment, index) in comments"
                    :key="comment.id"
                    :comment="comment"
                    :border="!$utils.isLast(index, comments)"
                />
            </div>
            <el-pagination
                :current-page.sync="currentPage"
                :page-size="PAGE_SIZE"
                :total="total"
                class="comments-pagination"
                layout="prev, pager, next"
                @current-change="onPageChange"
            />
        </template>
        <div v-if="!shouldHotCommentShow && !shouldCommentShow">
            还没有评论哦~
        </div>
    </div>
</template>

<script>
import {
    getHotComment,
    getSongComment,
    getMvComment,
    getPlaylistComment
} from "network/comment";
import { getPageOffset, scrollInto } from "@/utils";
import Comment from "./comment";
import Loading from "common-cpn/loading";

const SONG_TYPE = "song";
const PLAYLIST_TYPE = "playlist";
const MV_TYPE = "mv";
const PAGE_SIZE = 20;

export default {
    name:"Comments",
    props: {
        id: {
            type: Number,
            required: true
        },
        type: {
            // song-type, playlist-type, mv-type 之一
            type: String,
            default: SONG_TYPE
        }
    },
    data() {
        return {
            loading: false,
            hotComments: [],
            comments: [],
            total: 0,
            currentPage: 1
        };
    },
    created() {
        this.PAGE_SIZE = PAGE_SIZE;
    },
    methods: {
        async getComment() {
            this.loading = true;
            const commentRequestMap = {
                [SONG_TYPE]: getSongComment,
                [PLAYLIST_TYPE]: getPlaylistComment,
                [MV_TYPE]: getMvComment
            };
            const commentRequest = commentRequestMap[this.type];
            const {
                hotComments = [],
                comments = [],
                total
            } = await commentRequest(
                this.id,
                PAGE_SIZE,
                getPageOffset(this.currentPage, PAGE_SIZE)
            ).finally(() => {
                this.loading = false;
            });

            // 歌单的完整热评需要单独请求接口获取
            if (this.type === PLAYLIST_TYPE && this.currentPage === 1) {
                const {
                    hotComments: exactHotComments = []
                } = await getHotComment(
                    this.id,
                    2 // 歌单type
                );
                this.hotComments = exactHotComments;
            } else {
                this.hotComments = hotComments;
            }
            this.comments = comments;
            this.total = total;
            this.$emit("update", { comments, hotComments, total });
        },
        async onPageChange() {
            await this.getComment();
            this.$nextTick(() => {
                scrollInto(this.$refs.commentTitle);
            });
        }
    },
    watch: {
        id: {
            // 而immediate:true代表如果在 wacth 里声明了 firstName 之后，就会立即先去执行里面的handler方法，
            // 如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行。
            handler(newId) {
                if (newId) {
                    this.currentPage = 1;
                    this.getComment();
                }
            },
            immediate: true
        }
    },
    computed: {
        shouldHotCommentShow() {
            return this.hotComments.length > 0 && this.currentPage === 1;
        },
        shouldCommentShow() {
            return this.comments.length > 0;
        }
    },
    components: {
        Comment,
        Loading
    }
};
</script>

<style lang="less" scoped>
.block {
    margin-bottom: 48px;

    .title {
        font-size: 16px;
        font-weight: 700;
        margin: 60px 0 20px 0px;
        text-align: left;
        .count {
            font-size: 14px;
        }
    }
}

.comments {
    margin-bottom: 70px;
}
</style>
