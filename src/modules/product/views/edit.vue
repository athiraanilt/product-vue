<template>
    <div >
        <h1>Product Edit</h1>
        <label>Name </label><input v-model="name" name="name"><br><br>
        <div v-if="name_error != ''"> <span style="color:red;"  v-text="name_error"> {{ name_error }}</span></div><br>
        <label>Description  </label><input v-model="description" name="description"><br><br>
        <div v-if="description_error != ''"> <span style="color:red;"> {{ description_error }}</span></div><br>
        <label>Title  </label><input v-model="title" name="title"><br><br>
        <div v-if="title_error != ''"> <span style="color:red;"> {{ title_error }}</span></div><br>
        <label>Price  </label><input v-model="price" name="price"><br><br>
        <div v-if="price_error != ''"> <span style="color:red;"> {{ price_error }}</span></div><br>
        <input type="button" name="submit" value="submit" @click="submit">
    	<br>
    	<span style="color:red;"  v-text="success"> {{ success }}</span>
    </div>
</template>

<script>
import axios from 'axios'
import Router from 'vue-router'
import URL from '@/assets/js/constant.js'
export default {
    name: 'Edit',

    mounted: function () {

        this.getproduct()

    },

    data : function(){
        return {
            name: '',
            description: '',
            title: '',
            price: '',
            name_error:'',
            description_error:'',
            title_error:'',
            price_error:'',
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

            axios.post(URL+'/product/'+id+'/edit',  {
                name: app.name,
                description: app.description,
                title: app.title,
                price: app.price,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
            }
            })

            .then(function (response) {

                console.log(response)

                app.name_error = ''

                app.description_error = ''

                app.title_error = ''

                app.price_error = ''

                app.$router.push('/list')
    	    })

    		.catch(function (error) {
    		    console.log(error)

                console.log(error.response.data.errors)

    		    var obj = error.response.data.errors

        		if("name" in obj ){

                    app.name_error = obj['name'][0]

                } else {

                	app.name_error = ''

                }

                if("description" in obj ){

                	app.description_error  = obj['description'][0]

                }else {

                	app.description_error  = ''

                }

                if("title" in obj ){

                	app.title_error  = obj['title'][0]

                }else {

                	app.title_error  = ''

                }

                if("price" in obj ){

                	app.price_error  = obj['price'][0]

                }else {

                	app.price_error  = ''

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
