import Vue from 'vue'
import VueRouter from 'vue-router'
const discovery = ()=> import('views/discovery')
const latestMusic = ()=> import('views/latestMusic')
const latestMV = ()=> import('views/latestMV')
const recommendPlaylist = ()=> import('views/recommendPlaylist')
const playlistDetail = ()=> import('views/playlistDetail')

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    component: discovery
  },
  {
    path: '/discovery',
    name: 'discovery',
    component:discovery
  },
  {
    path: '/playlistDetail/:playListId',
    name: 'playlistDetail',
    component:playlistDetail
  },
  {
    path: '/recommendPlaylist',
    name: 'recommendPlaylist',
    component:recommendPlaylist
  },
  {
    path: '/latestMusic',
    name: 'latestMusic',
    component:latestMusic
  },
  {
    path: '/latestMV',
    name: 'latestMV',
    component:latestMV
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
