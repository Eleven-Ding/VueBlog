<template>
  <div class="friend">

    <div class="content">
      <h1 style="color:#7a7a7a;margin-bottom: 30px;">友链</h1>
      <hr class="parting-line">
      <div class="link_wrap">
        <div class="item_wrap">
          <friend-item class="item" v-for="(item,index) in friends" :friend="item" :key="index"></friend-item>
        </div>
        <div><h3 style="color: #8c8c8c">欢迎各位大佬交换友链~~~</h3></div>
      </div>
      <Canvas></Canvas>

    </div>

  </div>
</template>
<script>
  export default {
    name: "Friend",
    data() {
      return {
        friends: []
      }
    },
    components: {
      "FriendItem":()=> import("./component/FriendItem"),
      "Canvas": ()=>import("./component/Canvas")
    },
    mounted() {
      this.getAll()

    },
    methods: {
      getAll() {
        this.request('/friend/getall').then(res => {
          this.friends = res.list
        })
      }
    }
  }
</script>

<style scoped>
  .friend {
    min-height: 800px;
    padding-top: 20px;
    text-align: center;
    width: 55%;
    padding-bottom: 50px;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    border-radius: 10px;
  }

  .parting-line {
    height: 4px;
    border: 0;
    background-color: #ddd;
    margin: 20px 0;
    background-image: repeating-linear-gradient(-45deg, #fff, #fff 4px, transparent 0, transparent 8px);
  }

  .content {
    margin: 0 auto;
    width: 90%;
  }

  .item_wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    margin-top: 10px;
    margin-left: 20px;
    width: 30%;
  }


  @media not screen and (min-width: 65em) {
    .friend {
      width: 80%;
    }

    .item_wrap {
      display: block;
    }

    .item {
      width: 100%;
    }
  }

  @media not screen and (min-width: 45em) {
    .friend {
      width: 100%;
      margin-top: 20%;
    }
  }

  @media not screen and (min-width: 40em) {
    .friend {
      width: 100%;
      margin-top: 40%;
    }
  }
</style>