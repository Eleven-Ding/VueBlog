<template>
  <div class="pay">
    <div class="img">
      <el-divider><img @click="change" style="width: 40px" src="../../assets/img/pay.png" alt="">
      </el-divider>
    </div>
    <div class="show" v-show="show">
      <div style="text-align: center;font-size: 16px;color: #da8350">鼓励一下吖~~(实则网络乞丐)</div>
      <div class="pp">
        <img src="../../assets/img/wechat.png" alt="">
        <img src="../../assets/img/airpay.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pay",
    data() {
      return {
        show: false
      }
    },
    methods: {
      change(){
        this.show=!this.show
      }
    }
  }
</script>

<style scoped>
  .pay {
    padding: 20px 0;
    width: 80%;
    margin: 0 auto;

    position: relative;
  }

  .pay .img img {
    cursor: pointer;
  }

  .show {
    left: 50%;
    background-color: white;
    transform: translateX(-50%);
    position: absolute;
    z-index: 99;
  }

  .show img {
    width: 50%;
    height: 60%;
  }
</style>