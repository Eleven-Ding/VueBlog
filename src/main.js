import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import './assets/css/iconfont.css'
import router from "./router";
import store from "./store";
/*点击红心效果*/
import heart from "./myscript/clickHeart";
/*highlight*/
Vue.use(heart)
import Highlight from "./high";
Vue.use(Highlight);
Vue.config.productionTip = false
Vue.use(ElementUi)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
