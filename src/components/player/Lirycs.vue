<template>
  <div class="lirycs" v-show="isShow">
    <div class="lirycs-content">
      <div class="item" :class="{'active':currentTime>=item.time}" v-for="(item,index) in LirycsList">
        {{item.lirycs}}
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        isShow: false,
        LirycsList:Object.freeze( []),
        currentTime: 0
      }
    },
    name: "Lirycs",
    mounted() {
      //https://api.imjad.cn/cloudmusic/?type=lyric&id=1406633327
      this.$bus.$on("lirycs", (url) => {
        this.LirycsList = []
        axios.get(url).then(res => {
          let array = res.data.split('\n')
          for (let i = 0; i < array.length; i++) {
            let obj = {}
            obj.lirycs = array[i].split(']')[1]
            obj.time = array[i].split(']')[0].substring(1)

            obj.time = this.handleTime(obj.time)

            if (obj.lirycs !== 'undefined')
              this.LirycsList.push(obj)
          }

          this.startSlide(0)
        })
      })

      this.$bus.$on('play', (index) => {
        if (index === 1) {//播放
          this.startSlide(this.currentTime)
        } else if (index === 0) {//暂停
          clearInterval(this.timer)
        }else if(index===3){
          this.currentTime=-1000
        }else if(index===2){//这个是没有歌词的
          clearInterval(this.timer)
          this.LirycsList=[
            {lirycs:'~~~该歌曲为纯音乐~~~~~',time:100000}]
        }
      })


      this.$bus.$on('slidelirycs', (time) => {
        this.currentTime = time * 1000
      })

      //  显示隐藏
      this.$bus.$on('changeshow', () => {
        this.isShow = !this.isShow
      })
    },
    methods: {
      handleTime(time) {
        //转换成毫秒数
        //分钟数
        let min = parseInt(time.substring(0, 2))
        let sec = parseInt(time.substring(3, 5))
        let ms = parseInt(time.substring(6, 9))
        time = min * 60 * 1000 + sec * 1000 + ms
        return time
      },
      //  从某个时间点开始启动定时器
      startSlide(time) {
        let content = document.getElementsByClassName('lirycs-content')[0]
        if (time == 0) {
          content.style.top = "0px"
        }
        this.currentTime = time
        let pre = 1
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          let count = document.getElementsByClassName('active').length
          if (pre != count) {
            content.style.top = parseInt(content.style.top) - (count - pre) * 23 + 'px'
            pre = count
          }

          this.currentTime += 100
        }, 100)
      }
    }
  }
</script>

<style scoped>
  .lirycs {
    border-radius: 6px;
    position: fixed;
    left: 40%;
    transform: translateX(-50%);
    width: 100%;
    z-index: -1;
    bottom: 2px;
    height: 80px;
    background-color: rgba(237, 237, 237, 0.64);
    overflow: hidden;
  }

  .lirycs-content {
    position: absolute;
    height: 100%;
    transition: all .3s linear;
    width: 100%;
    text-align: center;
    font-size: 15px;
  }

  .item {
    color: #4b4b4b;
    height: 23px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .active {
    color: red;
  }
  @media not screen and (min-width: 45em) {
    .lirycs {
      position: fixed;
      left: 0;
      right: 0;
      top:50px;
      transform: translateX(0);
    }

  }
</style>