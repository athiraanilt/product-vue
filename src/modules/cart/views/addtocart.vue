<template>
    <div>
        <h1>Add to cart</h1>
        <label>Name </label><input v-model="name" name="name" disabled><br><br>
        <label>Description </label> <input v-model="description" name="description" disabled><br><br>
        <label>Title </label> <input v-model="title" name="title" disabled><br><br>
        <label>Price  </label><input v-model="price" name="price" disabled><br><br>
	    <label>Quantity </label> <input v-model="quantity" name="quantity"><br><br>
	    <div v-if="quantity_error != ''"> <span style="color:red;"> {{ quantity_error }}</span></div><br>
        <input type="button" name="submit" value="submit"  @click="submit" >
	    <br>
	    <span style="color:red;"  v-text="success"> {{ success }}</span>
    </div>
</template>

<script>
import axios from 'axios'
import Router from 'vue-router'
import URL from '@/assets/js/constant.js'
export default {
    name: 'addtocart',

    mounted: function () {
	    this.getproduct()
    },

    data: function () {

        return {
	        message: 'product ',
	        product: [],
	        name: '',
	        p_name:'',
	        description: '',
	        title: '',
	        price: '',
	        name_error:'',
	        description_error:'',
	        title_error:'',
	        price_error:'',
	        quantity_error:'',
	        quantity:'',
	        success:'',
	        seen: false
		}

    },

    methods: {

        getproduct: function () {

            var self = this

            var id = this.$route.params.id

            axios.get(URL+'/product/'+id, {
			    headers: {
			         'Authorization': 'Bearer ' +localStorage.getItem('token'),
			         'Content-Type': 'application/json'
			    }
		      })

            .then(function (response) {

                    self.products = response.data.data.products

                    self.name =  response.data.data.products['name']

                    self.description =  response.data.data.products['description']

                    self.title =  response.data.data.products['title']

                    self.price =  response.data.data.products['price']

            })

            .catch(function (error) {

                    console.log(error)

            })
	    },

        submit: function () {

            var id = this.$route.params.id

            console.log(id)

            var app = this

            axios.post('http://127.0.0.1:8082/addtocart/'+id,  {
                quantity: app.quantity,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            })

            .then(function (response) {
   		        console.log(response)
		        app.$router.push('/showcart')
                app.quantity_error = ''
	        })

            .catch(function (error) {
    	        // console.log(error)

                console.log(error.response.data.errors)

                var obj = error.response.data.errors

                if("quantity" in obj ){

                	app.quantity_error = obj['quantity'][0]

                } else {

                	app.quantity_error = ''

                }

            })
        }
    }

}


</script>

<style scoped>
label {
    text-align:right;
    padding-right:20px;
    display:inline-block;
    min-width:150px;
}
</style>
