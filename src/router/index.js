import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/welcome.vue";
import users from "../components/user/user.vue";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },

    {
      path: "/Login",
      component: () => import("../components/Login.vue")
    },
    {
      path: "/home",
      component: Home,
      redirect: "/welcome",
     
      children: [
        {
          path: "/welcome",
          component: Welcome
        },
        {
          path: "/users",
          component:users
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  //from 代表从哪个窗口跳转
  // next 是一个函数 next() 方形 next('./login) 强制跳转
  if (to.path === "/login") return next();
  const tokenstr = window.sessionStorage.getItem("token");
  if (!tokenstr) return next("/login");
  next();
});
export default router;
