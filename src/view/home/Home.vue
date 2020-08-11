<template>
  <div class="home">

    <div class="home-artcles"
         v-for="item in currentList" :key="item.id" @click="GoDetail(item.id)">
      <div class="newdsy">
        <img v-lazy="item.url" alt="Dshy前端技术小站" :key="item.url" title="Dshy前端技术小站">
        <div class="content-wrap">
          <div class="title">{{item.title||'加载中...'}}</div>
          <div>
            <div class="summery">{{item.summery||'加载中...'}}</div>
            <hr size="0" width="80%" align="left">
          </div>
          <div class="msg-wrap">
            <div class="date">{{item.date|Time}}</div>
            <div class="content"><i class="el-icon-view"></i>{{item.viewcount||0}}次</div>
            <div class="type" :style="{backgroundColor:ColorList[item.type]}"
                 style="color: white;padding: 2px 5px;min-width: 40px;text-align: center;border-radius: 3px">
              {{item.type}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-pagination style="text-align: center;padding-top: 20px"
                   @current-change="current"
                   :small="isPC"
                   background
                   layout="prev, pager, next"
                   :total="typeList.length/4*10">
    </el-pagination>
  </div>
</template>

<script>
  import {IsPcMixin} from "@/mixin";
  import  {mapState} from 'vuex'
  export default {
    name: "Home",
    data() {
      return {
        typeList: Object.freeze([]),
        articleList: Object.freeze(['', '', '', '']),
        currentList: Object.freeze(['', '', '', '']),
        isPC: false
      }
    },
    mixins: [IsPcMixin],
    methods: {
      GoDetail(id) {
        /*考虑到可能单独刷新这个页面 所以用url传参形式 不用param*/
        if (id) {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          this.$router.push({
            path: `/home/article/` + id + ``
            /*在这里根据ID来获取*/
          })
        }
      },
      changeList(page) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        let length = this.typeList.length - (page - 1) * 4
        if (length >= 4) {
          this.currentList = this.typeList.slice((page - 1) * 4, page * 4)
        } else {
          this.currentList = this.typeList.slice((page - 1) * 4, (page - 1) * 4 + length)
        }
        /*这就是截取 0 1*/
      },

      current(index) {
        this.changeList(index)
      },

    },
    mounted() {
      /*在这里请求数据*/
      this.request('/getArticles').then(res => {
        //请求完毕 发送事件
        /*在这里获取展示的数据*/
        this.articleList = res.data.reverse()
        this.$store.dispatch('changeArticleList', res.data)
        this.$bus.$emit('loadOver')
        //这里点击需要类型的文章
        this.typeList = res.data
        this.changeList(1)
        /*取消加载效果*/
      })
      if (!this.IsPC()) {
        this.isPC = true
      }

      this.$bus.$on('changeArticle', (index) => {
        //每次进来之前 都把上次的清除掉
        this.typeList = []
        switch (index) {
          case 0:
            this.typeList = this.articleList
            break
          case 1:
            //对list进行循环
            this.typeList = this.articleList.filter(item => item.type === 'css'
              || item.type === 'Vue' || item.type === "Canvas" || item.type === 'React' || item.type == 'JavaScript' || item.type === 'webpack'
            )

            break
          case 2:
            this.typeList = this.articleList.filter(item => {
              return item.type === 'Node' || item.type === 'HTTP' || item.type === 'DNS' || item.type === 'Websocket'
            })
            break
        }
        this.changeList(1)
      })

      this.$bus.$on('changeArticle2', (type) => {
        this.typeList = this.articleList.filter(item => {
          return item.type === type
        })
        this.changeList(1)
      })
    },

    filters: {
      Time(time) {
        if (time)
          return time.substring(0, 10) + ' ' + time.substring(11, 19)
        return '2020-05-20'
      }
    },
    computed: mapState({
      ColorList: state => state.ColorList,
    }),

  }
</script>

<style scoped>
  @keyframes opc {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1
    }

  }

  .newdsy {
    height: 100%;
    width: 100%;
    animation: opc .6s;
    display: flex;
    justify-content: left;
    align-items: center;

  }

  .home {
    transition: all .3s linear;
    width: 55%;
    min-height: 700px;

    /*height: 600px;*/
  }

  .home-artcles {
    overflow: hidden;
    animation: opc .6s;
    padding: 0 10px;
    cursor: pointer;
    margin-bottom: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    border-radius: 3px;
    height: 160px;
    background-color: white;
    display: flex;
    align-items: center;
    min-width: 400px;
  }

  .content-wrap {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;
  }

  .home-artcles img {
    width: 250px;
    height: 150px;
    transition: .5s linear;
  }

  .home-artcles:hover img {
    transform: scale(1.08);

  }


  .home-artcles .title {
    width: 100%;
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
    width: 80%;
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media not screen and (min-width: 65em) {
    .home {
      overflow: hidden;
      position: relative;
      transition: all .3s linear;
      width: 80%;
    }
  }

  @media not screen and (min-width: 45em) {
    .home {
      overflow: hidden;
      margin-top: 20%;
      position: relative;
      transition: all .3s linear;
      width: 100%;
    }

    .home-artcles img {
      width: 100%;
      height: 180px;
      padding: 5px;
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


    .content-wrap {
      width: 100%;
      margin-left: 0px;
      text-align: center;
    }

    .home-artcles .msg-wrap {
      font-size: 12px;
      color: #999;
      display: flex;
      width: 100%;
      justify-content: space-around;
    }

    .newdsy {
      display: flex;
      width: 100%;
      flex-direction: column;
    }


    .title {
      text-align: center;
    }

    hr {
      width: 100%;
      margin: 0;
      padding: 0;
    }
  }

  @media not screen and (min-width: 40em) {
    .home {
      overflow: hidden;
      margin-top: 40%;
      position: relative;
      transition: all .3s linear;
      width: 100%;
    }

  }
</style>