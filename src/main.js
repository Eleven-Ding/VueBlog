import App from "./App";
import {
  Pagination,
  Timeline,
  TimelineItem,
  Input,
  Button,
  Message,
  Tooltip,
  Divider,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Loading,
} from 'element-ui';

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Autocomplete);
Vue.use(Pagination);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Divider);
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading
import {request} from "./network/request";
Vue.prototype.request=request
import './assets/css/iconfont.css'
import "./components/player/iconfont.css"
import router from "./router";
import store from "./store";
/*点击红心效果*/

import VueLazyload from "vue-lazyload";

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('./assets/img/loading.gif')/*占位图片*/
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
