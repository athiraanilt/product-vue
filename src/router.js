import Vue from 'vue'
import Router from 'vue-router'
//import Home from './views/Home.vue'
import product from '@/modules/product/router'
import cart from '@/modules/cart/router'

Vue.use(Router)
var allRoutes = [];
allRoutes = allRoutes.concat(product).concat(cart)
const routes = allRoutes
export default new Router({ routes })
