<template>
  <div class="progress-bar" @click="handleClick">
    <!-- 进度条总体 -->
    <div class="Content" style="width: 200px">
      <!-- 已经划过的区域 -->
      <div
              class="pre"
              :style="{'width':slideLeft+'px','transition':Istransition?'left .2s linear':''}"
      ></div>
      <!-- 滑块 -->
      <div
              class="slide"
              :style="{'left':slideLeft+'px','transition':Istransition?'left .1s linear':''}"
              dropEffect="none"
              @mousedown="MoveSlide"
      ></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      //歌曲的长度
      timeLong: {
        type: Number,
        default: 180
      }
    },
    data() {
      return {
        // 滑块距离左边的位置
        slideLeft: 0,
        timer: null,
        Istransition: false
      };
    },
    mounted() {
      //  设定时器 让时间一秒一秒的加
      this.slideLeft = 0
      this.$bus.$on('play', (index) => {
        if (index === 1) {//播放
          this.start(this.slideLeft)
        } else if (index === 0) {//暂停
          clearInterval(this.timer2)
        } else if (index === 2) {
          clearInterval(this.timer2)
          this.slideLeft = 0
        } else if (index === 3) {//重置
          this.slideLeft = 0
        }
      })
    },
    methods: {
      //进度开始
      start(count) {
        clearInterval(this.timer2)
        this.slideLeft = count
        let wait = 200 / this.timeLong
        this.Istransition = true
        this.timer2 = setInterval(() => {
          if (this.slideLeft >= 0 && this.slideLeft < 200)
            this.slideLeft = this.slideLeft + 1
        }, wait * 1000)
      },
      //移动滑块
      MoveSlide(e) {
        this.Istransition = false;
        let progress = document.getElementsByClassName("Content")[0];
        // 获取鼠标点击的位置
        let pressX = e.clientX;
        //监听鼠标移动
        let left = this.slideLeft;
        let width = progress.getBoundingClientRect().width
        //  对页面进行监听
        document.onmousemove = (e) => {
          let x = e.clientX
          let handleX = left + x - pressX
          if (handleX >= 0 && handleX <= width) {
            this.slideLeft = handleX;
          }
          //鼠标松开 发送请求
          document.onmouseup = () => {
            document.onmousemove = null
            this.HandleTime()
            document.onmouseup = null
          }

        }
      },
      //点击进度条 滑块移动
      handleClick(e) {

        this.Istransition = true;
        // 进度条距离左边的距离
        let progress = document.getElementsByClassName("Content")[0];
        let progressLeft = progress.getBoundingClientRect().left
        //获取点击的位置
        let pressX = e.clientX;
        let handlex = pressX - progressLeft;
        if (
          pressX < progressLeft ||
          pressX > progressLeft + progress.getBoundingClientRect().width
        ) {
          return;
        }
        this.slideLeft = handlex;
        //   一样的传一个事件出去   用防抖的方式优化
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.HandleTime();
        }, 200);
      },
      //发射事件 调整audio currentTime
      HandleTime() {
        let progress = document.getElementsByClassName("Content")[0];
        let width = progress.getBoundingClientRect().width
        // 在这里
        let pre = this.slideLeft / width
        let time = parseInt(pre * this.timeLong)
        this.$emit('changeAudioTime', time)

        this.$bus.$emit('slidelirycs',time)
      }
    }
  };
</script>

<style scoped>
  .progress-bar {
    display: inline-block;
    margin-left: 8px;
  }

  .Content {
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 3px;
    width: 200px;
    background-color: rgb(228, 227, 227);
  }

  .pre {
    width: 0;
    height: 100%;
    background-color: #f7a2b2;
  }

  .slide {
    /* transition: left .2s linear; */
    background-color: rgb(255, 0, 0);
    position: absolute;
    height: 2px;
    width: 2px;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .Content:hover .slide {
    color: red;
    height: 6px;
    width: 6px;
    border-radius: 50%;
  }
</style>
