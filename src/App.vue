<template>
  <div id="app">
    <login></login>
    <tab-bar></tab-bar>
    <right-bar></right-bar>
    <div class="mains">
      <keep-alive>
        <transition :name="transitionName">
          <router-view class="router-view"></router-view>
        </transition>
      </keep-alive>
    </div>
    <!--底部组件-->
    <bottom-bar></bottom-bar>
    <back-top></back-top>
    <!--    <el-backtop target="window" visibility-height="200"></el-backtop>-->
    <!--看板娘-->
    <!--    <live2d></live2d>-->
    <!--    <vue-canvas-nest :config="{color:'255,0,0', count: 88}" :el="'#area'"></vue-canvas-nest>-->
    <vue-canvas-nest :config="{color:'255,0,0', count:150}" :opacity="0.9" ></vue-canvas-nest>
  </div>
</template>

<script>
  // import live2d from 'vue-live2d'
  import 'vue-live2d/dist/vue-live2d.css'
  import TabBar from "./components/tabbar/TabBar";
  import RightBar from "./components/rightbar/RightBar";
  import BottomBar from "./components/bottombar/BottomBar";
  import Login from "./components/login/Login";
  import BackTop from "./components/backtop/BackTop";
  import vueCanvasNest from 'vue-canvas-nest'

  export default {
    name: 'App',
    components: {
      TabBar,
      RightBar,
      BottomBar,
      Login,
      BackTop,
      vueCanvasNest//,
      // live2d
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
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    background: #f5f8f9;
  }

  .mains {
    /*高度不应该写死或者计算*/
    min-height: calc(100vh - 40px);

  }

  .router-view {
    margin-top: 140px;
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
      margin-top: 50px;
      margin-left: 0;
    }
  }

</style>
