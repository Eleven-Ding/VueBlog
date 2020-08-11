<template>
  <div class="File">
    <div id="external">
     <h3> 持续更新中....</h3>
      <div v-for="(item,index) in 20" :style="{ animationDelay: (index+1)/10+'s'}" class="inner"></div>
    </div>
    <div class="home-content">
      <el-timeline>
        <el-timeline-item size="large">
          <h1>目前一共有{{ArticleList.length}}篇文章</h1>
        </el-timeline-item>
        <el-timeline-item style="cursor: pointer" @click.native="godetail(activity.id)" @onmouseover.native="change1"
                          v-for="activity in typeList"
                          :key="activity.id"
                          :type="activity.type"
                          :color="color"
                          size="large"
                          :timestamp="activity.date.substring(0,10)+'/'+activity.date.substring(11,19)">
          <span class="title" style="font-weight: 600;">{{activity.title}}</span>
        </el-timeline-item>
      </el-timeline>
      <el-pagination style="text-align: center;padding-bottom: 20px"
                     @current-change="current"
                     :small="!IsPC()"
                     background
                     layout="prev, pager, next"
                     :total="ArticleList.length/10*10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {IsPcMixin} from "@/mixin";
  import {mapState} from 'vuex'

  export default {
    name: "File",
    data() {
      return {
        color: '',
        typeList:[]
      }
    },
    computed: mapState({
      ArticleList: state => state.ArticleList
    }),
    mounted() {
      this.typeList=this.ArticleList.slice(0,10)
    },
    mixins : [IsPcMixin],
    methods: {
      current(index){
        this.changeList(index)
      },
      changeList(page) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        let length = this.ArticleList.length - (page - 1) * 10
        if (length >= 10) {
          this.typeList = this.ArticleList.slice((page - 1) * 10, page * 10)
        } else {
          this.typeList = this.ArticleList.slice((page - 1) * 10, (page - 1) * 10+ length)
        }
        /*这就是截取 0 1*/
      },
      change1() {
        this.color = 'black'
      },
      godetail(id) {

        this.$router.push({
          path: `/home/article/` + id + ``
          /*在这里根据ID来获取*/
        })
      }
    }
  }
</script>

<style scoped>
  .home-content {
    position: relative;
    overflow: hidden;
  }

  .File {
    position: relative;
    padding-top: 20px;
    width: 55%;
    color: #008754;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    border-radius: 10px;
    transition: all .4s linear;
  }

  .title:hover {
    color: #4bbeff;

  }


  #external {

    padding: 0 10px;
    display: flex;
    width: calc(100% - 20px);
    justify-content: space-between;

    /* 这个是来辅助居中的 */
  }

  @keyframes loading {
    0% {
      transform: scaleY(0.1);
      background-color: #fff;
    }
    50% {
      transform: scaleY(1);
      background-color: #2ecc71;
    }
    100% {
      transform: scaleY(0.1);
      background-color: transparent;
    }
  }

  .inner {
    width: 10px;
    height: 80px;
    background-color: #80ff6a;
    border-radius: 10px 10px 0 0;
    display: inline-block;
    animation: loading 1.5s ease-in-out infinite;
    transform-origin: center bottom;
  }


  @media not screen and (min-width: 45em) {
    .File {
      width: 100%;
      margin-top: 20%;
    }
  }

  @media not screen and (min-width: 40em) {
    .File {
      width: 100%;
      margin-top: 40%;
    }
  }
</style>