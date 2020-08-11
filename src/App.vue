<template>
  <div id="app">

    <login></login>
    <tab-bar></tab-bar>
    <sticky-bar ref="sticky"></sticky-bar>
    <right-bar></right-bar>
    <div class="mains">
      <transition :name="transitionName">
        <keep-alive>
          <router-view class="router-view"></router-view>
        </keep-alive>
      </transition>

    </div>
    <!--底部组件-->
    <bottom-bar></bottom-bar>
    <back-top></back-top>
    <PlayerBox id="player"></PlayerBox>
    <Lirycs id="Lirycs"></Lirycs>
    <MusicBank id="MusicBank"></MusicBank>
  </div>
</template>

<script>
  import StickyBar from "./components/sticky/StickyBar";

  export default {
    name: 'App',
    components: {
      "PlayerBox": () => import("./components/player/PlayerBox.vue"),
      "tab-bar": () => import("./components/tabbar/TabBar"),
      "right-bar": () => import("./components/rightbar/RightBar"),
      "bottom-bar": () => import("./components/bottombar/BottomBar"),
      "login": () => import("./components/login/Login"),
      "back-top": () => import("./components/backtop/BackTop"),
      StickyBar,
      "Lirycs": () => import("./components/player/Lirycs"),
      "MusicBank": () => import("./components/player/MusicBank")
    },
    data() {
      return {

        transitionName: 'slide-right'
      }
    },
    watch: {
      $route(to, from) {
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.transitionName = 'slide-left';
        } else {
          this.transitionName = 'slide-right';
        }
      }
    },
    mounted() {

      this.$bus.$on('showlirycs', (flag) => {
        if (flag) {
          document.getElementById('lirycs').style.opacity = 1
        } else {
          document.getElementById('lirycs').style.opacity = 0
        }
      })
      this.$refs.sticky.listen()
      console.log('%cWelcome To Dshy!', 'background:black;color:#bada55;font-size:25px');
      console.log('%cVersion 2.0', 'background:black;color:#bada55;font-size:20px');
      console.log('%c你的到来,是我的荣幸', 'background:black;color:#bada55;font-size:17px');
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: #f5f8f9;
  }

  #app {
    overflow-x: hidden;
  }

  #Lirycs {
    z-index: 999;
  }

  .mains {
    /*高度不应该写死或者计算*/
    min-height: calc(100vh - 40px);

  }

  .router-view {
    margin-top: 150px;
    margin-left: 10%;
  }

  /*这个也要用媒体查询*/

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-6%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(6%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(6%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(6%, 0, 0);
  }

  @media not screen and (min-width: 45em) {
    .router-view {
      margin-top: 100px;
      margin-left: 0;
    }

    #lirycs {
      display: none;
    }

    #player {
      position: fixed;
      right: 0;
      bottom: 0;
      transform: scale(0.8) translateX(54px) translateY(13px);
    }

    #MusicBank {
      transform: scale(0.8) translateX(58px) translateY(62px);
    }

    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
      will-change: transform;
      transition: all 500ms;
      position: absolute;
    }

    .slide-right-enter {
      opacity: 0;
      transform: translate3d(0%, 0, 0);
    }

    .slide-right-leave-active {
      opacity: 0;
      transform: translate3d(0%, 0, 0);
    }

    .slide-left-enter {
      opacity: 0;
      transform: translate3d(0%, 0, 0);
    }

    .slide-left-leave-active {
      opacity: 0;
      transform: translate3d(0%, 0, 0);
    }


  }


</style>
