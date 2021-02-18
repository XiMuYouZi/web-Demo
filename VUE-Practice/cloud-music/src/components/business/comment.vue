<template>
  <div class="comment">
    <div class="avatar">
      <img :src="comment.user.avatarUrl">
    </div>
    <div class="content" :class="{ border }">
      <p class="comment-text">
        <span class="username">{{ comment.user.nickname }}:</span>
        <span class="text">{{ comment.content }}</span>
      </p>
      <div class="replied" v-if="comment.beReplied.length">
        <p class="comment-text">
          <span class="username">
            {{ comment.beReplied[0].user.nickname }}
          </span>
          <span class="text">{{ comment.beReplied[0].content }}</span>
        </p>
      </div>
      <div class="bottom">
        <span class="date">{{ $utils.formatDate(comment.time )}}</span>
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
  props: ["comment", "border"]
}
</script>

<style lang="less" scoped>
.comment {
  display: flex;
  padding-top: 20px;

  .avatar {
    width:40px;
    height: 40px;
    margin-right: 12px;

    img {
      border-radius: 50px;
    }
  }

  .content {
    padding-bottom: 20px;
    width: 100%;
    font-size: 14px;

    &.border {
      border-bottom: 1px solid #f2f2f2;
    }

    .replied {
      padding: 8px;
      margin-top: 8px;
      background: #2a2a2a;
      border-radius: 4px;
    }

    .comment-text {
      .username {
        display: inline-block;
        margin-right: 4px;
        color: rgb(108, 145, 185);
      }

      .text {
        line-height: 1.5;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;

      .date {
        color: #727272;
      }

      .actions {
        color: #bebebe;
      }
    }
  }
}
</style>