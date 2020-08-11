<template>
  <div class="player-box" :style="{'width':playerBoxWidth+'px'}">
    <audio :src="currentSongInfo.url"></audio>
    <!--    内容区-->
    <div class="content1">
      <!-- 伸缩键-->
      <div class="stretch" @click="Stretch">
        <i :class="{'el-icon-arrow-left':playerBoxWidth===98,'el-icon-arrow-right':playerBoxWidth===420}"></i>
      </div>
      <!-- 中间操作区-->
      <div class="control-area">
        <!-- 操作 上-->
        <div class="top">
          <span class="name_wrap">{{currentSongInfo.name}} <span
                  class="singer">-{{currentSongInfo.singer}}</span> </span>
          <span class="options">
            <i class="iconfont icon-shangyishou" @click="changeSong(-1)"></i>
            <i :class="{'iconfont icon-pause':isPlay,'iconfont icon-play':!isPlay}" @click="changePlay"></i>
            <i class="iconfont icon-xiayishou" @click="changeSong(1)"></i>
            <i class="iconfont icon-list" @click="showList"></i>
          </span>
        </div>
        <!-- 操作 下-->
        <div class="foot">
          <ProgressBar :timeLong="timeLong" @changeAudioTime="changeAudioTime" id="ProgressBar"></ProgressBar>
          <div class="foot-option">
            <span class="long" style="font-size: 11px;color: #a4a4a4">{{timeLong|formatTime}}</span>
            <span class="el-icon-refresh-left" @click="restart" title="重播"></span>
            <span><Voice @changeVoice="changeVoice"></Voice></span>
            <span class="iconfont icon-geciweidianji" @click="showLirycs"
                  style="font-size: 18px;margin-left: -2px"></span>
          </div>
        </div>
      </div>
      <!-- 中间操作区  END-->

      <!-- 右边图片区-->
      <div class="img-area" @click="changePlay">
        <img v-lazy="currentSongInfo.img" alt="">
        <span :class="{'play':true,'el-icon-video-pause':isPlay,'el-icon-video-play':!isPlay}"></span>
      </div>
    </div>

  </div>
</template>
<script>
  import axios from 'axios'
  import ProgressBar from "./ProgressBar";
  import Voice from "./Voice";

  export default {
    name: "PlayerBox",
    mounted() {
      //获取列表信息
      setTimeout(() => {
        this.getSongById(this.idList[this.currentIndex])
        axios.get('https://api.imjad.cn/cloudmusic/?type=playlist&id=2250011882').then(res => {
          this.idList = res.data.playlist.trackIds.splice(0, 50)
        })
      }, 3000)
      //获取初次数据
      //监听是否可以播放 获取MP3播放时长
      let audio = document.getElementsByTagName('audio')[0]
      audio.oncanplay = () => {
        this.timeLong = parseInt(audio.duration)
      }
      //监听歌曲播放到结尾
      audio.addEventListener('ended', () => {
        this.changeSong(1)
      }, false);


      //  监听列表歌曲点击
      this.$bus.$on('clickSong', (obj) => {
        //先停掉歌曲
        if (this.isPlay === true) {

          this.changePlay()

        }
        this.currentSongInfo.name = obj.title
        this.currentSongInfo.url = obj.url
        this.currentSongInfo.singer = obj.author
        this.currentSongInfo.img = obj.pic
        setTimeout(() => {
          audio.currentTime = 0;
          this.changePlay()
        }, 300)
      })
    },
    data() {
      return {
        //歌单id
        idList: Object.freeze(['478387']),
        //当前音乐信息
        currentSongInfo: {},
        //播放器的宽度
        playerBoxWidth: 98,
        //是否播放
        isPlay: false,
        //当前数组中第几首歌曲
        currentIndex: 0,
        //歌曲长度
        timeLong: 180
      }
    },
    methods: {
      //播放
      play() {
        let audio = document.getElementsByTagName('audio')[0]
        if (audio.paused) {
          this.$nextTick(() => {
            audio.play();//audio.play();// 这个就是播放
          })
        } else {
          audio.pause();// 这个就是暂停
        }
      },
      //收缩展开
      Stretch() {
        if (this.playerBoxWidth === 420) {
          this.$bus.$emit('NoScale')
          this.playerBoxWidth = 98
        } else if (this.playerBoxWidth == 98) {
          this.playerBoxWidth = 420
        }
      },
      // 播放 暂停
      changePlay() {
        this.isPlay = !this.isPlay
        if (this.isPlay) {//播放
          this.$bus.$emit('play', 1)
        } else {
          this.$bus.$emit('play', 0)
        }
        this.play()
      },
      //获取数据
      getSongById(id) {

        let obj = {}
        axios.get(`https://api.imjad.cn/cloudmusic/?type=song&id=${id}&br=128000`).then(res => {
          obj.url = res.data.data[0].url
          axios.get(`https://api.imjad.cn/cloudmusic/?type=detail&id=${id}&br=128000`).then(res => {
            obj.name = res.data.songs[0].al.name
            obj.singer = res.data.songs[0].ar[0].name
            obj.img = res.data.songs[0].al.picUrl
            this.currentSongInfo = obj
          })
        })


      },
      //切歌
      changeSong(count) {
        this.isPlay = false
        clearTimeout(this.timer3)
        //防止过度点击
        this.timer3 = setTimeout(() => {
          this.currentIndex = this.currentIndex + count
          if (this.currentIndex < 0) {
            this.currentIndex = this.idList.length - 1
          } else if (this.currentIndex === this.idList.length) {
            this.currentIndex = 0
          }
          //  获取下一首音乐
          this.getSongById(this.idList[this.currentIndex].id)
          this.$nextTick(() => {
            let audio = document.getElementsByTagName('audio')[0]
            audio.load()
            this.$bus.$emit('play', 2)
          })
        }, 16)
      },
      //重播
      restart() {
        this.$bus.$emit("play", 3)
        let audio = document.getElementsByTagName('audio')[0]
        audio.currentTime = 0
      },
      //进度条事件
      changeAudioTime(time) {
        let audio = document.getElementsByTagName('audio')[0]
        audio.currentTime = time

        if (!this.isPlay) {
          this.play()
          this.isPlay = true
        }
      },
      //控制音量
      changeVoice(voice) {
        let audio = document.getElementsByTagName('audio')[0]
        audio.volume = voice / 100
      },
      //  展示歌单
      showList() {
        this.$bus.$emit('showList')
      },
      //展示歌词
      showLirycs() {
        this.$bus.$emit('changeshow')
      }
    },
    components: {
      ProgressBar,
      Voice
    },
    filters: {
      formatTime(time) {
        let min = parseInt(time / 60)
        let sec = time % 60

        if (min < 10 && min > 0) {
          min = '0' + min
        } else if (min === 0) {
          min = '00'
        }

        if (sec < 10 && sec > 0) {
          sec = '0' + sec
        } else if (sec === 0) {
          sec = '00'
        }

        return min + ':' + sec
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .player-box {
    border-radius: ;
    background-color: #f4f4f4;
    transition: width .2s linear;
    z-index: 9999;
    position: fixed;
    right: 3px;
    bottom: 3px;
    box-shadow: 0 0 4px #a8a8a8;
    height: 80px;
    overflow: hidden;
  }

  .content1 {
    width: 100%;
    height: 100%;
    position: relative;
  }

  /*-------伸展区域----------*/
  .stretch {
    position: absolute;
    left: 0;
    height: 100%;
    background-color: #4f4f4f;
    width: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 2px 0 0 2px;
    justify-content: center;
  }

  .stretch i {
    font-size: 20px;
    font-weight: bold;
    color: #b7b7b7;
  }

  .stretch:hover i {
    color: #292929;
  }

  /*-------伸展区域      END----------*/


  /*---------图片区域------------*/
  .img-area {

    cursor: pointer;
    top: 0;
    position: absolute;
    height: 100%;
    width: 80px;
    right: 0;
    background-image: linear-gradient(to top, #df89b5 0%, #bfd9fe 100%);

  }

  .img-area img {
    height: 100%;
    width: 100%;
  }

  .img-area span {
    background: linear-gradient(to right, #43ff0b, #fffa00, #ff0d00);
    -webkit-background-clip: text;
    color: transparent;
    animation: rotation 5s linear infinite;
    transition: left .2s, top .2s, font-size .2s;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    font-weight: 600;
    box-shadow: 0 0 2px white;
    border-radius: 50%;
  }

  .img-area:hover span {
    color: white;
  }

  .img-area .el-icon-video-pause {
    font-size: 20px;
    left: 10px;
    top: 85%;

  }

  @-webkit-keyframes rotation {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  /*---------图片区域    END------------*/


  /*--------控制区域----------*/
  .control-area {
    width: 322px;
    height: 80px;
    margin-left: 18px;
  }

  .top {
    height: 48px;

  }

  .name_wrap {
    height: 100%;
    display: inline-flex;
    width: 222px;
    align-items: center;
    padding: 0 4px;
    font-weight: bold;
    overflow: hidden;
    /*文本不会换行*/
    white-space: nowrap;
    /*当文本溢出包含元素时，以省略号表示超出的文本*/
    text-overflow: ellipsis;

  }

  .singer {
    font-weight: 500;
    font-size: 13px;
    color: #a7a7a7;
  }

  .options {
    width: 100px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 3px;
    color: #919191;
  }

  .options i {
    font-size: 18px;
    cursor: pointer;
  }

  .options i:hover {
    color: #343434;
  }

  .foot {
    height: 32px;
    display: flex;
    align-items: center;
  }

  .foot-option {
    display: flex;
    align-items: center;
  }

  .foot-option span {
    margin-left: 4px;
  }

  .foot-option .el-icon-refresh-left {
    color: #a4a4a4;
    font-size: 16px;
    cursor: pointer;
    font-weight: 600;
  }

  .foot-option .el-icon-refresh-left:hover {
    color: black;
  }

  @media not screen and (min-width: 45em) {
    #ProgressBar {
      pointer-events: none;
      cursor: default;
      opacity: 0;
    }
  }

  /*--------控制区域     END----------*/
</style>