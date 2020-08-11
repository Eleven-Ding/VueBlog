import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from "../store";
const routes = [
  {
    meta: {index: 1},
    path: '',
    redirect: '/home'
  },
  {
    meta: {index: 1},
    name: 'home',
    path: '/home',
    component: () => import('../view/home/Home')
  },
  {
    meta: {index: 2},
    name: 'file',
    path: '/file',
    component: () => import('../view/file/File')
  },
  {
    meta: {index: 3},
    name: 'friend',
    path: '/friend',
    component: () => import('../view/friend/Friend')
  },
  {
    meta: {index: 4},
    name: 'comment',
    path: '/comment',
    component: () => import('../view/comment/Comment')
  },
  {
    meta: {index: 5},
    name: 'about',
    path: '/about',
    component: () => import('../view/about/About')
  },

  {
    name: 'ArticleDetail',
    path: '/home/article/:id',
    component: () => import('../view/articledetail/ArticleDetail'),

  }

]
const router = new VueRouter({
  routes,
  mode: 'history'
})

NProgress.inc(0.2);
NProgress.configure({
  ease:'ease',
  speed:500,
  showSpinner:false,
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
router.afterEach((to, from) => {

 if (to.name === 'ArticleDetail') {
    setTimeout(() => {
      document.getElementsByClassName('right-bar')[0].style.position = 'absolute'
    }, 500)
  }
  NProgress.done()
})
let path={
  'home':'首页( •͈ᴗ⁃͈)ᓂ- - -♡﻿',
  'friend':'友链( ˃̶̤́ ꒳ ˂̶̤̀ )',
  'comment':'留言板(*•̀ᴗ•́*)و ̑̑',
  'about':'关于我٩(눈౪눈)و ✧加油啊喂',
  'file':'归档_(:::з」∠)_嘤嘤嘤',
  'ArticleDetail':'文章详情 ٩(๑`н´๑)۶'
}
router.beforeEach((to, from, next) => {


  document.title=path[to.name]
  if(localStorage.getItem('username')){
    store.dispatch('changeUsername',localStorage.getItem('username'))
  }

  if (to.name === 'ArticleDetail' && from.name !== null) {
    document.getElementsByClassName('right-bar')[0].style.position = 'fixed'

  }
  NProgress.start()
  next()
})

export default router