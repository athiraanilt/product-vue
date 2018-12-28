<template>
    <div class="cart-list-row">
    <h2>Cart list</h2>
    <table id='products'>
        <tr>
    	    <th>Serial no</th>
    	    <th>Name</th>
    	    <th>Title </th>
    	    <th>Description </th>
    	    <th>Price</th>
    	    <th>Quantity</th>
    	    <th>Date</th>
    	    <th>Remove product</th>
        </tr>
        <tr v-for="(product,index) in products" :key="product.id" >
            <td>{{ index+1 }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
        	<td>{{ product.quantity }}</td>
        	<td>{{ product.date }}</td>
    		<td><router-link :to="{ name: 'removeproduct', params: { id: product.id }}">Remove</router-link></td>
        </tr>
	</table>
    <center><pagination :pagination="pagination" :callback="getproducts" :options="paginationOptions"></pagination></center>
    <br><br>
	<button><router-link :to="{ name: 'emptycart'}">Emptycart</router-link></button>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Router from 'vue-router'
import URL from '@/assets/js/constant.js'
import pagination from 'vue-bootstrap-pagination'
export default {

    name: 'cart-list-row',

    mounted: function () {

        this.getproducts()

    },

    data: function () {
        return {
            message: 'cart List Row',
            products: [],
            pagination: {
                per_page: 12,    // required
                current_page: 1, // required
                last_page: 0,    // required
                serial:1

            },
            paginationOptions: {
                offset: 4,
                previousText: 'Prev',
                nextText: 'Next',
                alwaysShowPrevNext: true
            },
        }

    },

    components: {

        pagination

    },

    methods: {

        getproducts: function () {

            var self = this

            axios.get(URL+'/showcart?page='+ self.pagination.current_page, {
	            headers: {
	                'Authorization': 'Bearer ' +localStorage.getItem('token'),
	                'Content-Type': 'application/json'
	            }
	        })

	        .then(function (response) {

                self.products = response.data.data.Cart

                self.pagination.per_page = response.data.data.pagination.perPage

                self.pagination.current_page = response.data.data.pagination.currentPage

                self.pagination.last_page = response.data.data.pagination.lastPage

                self.pagination.serial= (self.pagination.current_page-1) *self.pagination.per_page

            })

            .catch(function (error) {

                console.log(error)

            })

        }

    }

}
</script>

<style scoped>

table {
  border-collapse: collapse;
  margin-left: 300px;
}

#products {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
}

#products td, #customers th {
  border: 1px solid #ddd;
  padding: 18px;
}

#products tr:nth-child(even){background-color: #f2f2f2;}

#products tr:hover {background-color: #ddd;}

#products th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #3346FF;
  color: white;
}
</style>
