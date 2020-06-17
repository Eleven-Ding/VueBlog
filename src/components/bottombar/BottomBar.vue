<template>
  <div class="bottom">
    <span class="pp">
      <span class="smile">ｸﾞｯ!(๑•̀ㅂ•́)و✧</span>
      本博客已萌萌哒运行<span>{{runtime}}
      <span class="smile2"> ✧(´°ω°`)↯↯</span>
    </span>
    </span>
    <div>托管于阿里云(学生机) | 使用阿里云存储</div>
    <div>西华大学 丁时一个人博客 1559298665@qq.com</div>
  </div>
</template>

<script>
  export default {
    name: "BottomBar",
    data() {
      return {
        runtime: ''
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
    }
  }
</script>

<style scoped>
  .pp {


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
      transform:translateY(0) rotate(0);
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
    margin-top: 40px;
    color: #8c8c8c;
    background-color: #232323;
    height: 85px;
    box-sizing: border-box;
    padding: 15px 10px;
    text-align: center;
    font-size: 10px;
    line-height: 1.5em;
  }

  .bottom div {
    margin-top: 2px;
  }
</style>