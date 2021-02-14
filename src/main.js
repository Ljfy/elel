import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import css from "./assets/css/comm.css";
import font from "./assets/fonts/iconfont.css";
import ElementUI from "element-ui";
//导入弹窗提示组件
import { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";

// import {button Message} from 'element-ui' 按需导入
// import { from } from "core-js/fn/array";
//全局挂载
Vue.prototype.$message = Message;
//配置请求的根路径
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
