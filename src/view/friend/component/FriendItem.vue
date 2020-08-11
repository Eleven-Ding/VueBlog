<template>
  <a :href="friend.url" style="text-decoration: none">
    <div class="friend-item">
      <div class="left_wrap">
        <div class="title">
          <div>{{friend.title}}</div>
        </div>
        <div class="des">
          <div>{{friend.des}}</div>
        </div>
      </div>
      <img class="avat" v-lazy="friend.path" alt="">
    </div>
  </a>
</template>

<script>
  export default {
    name: "FriendItem",
    props: {
      friend: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>
  .friend-item::before {
    background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);
    content: "";
    width: 100%;
    height: 0%;
    transform: translate(-50%, -50%) rotate(-45deg);
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transition: all 0.3s linear;
  }
  .friend-item:hover::before{
    height: 700%;
  }
  .friend-item:hover{
    color: white;
  }

  .friend-item:hover .avat{
    animation: rotation .3s linear;
    transform: rotate(360deg);
  }


  .friend-item {
    background-color: white;
    overflow: hidden;
    position: relative;
    transition: all .3s linear;
    cursor: pointer;
    height: 70px;
    display: flex;
    align-items: center;
    min-width: 160px;
    padding: 10px 10px;
    border: 1px solid rgba(225, 225, 225, 0.83);
    border-radius: 4px;
  }

  .left_wrap {
    z-index: 2;
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }

  .avat {
    transition: all .3s linear;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
    border: 1px dashed rgba(204, 204, 204, 0.63);
  }

  .title, .des {
    width: 100%;
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .title {
    padding-bottom: 10px;
    color: rgba(218, 138, 118, 0.8);
    font-size: 16px;
    font-weight: bold;
  }

  .des {
    font-size: 13px;
    color: #a4a4a4;
    padding-top: 10px;
    border-top: 2px dashed #eee;
  }

  @media not screen and (min-width: 45em) {
    .left_wrap {
      flex: 7;
    }
  }
</style>