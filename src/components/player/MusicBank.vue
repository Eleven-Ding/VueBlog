<template>
  <div class="music-bank" :class="{'show':isShow}">
    <div class="music-list">

      <div class="music-item" v-for="(item,index) in MusicList" :key="index" @click="clickSong(index)">
        <span>{{item.title}}</span>
        <span>{{item.author}}</span>
      </div>
    </div>

  </div>
</template>

<script>
  //歌单
  //http://music.163.com/api/search/get/web?csrf_token=hlpretag=&hlposttag=&s=%E6%B5%81%E8%A1%8C&type=1&offset=0&total=true&limit=30
  //单曲
  //https://api.imjad.cn/cloudmusic/?type=song&id=${id}&br=128000
  //单曲信息
  //https://api.imjad.cn/cloudmusic/?type=detail&id=${id}&br=128000
  //歌词
  //https://music.163.com/api/song/lyric?id=1363948882&lv=1&kv=1&tv=-1
  import axios from 'axios'

  export default {
    name: "MusicBank",
    data() {
      return {
        //是否显示 默认不显示
        isShow: false,
        //  歌单
        MusicList: Object.freeze([])
      }
    },
    mounted() {
      this.listen()
      this.$bus.$on('NoScale', () => {
        this.isShow = false
      })
    },
    methods: {
      //监听事件总线
      listen() {
        this.$bus.$on('showList', () => {
          this.isShow = !this.isShow
        })
        this.$bus.$on('loadOver',()=>{
          this.getList()
        })
      },
      //获取歌单
      getList() {
         axios.get('https://api.i-meto.com/meting/api?server=netease&type=playlist&id=60198&r=0.052504320366215884').then(res => {
           this.MusicList = res.data
         })
      },
      clickSong(index) {
        if (index==4||index==7||index==13||index==14||index===30||index===43) {
          alert('不好意思，本歌曲无资源')
          return
        }
        setTimeout(() => {
          this.$bus.$emit('clickSong', this.MusicList[index])
          this.$bus.$emit('play', 3)
          //  提交歌词链接
          this.$bus.$emit('lirycs',this.MusicList[index].lrc)
          //  提取歌词链接里面的id
        }, 200)
      }
    }
  }
</script>

<style scoped>
  .music-bank {
    z-index: 9999999999;
    transition: height .2s linear;
    position: fixed;
    width: 420px;
    height: 0px;
    right: 2px;
    bottom: 84px;
  }

  .music-list {
    box-shadow: -3px -3px 3px rgba(182, 182, 182, 0.71);
    height: 100%;
    background-color: #f2f2f2;
    overflow: hidden;
    overflow-y: scroll;
  }

  .show {
    opacity: 1;
    z-index: 99999999;
    height: 300px;
  }

  .music-item {
    cursor: pointer;
    font-size: 12px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    padding: 10px 10px;
  }


  /* 滚动槽 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  }


  .music-item:hover {
    background-color: #e8e8e8;
    color: #ff0d00;
  }

  .music-item span:nth-child(1) {
    font-weight: 600;
    flex: 2;
    overflow: hidden;
    /*文本不会换行*/
    white-space: nowrap;
    /*当文本溢出包含元素时，以省略号表示超出的文本*/
    text-overflow: ellipsis;
  }

  .music-item span:nth-child(2) {
    flex: 1;
    overflow: hidden;
    /*文本不会换行*/
    white-space: nowrap;
    /*当文本溢出包含元素时，以省略号表示超出的文本*/
    text-overflow: ellipsis;
  }

</style>