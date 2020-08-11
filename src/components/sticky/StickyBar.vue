<template>
  <div class="sticky-bar" :class="{'sticky':isshow}">
    <ul>
      <li v-for="(item,index) in lists" @click="changeArticles(index)" :style="{backgroundColor:ColorList[item]}" >{{item}}</li>
    </ul>
  </div>
</template>

<script>
  import {CloudeMixin,IsPcMixin} from "@/mixin";
  import  {mapState} from 'vuex'
  export default {
    name: "StickyBar",
    data() {
      return {
        lists:Object.freeze( ['全部', '前端', '后端']),
        isshow: false,

      }
    },
    mixins: [CloudeMixin,IsPcMixin],
    mounted() {

      this.listen()
      this.$bus.$on('loadOver', () => {
        if(!this.IsPC()){
          this.LoadCloud()
          this.LoadList()
          this.lists=this.clouds.map(item => item.type)
        }
      })

    },
    methods: {
      //监听页面滚动
      listen() {
        let that = this
        let height = document.querySelector('.sticky-bar').offsetTop
        // let height = 60
        window.onscroll = function () {
          //为了保证兼容性，这里取两个值，哪个有值取哪一个
          //scrollTop就是触发滚轮事件时滚轮的高度
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          //如果是第
          if (scrollTop >= height / 3) {
            that.$bus.$emit('opc0')
            that.isshow = true
          } else {
            that.$bus.$emit('opc1')
            that.isshow = false
          }
        }
      },
      changeArticles(index) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if(this.IsPC())
          this.$bus.$emit('changeArticle', index)
        else
          this.changeArticle(index)
        this.$router.push('/home')
      }
    },
    computed: mapState({
      ColorList: state => state.ColorList,

    }),
  }
</script>

<style scoped>
  .sticky-bar {
    transition: all .2s linear;
    box-sizing: border-box;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: white;
    border-top: 1px solid #e2e2e2;
    display: flex;
    align-items: center;
  }

  .sticky {
    position: fixed;
    z-index: 3;

    top: 0;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 10%;
    height: 100%;
  }

  li {
    min-width: 30px;
    font-size: 15px;
    cursor: pointer;
    color: rgba(64, 158, 255, 0.89);
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    height: 100%;
    padding: 0 10px;
  }

  li:hover {
    color: #ff5b65;
  }

  @media not screen and (min-width: 45em) {
    .sticky-bar {

      box-sizing: border-box;
      position: fixed;
      top: 49px;
      left: 0;
      right: 0;
      background-color: white;
      border-top: 1px solid #e2e2e2;
    }

    .sticky {
      position: fixed;
      z-index: 99999;
      top: 0;
    }

    ul {
      padding-left: 2%;
      display: flex;
      align-items: center;
      height: 100%;
      margin: 3px 0;
    }

    li {
      overflow: hidden;
      cursor: pointer;
      position: relative;
      background-color: #3ad8d7;
      color: white;

      display: flex;
      font-size: 12px;
      text-decoration: none;
      line-height: 100%;
      height: 100%;
      align-items: center;
      padding: 3px 4px;
      margin:10px 5px 0 0px;
    }
  }
</style>