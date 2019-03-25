import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './container/Home.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName : "register" */ './container/RegisterForm.vue')

    },
    {
      path: '/product',
      name: 'product',
      component: () => import(/* webpackChunkName : "product" */ './container/ProductShowcase.vue'),
      children: [{
        path: '',
        name: 'list',
        component: () => import(/* webpackChunkName : "product home" */ './components/listProducts.vue')
      },
      {
        path: ':id',
        name : 'product-detail',
        component : () => import(/* webpackChunkName : "product home" */ './components/ProductDetail.vue')
      },
     ]
    },
    {
      path: '/cart',
      name : 'cart-detail',
      component : () => import(/* webpackChunkName : "product cart detail" */ './components/DetailCart.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName : "register" */ './container/AdminDashboard.vue'),
      children: [{
        path: '',
        name: '',
        component: () => import(/* webpackChunkName : "register" */ './components/listProducts.vue')
      },
      {
        path: 'create',
        name: 'product-form',
        component: () => import(/* webpackChunkName : "register" */  './components/ProductForm.vue')
      },
      {
        path : 'edit/:id',
        name : 'edit-product',
        component : () => import(/* webpackChunkName : "edit-product" */ './components/ProductForm.vue' )
      },
      {
        path : 'transaction',
        name : 'transaction',
        component : () => import(/* webpackChunkName : "transaction" */ './components/TransactionDetail.vue')
        
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './container/About.vue')
    }
  ]
})
