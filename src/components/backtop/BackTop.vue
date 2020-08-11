<template>
  <div class="backTop">
    <div class="backPC">
      <img src="http://www.shyding.xyz/MyImg/img/backtop.f681680d.png" alt="" :class="{'down':isshow,'up':!isshow}" @click="backTop">
    </div>
    <div class="backMobile" v-show="isshow" @click="backTop">
      <i class="el-icon-caret-top"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    data() {
      return {
        isshow: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(e => {
          this.listen()
        }, 0)
      })
    },
    methods: {
      backTop() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let count = scrollTop / 20
        this.timer = setInterval(() => {
          if (scrollTop > 0) {
            scrollTop -= count
          } else {
            clearInterval(this.timer)
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
        }, 10)

      },
      listen() {
        window.addEventListener('scroll', () => {

          //为了保证兼容性，这里取两个值，哪个有值取哪一个
          //scrollTop就是触发滚轮事件时滚轮的高度
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          if (parseInt(scrollTop) >= 200) {
            this.isshow = true
          } else {
            this.isshow = false
          }
        })
      }
    }
  }
</script>

<style scoped>


  @keyframes move {
    0% {
      top: 0px;
    }
    50% {
      top: -5px;
    }
    100% {
      top: 0px;
    }

  }

  .backMobile {
    display: none;
  }

  .backTop {
    position: fixed;
    right: 10%;
    z-index:999999;
    top: 0;
    background-color: #409EFF;
    transition: all .7s ease-in;

  }

  .down {

    width: 80px;
    height: 500px;
    position: absolute;
    cursor: pointer;
    top: -50px;
    transition: all .7s ease-in;
  }

  .up {
    width: 80px;
    height: 500px;
    position: absolute;
    cursor: pointer;
    top: -500px;
    transition: all .7s ease-in;
  }

  @media not screen and (min-width: 45em) {
    .backPC {
      display: none;
    }

    .backMobile {
      box-shadow: 0 0 4px #a7a7a7;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 50%;
      background-color: white;
      position: fixed;
      bottom: 70px;
      right: 20px;
    }

    .backMobile i {
      font-size: 28px;
      color: #409EFF;
    }
  }
</style>