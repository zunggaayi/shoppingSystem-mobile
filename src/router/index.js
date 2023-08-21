import Vue from 'vue'
import VueRouter from 'vue-router'
// 如果文件夹存在index.vue，那么就不需要写到index.vue，写到上级文件夹就可以了

import Layout from '@/views/layout'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'

import store from '@/store'

// 异步改造，异步加载路由，提高性能
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list.vue')
const MyOrder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const Address = () => import('@/views/address')
const ProDetail = () => import('@/views/prodetail')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      // 二级路由
      children: [
        {
          path: '/home',
          component: Home
        },
        {
          path: '/cart',
          component: Cart
        },
        {
          path: '/user',
          component: User
        },
        {
          path: '/category',
          component: Category
        }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    { path: '/address', component: Address },

    // 动态传参，需要知道点开的是哪个商品
    { path: '/prodetail/:id', component: ProDetail }
  ]
})
// 所有路由被访问前，都会被全局前置路由守卫拦截，只有被放行才会真正到达
// 定义一个数组，用于存储所有需要权限的页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // to:到哪去，完整的路由信息对象
  // from从哪来，完整的路由信息对象
  // next拦截到的去向，路由地址
  // console.log(to, from, next)
  if (!authUrls.includes(to.path)) {
    // 非权限直接走
    next()
    return
  }
  // 权限页面
  const token = store.getters.getToken
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
