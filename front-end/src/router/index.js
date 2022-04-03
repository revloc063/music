import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SongView from '../views/SongView.vue'
import PlaylistView from '../views/PlaylistView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/song',
    name: 'song',
    component: SongView
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: PlaylistView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
