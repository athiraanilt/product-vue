export default[
    {
      path: '/',
      name: 'login',
      component: () => import('@/modules/product/views/login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/modules/product/views/Dashboard.vue')
    },{
      path: '/list',
      name: 'list',
      component: () => import('@/modules/product/views/list.vue')
  }, {

	  path: '/edit/:id',
		name: 'edit',
		component: () => import('@/modules/product/views/edit.vue')
  }, {

	  path: '/delete',
		name: 'delete',
		component: () => import('@/modules/product/views/delete.vue')
  }

]
