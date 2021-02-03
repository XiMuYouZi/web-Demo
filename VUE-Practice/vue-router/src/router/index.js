import Vue from 'vue'
import Router from 'vue-router'
const Home = ()=> import('../components/Home')
const About = ()=> import('../components/About')
const User = ()=> import('../components/User')
const HomeNews = ()=> import('../components/HomeNews')
const HomeMsg = ()=> import('../components/HomeMsg')
const Profile = ()=> import('../components/Profile')


Vue.use(Router)

const routes = [
  {
    path:"/",
    redirect:"/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 路由嵌套
    children:[
      // {
      //   path:"/",
      //   redirect:"news"
      // },
      {
        path:"news",
        component: HomeNews,
        name: 'news',

      },
      {
        path:"msg",
        component: HomeMsg,
        name: 'message',
        //路由独享守卫
        beforeEnter: (to, from, next) => {
          console.log(to);
          next()
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    //meta可以传递数据
    meta:{
      age:18,
      address:"三胡同"
    },

  },
  {
    path: '/user/:userid',
    name: 'user',
    component: User,
 
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,

  },

]


const router =  new Router({
  routes,
  // 默认是hash模式
  mode:"history"
})
export default router

// 全局守卫：路由跳转之前的hook
router.beforeEach((to, from, next) => {
  document.title = to.name
  // 不调用next函数就无法跳转，可以用来根据条件决定是否跳转，或者重定向到某个路径
  if (to.name === "About"){
    next("/home/msg")
  }else{
    next()
  }
})

router.afterEach((to, from) => {
    // console.log(to,from);
})


