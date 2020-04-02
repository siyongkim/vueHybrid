import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Menus from '../views/Menus.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Menus',
    name: 'Menus',
    component: Menus
  },
  {
    path: '/BusinessPartners',
    name: 'BusinessPartners',
    component: () => import(/* webpackChunkName: "about" */ '../views/BusinessPartners.vue')
  },
  {
    path: '/BusinessPartners/:CardCode',
    name: 'Details',
    component: () => import(/* webpackChunkName: "about" */ '../views/BusinessPartnersDetail.vue')
  },
  {
    path: '/DeliveryNoteCreate',
    name: 'DeliveryNoteCreate',
    component: () => import(/* webpackChunkName: "about" */ '../views/DeliveryNoteCreate.vue')
  }
  // {
  //   path: '/Login',
  //   name: 'Login',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router