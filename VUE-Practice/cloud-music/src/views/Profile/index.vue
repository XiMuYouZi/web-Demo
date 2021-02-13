<template>
    <div class="profile-wrapper" >
        <div class="profile-info" v-if="isLogin">
            <img :src="avatarUrl" alt="" />
            <p>{{ nickName }}</p>
        </div>
        <div class="profile-info" v-else>
            <img src="~img/avatar_default.svg" alt="" />
            <p>未登录</p>
        </div>

          <!-- <el-dialog  title="注销登录" :visible.sync="dialogVisible" width="30%">
                <span>要注销登录吗？</span>
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="clickLogout">
                      注销登录
                    </el-button > -->
                <!-- </span> -->
            <!-- </el-dialog> --> 

      
    </div>
</template>

<script>
import { LocalStorageKEY } from "common-cpn/const";
import * as account from "network/account";

export default {
    name: "Profile",
    data() {
        return {
            avatarUrl: "",
            nickName: "",
            dialogVisible:true
        };
    },
    computed: {
        isLogin() {
            let ret = localStorage.getItem(LocalStorageKEY.USERINFO) !== null;
            return ret;
        }
    },
    created() {
      if (this.isLogin){
        let profile = JSON.parse(localStorage.getItem(LocalStorageKEY.USERINFO)) 
        this.avatarUrl = profile.avatarUrl;
        this.nickName = profile.nickname;
      }else{
          this.login()
      }
    },
    methods: {
        async login() {
            let ret = await account.userProfile(316776160);
            let profile = ret.profile
            this.avatarUrl = profile.avatarUrl;
            this.nickName = profile.nickname;
            localStorage.setItem(
                LocalStorageKEY.USERINFO,
                JSON.stringify(profile)
            );
        },
        showDialog() {
          this.dialogVisible = true
        },
        clickLogout(){
           localStorage.removeItem(LocalStorageKEY.USERINFO);
            this.dialogVisible = false
        },
        clickLogin(){
           this.login()
           this.dialogVisible = false
        }

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
    }
    p {
        margin-left: 10px;
        font-size: 0.9rem;
    }
}
</style>
