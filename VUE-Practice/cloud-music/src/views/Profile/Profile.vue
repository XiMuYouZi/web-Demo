<template>
    <div class="profile-wrapper">
        <div class="profile-info" v-if="isLogin">
            <img :src="avatarUrl" alt="" />
            <p>{{ nickName }}</p>
        </div>
        <div class="profile-info" v-else>
            <img src="~img/avatar_default.svg" alt="" />
            <p>未登录</p>
        </div>
    </div>
</template>

<script>
import {
    mapActions as mapUserActions,
    mapState as mapUserState,
    mapGetters as mapUserGetters
} from "@/store/helper/user";

export default {
    name: "Profile",
    data() {
        return {
            avatarUrl: "",
            nickName: "",
            dialogVisible: true,
            uid: "39253526"
        };
    },
    computed: {
        ...mapUserState(["user"]),
        ...mapUserGetters(["isLogin"])
    },
    async created() {
        await this.login(this.uid);
        this.$emit('fetchUserInfoSuccess')
        let profile = this.user;
        this.avatarUrl = profile.avatarUrl;
        this.nickName = profile.nickname;
    },
    methods: {
        showDialog() {
            this.dialogVisible = true;
        },
        clickLogout() {
            this.logout();
            this.dialogVisible = false;
        },
        clickLogin() {
            this.login(this.uid);
            this.dialogVisible = false;
        },
        ...mapUserActions(["login", "logout"])
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.profile-wrapper {
    padding-top: 20px;
    padding-left: 10px;
    .profile-info {
        display: flex;
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
    p {
        margin-left: 10px;
        font-size: 0.9rem;
    }
}
</style>
