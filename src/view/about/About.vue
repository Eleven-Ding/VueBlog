<template>
  <div class="about">
    <div class="about-content">
      <h1 class="aboutMe">About</h1>
      <hr class="parting-line">

      <div class="content">

        <div class="item">
          <span>关于我</span>
          <p v-for="item in about.split('。')">{{item}}</p>
        </div>

        <div class="item">
          <span>关于本站</span>
          <p>{{station}}</p>
        </div>

        <div class="item">
          <span>技术栈</span>
          <div class="tech">
            <i class="el-icon-position"></i>
            <span class="title">client:</span>

            <span class="text">{{technology.client}}</span>
          </div>
          <div class="tech">
            <i class="el-icon-position"></i>
            <span class="title">admin:</span>
            <span class="text">{{technology.admin}}</span>

          </div>
          <div class="tech">
            <i class="el-icon-position"></i>
            <span class="title">server:</span>
            <span class="text">{{technology.server}}</span>
          </div>
        </div>

        <div class="item">
          <span>联系方式</span>
          <div class="con">
            <i class="el-icon-chat-dot-round"></i>
            <span class="title">QQ:</span>
            <span class="num">{{connect.qq}}</span>
          </div>
          <div class="con">
            <i class="el-icon-chat-line-round"></i>
            <span class="title">WeChat:</span>
            <span class="num">{{connect.wechat}}</span>
          </div>
        </div>

        <div class="item">
          <span>本站发展史</span>
          <div class="history">
            <el-timeline>
              <el-timeline-item
                      :color="getColor()"
                      :timestamp="item.time"
                      v-for="(item,index) in history"
                      :key="index" size="large">
                {{item.msg}}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "About",
    data() {
      return {
        about: '',
        station: '',
        technology: {},
        history: [],
        connect: {}
      }
    },
    methods: {
      getColor(){
        return '#'+(Math.random()*0xffffff<<0).toString(16)
      }
    },
    mounted() {

      request('/about/getInfo').then(res => {
        // console.log(res);
        this.about = res[0].about
        this.station = res[0].station

        this.technology = JSON.parse(res[0].technology)
        this.connect = JSON.parse(res[0].connect)
        /*history是一个数组，要拆分 */

        let array=res[0].history.split('_')
        // console.log(res[0].history.split('_'));

        for(let i=0;array.length;i++){
          this.history.push(JSON.parse(array[i]))
        }
      })
    }
  }
</script>

<style scoped>
  .aboutMe {
    margin-bottom: 30px;
    color: #7a7a7a;
  }

  .parting-line {
    height: 4px;
    border: 0;
    background-color: #ddd;
    margin: 20px 0;
    background-image: repeating-linear-gradient(-45deg, #fff, #fff 4px, transparent 0, transparent 8px);
  }

  .about {
    padding-top: 20px;
    text-align: center;
    width: 55%;
    padding-bottom: 50px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    border-radius: 10px;
  }

  .about-content {
    margin: 0 auto;
    width: 90%;
  }

  .item {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-top: 40px;
  }

  .item span {
    font-size: 24px;
    font-weight: 600;
    color: #696969;
  }

  .item p {
    margin-bottom: -10px;
    color: #757575;
  }

  .tech {
    color: #49464d;
    padding-left: 5px;
    margin-top: 8px;
  }

  .tech .title {
    font-size: 18px;
    margin: 0 18px 0 8px;
  }

  .tech .text {
    font-size: 16px;
    font-weight: 500;
    color: #727272;
  }

  .con {
    color: #49464d;
    padding-left: 5px;
    margin-top: 8px;
  }

  .con .title {
    font-size: 18px;
    margin: 0 18px 0 8px;
  }

  .con .num {
    font-size: 16px;
    font-weight: 500;
    color: #727272;
  }
  .history{
    margin-top: 30px;
  }
  @media not screen and (min-width: 45em) {
    .about{
      width: 100%;
    }
  }
</style>