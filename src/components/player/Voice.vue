<template>
  <div class="voice">
    <i style="font-size: 18px;"
      :class="{'iconfont icon-yinliang-gao':highVoice&&!silent,'iconfont icon-yinliang-di':lowVoice&&!silent,'iconfont icon-yinliang-guan':silent}"
      @click="changeSilent"
    >
      <div class="changeVoice" @click="changeVoice" @mousedown="slideStart">
        <!-- 这里面也应该有一个拖动条-->
        <div
          class="height"
          :style="{'height':`${height}%`,'transition':flag?'height .1s linear':''}"
        ></div>
      </div>
    </i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否静音
      silent: false,
      //低音量
      lowVoice: false,
      //高音量  默认最高音量
      highVoice: true,
      // 音量条告诉
      height: 100,
      // 是否过度
      flag: false
    };
  },
  methods: {
    // 静音/最大音量切换
    changeSilent(e) {

        this.silent = !this.silent;
        if (this.height != 0) {
          this.height = 0;
        } else {
          this.height = 100;
          this.highVoice=true
        }
        this.check()
    },
    changeVoice(e) {
      // 点击需要过渡
      this.flag = true;
      // 阻止事件冒泡
      e.stopPropagation();
      e.preventDefault();
      // 鼠标点击处 距离顶部的位置
      let pressY = e.offsetY;
      // 点击元素的高度
      let pressHeight = e.target.getBoundingClientRect().height;
      let classname = e.target.getAttribute("class");
      if (classname === "height" || classname === "changeVoice") {
        this.height = (pressHeight - pressY) * 2;
        this.check();
      }


      // 判断点击的是哪个区域
    },
    // 鼠标点击 准备滑动
    slideStart(e){

      
    },
    // 检测大小音量
    check() {
      if(this.height!=0){
        this.silent=false
      }
      if (this.height < 50&&this.height>0) {
        this.lowVoice = true;
        this.highVoice = false;
      } else if(this.height>50) {
        this.lowVoice = false;
        this.highVoice = true;
      }
            // 发送事件
      this.handle()
    },
    //处理音量 volum
    handle(){
      this.$emit('changeVoice',this.height)
    }
  }
};
</script>

<style>
.voice {
  transition: all 0.2s linear;
  display: inline-block;
  position: relative;
  margin-top: 200px;
  text-align: center;
}
.iconfont {
  font-weight: 600;
  cursor: pointer;
  color: rgb(162, 154, 154);
  height: 20px;
  overflow: hidden;
  transition: all 0.2s linear;
  display: inline-flex;
  align-items: flex-end;

}
.iconfont:hover {
  color: black;
  height: 77px;
  margin-top: -57px;
}
.changeVoice {
  position: relative;

  cursor: pointer;
  border-radius: 4px;
  height: 50px;
  width: 7px;
  background-color: rgb(214, 214, 214);
  transform: translate(-200%, -40%);
}

.height {
  position: absolute;
  width: 100%;
  /* 到时候修改高度就可以了 */
  height: 50%;
  bottom: 0;
  border-radius: 3px;
  background-color: #ff5777;
}
</style>