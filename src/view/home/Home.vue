<template>
  <div class="home">

    <div class="home-artcles"
         v-for="(item,index) in currentList" :key="item.id" @click="GoDetail(item.id)">

      <div class="loading" v-if="!loading">
        <i class="el-icon-loading"></i>
      </div>

      <div class="newdsy" v-else>
        <img :src="item.url" alt="">
        <div class="content-wrap">
          <div class="title">{{item.title||标题}}</div>
          <div>
            <div class="summery">{{item.summery||摘要}}</div>
            <hr size="1">
          </div>
          <div class="msg-wrap">
            <div class="date">{{item.date|Time}}</div>
            <div class="content"><i class="el-icon-view"></i>{{item.viewcount}}次</div>
          </div>
        </div>
      </div>
    </div>
    <el-pagination style="@media not screen and (min-width: 45em) { }
     display: inline-block;left: 50%;transform: translateX(-50%);position: absolute;bottom: 5%"
                   @current-change="current"
                   background
                   layout="prev, pager, next"
                   :total="articleList.length/3*10">
    </el-pagination>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "Home",
    data() {
      return {
        articleList: ['', '', ''],
        currentList: ['', '', ''],
        loading: false
      }
    },
    methods: {
      GoDetail(id) {
        /*考虑到可能单独刷新这个页面 所以用url传参形式 不用param*/
        this.$router.push({
          path: `/home/article/` + id + ``
          /*在这里根据ID来获取*/
        })
      },
      changeList(page) {
        let length = this.articleList.length - (page - 1) * 3
        if (length >= 3) {
          this.currentList = this.articleList.slice((page - 1) * 3, page * 3)
        } else {
          this.currentList = this.articleList.slice((page - 1) * 3, (page - 1) * 3 + length)
        }
        /*这就是截取 0 1*/
      },

      current(index) {
        console.log(index);
        this.changeList(index)
      }
    },
    mounted() {
      /*在这里请求数据*/
      request('/getArticles').then(res => {
        /*在这里获取展示的数据*/
        this.articleList = res.data
        this.changeList(1)
        /*取消加载效果*/
        this.loading = true
      })
    },
    filters: {
      Time(time) {
        return time.substring(0, 10) + ' ' + time.substring(11, 19)
      }
    }
  }
</script>

<style scoped>
  .newdsy {
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;


  }

  .loading {
    width: 100%;
    height: 100%;
    font-size: 90px;
    color: #999999;
    display: flex;
    justify-content: center;

  }

  .home {
    position: relative;
    transition: all .3s linear;
    width: 55%;
    min-height: 600px;
    /*height: 600px;*/
  }

  .home-artcles {
    padding: 0 15px;
    cursor: pointer;
    margin-bottom: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    border-radius: 3px;
    height: 160px;
    background-color: white;
    display: flex;
    align-items: center;
    min-width: 600px;

  }

  .content-wrap {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;

  }

  .home-artcles img {
    width: 250px;
    height: 150px;
  }


  .home-artcles .title {
    font-size: 19px;
    font-weight: 600;
    color: #4d4d4d;
  }

  .home-artcles .title:hover {
    color: #409EFF;
    transition: all linear .2s;
  }

  .home-artcles .summery {
    font-size: 14px;
    color: #999999;
  }

  .home-artcles .msg-wrap {
    width: 220px;
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }

  @media not screen and (min-width: 45em) {
    .home {
      height: 990px;
      overflow: hidden;
      margin-top: 20%;
      position: relative;
      transition: all .3s linear;
      width: 100%;
      min-height: 450px;
    }

    .home-artcles img {
      width: 100%;
      height: 180px;
    }

    .home-artcles {
      padding: 0;
      cursor: pointer;
      margin-bottom: 20px;
      box-shadow: 0 0 5px rgba(0, 0, 0, .1);
      border-radius: 3px;
      width: 100px;
      height: 280px;
      background-color: white;
      display: flex;
      align-items: center;
      min-width: 100%;
    }

    .home-artcles .msg-wrap {

      font-size: 12px;
      color: #999;
      display: flex;
      justify-content: space-between;
    }

    .newdsy {
      display: flex;
      flex-direction: column;
    }

    .loading {
      width: 100%;
      height: 100%;
      font-size: 50px;
      color: #999999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

</style>