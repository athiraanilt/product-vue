export default[
{

	  path: '/addtocart/:id',
		name: 'addtocart',
		component: () => import('@/modules/cart/views/addtocart.vue')
  } ,
  {

  	path: '/showcart',
  	  name: 'showcart',
  	  component: () => import('@/modules/cart/views/showcart.vue')
  } , {

   	path: '/removeproduct',
   	  name: 'removeproduct',
   	  component: () => import('@/modules/cart/views/removeproduct.vue')
   } ,{

    	path: '/emptycart',
    	  name: 'emptycart',
    	  component: () => import('@/modules/cart/views/emptycart.vue')
    } ,

]
