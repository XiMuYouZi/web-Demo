<template>
    <div class="comment">
        <div class="avatar">
            <img :src="comment.user.avatarUrl" />
        </div>
        <div class="content" :class="{ border }">
            <p class="comment-text">
                <span class="username">{{ comment.user.nickname }}: </span>
                <span class="text">{{ comment.content }}</span>
            </p>
            <div class="replied" v-if="comment.beReplied.length">
                <p class="comment-text">
                    <span class="username">
                        {{ comment.beReplied[0].user.nickname }}:
                    </span>
                    <span class="text">{{ comment.beReplied[0].content }}</span>
                </p>
            </div>
            <div class="bottom">
                <span class="date">{{ $utils.formatDate(comment.time) }}</span>
                <div class="actions">
                    <Icon :size="12" type="good" />
                    {{ comment.likedCount }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Comment",
    props: ["comment", "border"]
};
</script>

<style lang="less" scoped>
.comment {
    // position: relative;
    display: flex;
    width: 100%;
    .avatar {
        margin: 20px 10px 0 0px;
        img {
            width: 40px;
            height: 40px;
            border-radius: 40px;
        }
    }
    .content {
        flex: 1;
        text-align: left;
        margin-top: 10px;
        .comment-text {
            font-size: 0.8rem;
        }
        .username {
            color: rgb(87, 130, 175);
        }
        .replied {
            .comment-text {
                background-color: rgb(230, 230, 230);
                padding: 10px 5px;
                border-radius: 5px;
                margin: 0 0;
            }
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            color: rgb(199, 203, 206);
            font-size: 0.8rem;
            border-bottom: solid 1px rgb(230, 230, 230);
            padding-bottom: 10px;
            padding-right: 10px;
            margin-top: 15px;
        }
    }
}
</style>
