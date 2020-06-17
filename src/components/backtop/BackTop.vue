<template>
  <div class="backTop">
    <img src="../../assets/img/backtop.png" alt="" :class="{'down':isshow,'up':!isshow}" @click="backTop">
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
      this.listen()
    },
    methods: {
      backTop(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.timer=setInterval( ()=> {
          if(scrollTop>0){
            scrollTop-=30
          }else{
            clearInterval(this.timer)
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
        },10)

      },
      listen() {
        window.onscroll = () => {
          //为了保证兼容性，这里取两个值，哪个有值取哪一个
          //scrollTop就是触发滚轮事件时滚轮的高度
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          if (parseInt(scrollTop) >= 300) {
            this.isshow = true
          } else {
            this.isshow = false
          }
        }
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


  .backTop {
    position: fixed;
    right: 10%;
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
    .backTop{
    display: none;
    }
  }
</style>