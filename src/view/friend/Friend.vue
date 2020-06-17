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
    </div>

  </div>
</template>
<script>
  import {request} from "../../network/request";
  import FriendItem from "./component/FriendItem";

  export default {
    name: "Friend",
    data() {
      return {
        friends: []
      }
    },
    components: {
      FriendItem
    },
    mounted() {
      this.getAll()
    },
    methods: {
      getAll() {
        request('/friend/getall').then(res => {
          this.friends = res.list
        })
      }
    }
  }
</script>

<style scoped>
  .friend {
    padding-top: 20px;
    text-align: center;
    width: 55%;
    padding-bottom: 50px;
    background-color: white;
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
    margin-left: 20px;
    width: 30%;
  }


  @media not screen and (min-width: 45em) {
    .friend {
      width: 100%;
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
    }
  }
</style>