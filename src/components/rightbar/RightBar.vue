<template>
  <div class="right-bar">
    <div class="avat-wrap">
      <div class="user" v-if="!$store.getters.getUsername" @click="goAbout">
        <!--这个也是用判断来决定显示我的头像还是游客头像-->
        <img src="@/assets/img/rightbar/avat.jpg" alt="">
        <span class="username">DShy</span>
      </div>
      <div class="user" v-else>
        <!--这个也是用判断来决定显示我的头像还是游客头像-->
        <img src="@/assets/img/rightbar/avat.jpg" alt="">
        <span class="username">{{$store.getters.getUsername}}</span>
      </div>
      <!--上面-->
      <div class="avat-top">
        <!--到时候这个图片从服务器获取-->
      </div>

      <!--下面-->
      <div class="avat-foot">
        <span class="avat-text">Just GO For It !</span>
      </div>
    </div>


    <div class="hot">
      <div class="artcle"><i class="el-icon-s-opportunity"></i>热门文章</div>
      <div class="item" v-for="(item,index) in list" :key="item.id" @click="GoDetail(item.id)">
        <img :src="item.url" alt="">
        <div class="right">
          <div style="height: 40%;"><span class="title"># {{item.title}}</span></div>
          <div class="right_wrap">
            <span class="time"><i class="el-icon-watch"></i>{{item.date.substring(0,10)}}</span>
            <span class="view"><i class="el-icon-view"></i>{{item.viewcount}}</span>
          </div>
        </div>
      </div>
    </div>


    <div class="cloud">
      <div class="cloud_title" style="font-weight: 600;color: #777777">标签云</div>
      <div class="cloud_wrap">
        <div class="cloud_item" v-for="(cloud,index) in clouds">
          <el-tooltip :content="'该标签下有'+cloud.count+'篇文章'" placement="top">
            <el-button size="mini">{{cloud.type}}</el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "RightBar",
    data() {
      return {
        list: [],
        //标签
        clouds: [],
      }
    },
    methods: {
      goAbout() {
        this.$router.push('/about')
      },
      GoDetail(id) {
        /*考虑到可能单独刷新这个页面 所以用url传参形式 不用param*/
        this.$router.push({
          path: `/home/article/` + id + ``
          /*在这里根据ID来获取*/
        })
      }
    },
    mounted() {
      request('/getArticles').then(res => {
        for (let i = 0; i < res.data.length; i++) {
          let obj = {}
          obj.type = res.data[i].type
          obj.count = 1
          let index = this.clouds.findIndex(item => item.type === obj.type)
          if (index === -1) {
            this.clouds.push(obj)
          } else {
            this.clouds[index].count = this.clouds[index].count + 1
          }
        }
        //遍历data


        this.list = res.data.sort(function (a, b) {
          return b.viewcount - a.viewcount
        }).splice(0, 2)
      })
    }
  }
</script>

<style scoped>
  .cloud_wrap{
    display: flex;
    flex-wrap: wrap;
  }
  .cloud_item{
    margin-left: 8px;
    margin-top: 5px;
  }
  .cloud {
    margin-top: 10px;
    border-radius: 4px;
    padding: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
  }

  .artcle {
    font-weight: 600;
    cursor: pointer;
    color: #6e6e6e;
  }

  .artcle:hover {
    color: #3eb0e0;
    transition: all .2s linear;
  }

  .item {
    display: flex;
    margin-top: 5px;
  }

  .right_wrap {
    width: 80%;
    color: #999999;
    font-size: 12px;
    display: flex;
    justify-content: space-around;
  }

  .hot {
    transition: all .5s linear;
    margin-top: 10px;
    border-radius: 4px;
    padding: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
  }

  .hot img {
    border-radius: 5px;
    height: 70px;
    width: 110px;
    cursor: pointer;
  }

  .right {
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    padding-left: 5px;
  }

  .title {
    transition: all .2s linear;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    position: absolute;
    color: #626262;
    left: 5%;
  }

  .title:hover {
    transition: all .3s linear;
    left: 12%;
    color: #4dadf0;
  }

  .right-bar {
    z-index: 999;
    /*position: fixed;*/
    /*top: 19.5%;*/
    /*right: 13%;*/
    position: absolute;
    right: 13%;
    top: 140px;
    min-width: 100px;
    width: 21%;

    border-radius: 10px;
  }

  .avat-wrap {
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    background: #fff;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .avat-top {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 120px;
    background: url("https://img.cdn.zhengbeining.com/bgc.jpg") no-repeat 50%;
    background-size: cover;
  }

  .avat-foot {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avat-foot .avat-text {
    font-size: 20px;
    font-weight: 600;
    color: #767676;
  }

  .user {
    position: absolute;
    display: flex;
    align-items: center;
    top: 50%;
    left: 15%;
    transform: translateY(-50%);
  }

  .user img {
    position: absolute;
    height: 90px;
    width: 90px;
    border-radius: 50%;
    cursor: pointer;
    transition: all .5s;
  }

  .user .username {
    z-index: 100;
    font-size: 20px;
    font-weight: bold;
    margin-left: 100px;
    margin-top: 20px;
    color: #4d4d4d;
  }

  .user .username:hover {
    color: #409EFF;
    transition: all .5s linear;
    cursor: pointer;
  }

  .user img:hover {
    /*转动*/
    transform: rotate(360deg);
    animation: rotation linear;
  }

  @-webkit-keyframes rotation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @media not screen and (min-width: 70em) {
    .right-bar {
      display: none;
    }
  }
</style>