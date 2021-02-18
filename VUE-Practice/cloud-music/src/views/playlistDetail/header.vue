<template>
    <div class="header" v-if="playlist.id">
        <div class="img-wrap">
            <img :src="playlist.coverImgUrl" />
        </div>
        <div class="content">
            <div class="title-wrap">
                <p class="title">{{ playlist.name }}</p>
            </div>

            <div class="creator-wrap">
                <img :src="playlist.creator.avatarUrl" class="avatar" alt="" />
                <p class="creator">{{ playlist.creator.nickname }}</p>
                <p class="create-time">
                    {{ $utils.formatDate(playlist.createTime, "yyyy-MM-dd") }}
                    创建
                </p>
            </div>

            <div class="action-wrap">
                <button @click="playAll" class="button">
                    <span class="middle">播放全部</span>
                </button>
            </div>

            <div class="desc-wrap">
                <p class="desc" v-if="tagsText">
                    <span>标签：{{ tagsText }}</span>
                </p>
                <p class="desc" v-if="playlist.description">
                    <span class="value">简介：{{ playlist.description }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        playlist: {
            type: Object,
            default: () => ({})
        },
        songs: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        playAll() {
            console.log("playAll");
            // this.setPlaylist(this.songs)
            // this.startSong(this.songs[0])
        }
    },
    computed: {
        tagsText() {
            return this.playlist.tags.join("/");
        }
    }
};
</script>

<style lang="less" scoped>
.header {
    display: flex;
    padding: 36px;

    .img-wrap {
        width: 200px;
        height: 200px;
        margin-right: 24px;

        img {
            width: 200px;
            height: 200px;
            border-radius: 5px;
        }
    }

    .content {
        .title-wrap {
            .title {
                font-size: 20px;
                color: black;
                margin: 0 0;
                text-align: left;
                padding-bottom: 10px;
            }
        }

        .creator-wrap {
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            .avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 8px;
            }

            .creator {
                margin-right: 8px;
            }

            .create-item {
                font-size: 14px;
            }
        }

        .action-wrap {
            display: flex;
            .button {
                background-color: #f95043;
                background: linear-gradient(
                    to right,
                    #fa5143,
                    #f44d41,
                    #d53b32
                );
                width: 116px;
                height: 40px;
                color: #fbdfdd;
                border: none;
                border-radius: 5px;
            }
        }

        .desc {
            display: flex;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}
</style>
