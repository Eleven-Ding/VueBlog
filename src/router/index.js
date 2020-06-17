import VueRouter from  'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

const routes=[
  {
    meta:{index:1},
    path:'',
    redirect:'/home'
  },
  {
    meta:{index:1},
    name:'home',
    path:'/home',
    component :()=>import('../view/home/Home')
  },
  {
    meta:{index:2},
    name:'file',
    path:'/file',
    component:()=>import('../view/file/File')
  },
  {
    meta:{index:3},
    name:'friend',
    path:'/friend',
    component:()=>import('../view/friend/Friend')
  },
  {
    meta:{index:4},
    name:'comment',
    path:'/comment',
    component:()=>import('../view/comment/Comment')
  },
  {
    meta:{index:5},
    name:'about',
    path:'/about',
    component:()=>import('../view/about/About')
  },

  {
    name:'ArticleDetail',
    path:'/home/article/:id',
    component:()=>import('../view/articledetail/ArticleDetail')
  }

]
const router=new VueRouter({
  routes,
  mode:'history'
})

export default  router