import Vue from 'vue'
import Router from 'vue-router'

const Home = ()=> import('../Views/Home')
const Category = ()=> import('../Views/Category')
const Cart = ()=> import('../Views/Cart')
const Profile = ()=> import('../Views/Profile')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/home"
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/home',
      component: Home
    },

  ]
})
