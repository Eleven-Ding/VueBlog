<template>
  <div class="bottom" >

    <span class="pp">
      <span class="smile">ｸﾞｯ!(๑•̀ㅂ•́)و✧</span>
      本博客已萌萌哒运行<span>{{runtime}}
      <span class="smile2"> ✧(´°ω°`)↯↯</span>
    </span>
    </span>
    <div style="display:flex;align-items: center;justify-content: center">托管于阿里云(学生机) | <a rel="nofollow" style="color: #d5d5d5" href="http://www.beian.miit.gov.cn" target="_blank">蜀ICP备20019999号-1</a>
      <a href="https://www.cnzz.com/stat/website.php?web_id=1279136774" target="_blank" title="站长统计">
       &nbsp; <img border="0" hspace="0" vspace="0" style="width: 18px;height: 14px;" src="https://icon.cnzz.com/img/pic1.gif"></a>
    </div>
    <div>DingShiYi 个人博客 前端技术小站 </div>
  </div>
</template>

<script>
  export default {
    name: "BottomBar",
    data() {
      return {
        runtime:  Object.freeze('')
      }
    },
    mounted() {
      setInterval(() => {
        let startTime = new Date('2020-5-25'); // 开始时间
        let endTime = new Date(); // 结束时间
        let usedTime = endTime - startTime; // 相差的毫秒数
        let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
        let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
        let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
        let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
        let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
        let level3 = leavel2 - minutes * 60 * 1000
        let seconds = Math.floor(level3 / 1000)
        this.runtime = days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
      }, 1000)

    },
  }
</script>

<style scoped>
  .pp {

    z-index: 99999999999999;
  }

  .smile2 {
    position: absolute;
    animation: move2 1s infinite;
  }

  .smile {
    animation: move 1s infinite;
    position: absolute;
    transform: translateX(-100%);
  }

  @keyframes move {
    0% {
      transform: translateX(-100%) translateY(0) rotate(0);
    }
    50% {
      transform: translateX(-100%) translateY(3px) rotate(-3deg);
    }
    70% {
      transform: translateX(-100%) translateY(0) rotate(-3deg);
    }
    100% {
      transform: translateX(-100%) translateY(0) rotate(0);
    }
  }

  @keyframes move2 {
    0% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(-3px) rotate(3deg);
    }
    70% {
      transform: translateY(0) rotate(3deg);
    }
    100% {
      transform: translateY(0) rotate(0);
    }
  }

  .bottom {
    font-weight: bold;
    margin-top: 70px;
    color: #a5a5a5;
    background-color: #232323;
    height: 85px;

    box-sizing: border-box;
    padding: 15px 10px;
    text-align: center;
    font-size: 10px;
    z-index: 9999999999999;
    line-height: 1.5em;
  }

  .bottom div {
    margin-top: 2px;

  }
</style>