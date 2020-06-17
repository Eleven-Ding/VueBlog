<template>
  <div class="login-wrap">
    <div class="login" v-show="$store.getters.getLogin">
      <i class="el-icon-back backLogin" v-show="isRegister" @click="goLogin"></i>
      <div class="close"><i class="el-icon-close" @click="close"></i></div>
      <div class="login-cin">
        <el-input prefix-icon="el-icon-s-custom" style="width: 60%" placeholder="4到12位(字母,数字,下划线,减号)" v-model="user"
                  clearable></el-input>
        <el-input prefix-icon="el-icon-lock" style="width: 60%" placeholder="4到12位(字母,数字,下划线,减号)" v-model="key"
                  show-password></el-input>
        <el-button type="primary" round @click.native="login" :loading="loading" >{{isRegister?'注册':'登录'}}</el-button>
      </div>
      <div class="register" v-show="!isRegister" @click="goRegister">没有账号?/注册...</div>
    </div>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "Login",
    data() {
      return {
        isRegister:false,/*用这个来判断是注册还是登录*/
        user: '',
        key: '',
        loading:false
      }
    },
    methods: {
      goLogin(){
        this.isRegister=false
      },
      goRegister(){
        this.isRegister=true
      },
      close() {
        this.$store.dispatch('changeLogin', false)
      },
      login() {
        /*都用同一个正则*/
        var uPattern = /^[a-zA-Z0-9_-]{4,12}$/;
        if (this.user === '' || this.key === '') {
          this.$message.error('用户名和密码不能为空!');
        } else if (!uPattern.test(this.user)) {
          this.$message.error('用户名格式错误!');
          this.user = ''
        } else if (this.key.includes("'")||this.key.includes('"')) {
          this.$message.error('密码格式错误!');
          this.key = ''
        }else{
          /*如果是登录*/
          if(!this.isRegister){
            /*验证完了再登录 从数据库验证*/
            this.loading=true
            request({
              url:'/login',
              method:'POST',
              data:{
                user:this.user,
                password:this.key
              }
            }).then(res=>{
              console.log(res);
              this.loading=false
              if(!res.symbol){
                this.$message.error('密码错误!');
                this.key = ''
              }else{
                /*在这里保存用户的type 之后用type来判断这个是不是博主*/
                this.$store.dispatch('saveType',res.Info.type)
                this.$message({
                  message: '密码正确，登录成功!',
                  type: 'success'
                });
                this.user = ''
                this.key = ''
                /*把登录隐藏起来*/
                this.$store.dispatch('changeLogin',false)
                /*把username存起来*/
                this.$store.dispatch('changeUsername',res.Info.user)
              }
            })
          }else{
            /*如果是注册 发送网络请求*/
            this.loading=true
            console.log('注册');
            request({
              url:'/login/register',
              method:'POST',
              data:{
                user:this.user,
                password:this.key
              }
            }).then(res=>{
              this.loading=false
              console.log(res);
              if(res.symbol){
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.user=''
                this.key=''
                this.isRegister=false
              }else{
                this.$message.error(res.msg);
                this.key=''
              }
            })
          }
        }
      }
    }
  }
</script>

<style scoped>

  .login {
    z-index: 999;
    border-radius: 5px;
    position: fixed;
    width: 30%;
    height: 35%;
    background-color: rgba(241, 241, 241, 0.67);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .login-cin {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 60%;
    justify-content: space-between;
    margin-top: 10%;
  }

  .close {
    font-size: 17px;
    color: #404040;
    justify-content: flex-end;
    padding: 7px 7px;
    display: flex;
  }

  .close i {
    list-style: none;
    cursor: pointer;
  }
  .register{
    position: absolute;
    right: 0;
    color: #409EFF;
    cursor: pointer;
    font-size: 15px;
  }
  .backLogin{
    color: #5f5f5f;
    font-size: 25px;
    position: absolute;
    top:6%;
    left: 4%;
    cursor: pointer;
  }
  @media not screen and (min-width: 45em) {
    .login{
      width: 80%;
      min-height: 200px;
      background-color: rgba(242, 242, 242, 0.89);
    }
    .login-cin{

    }
  }
</style>