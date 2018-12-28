<template>
    <div class="hello">
        <h1><center>Product create</center></h1>
        <label>Name </label><input v-model="name" name="name"><br><br>
        <div v-if="name_error != ''"> <span style="color:red;"  v-text="name_error"> {{ name_error }}</span></div><br>
        <label>Description</label> <input v-model="description" name="description"><br><br>
        <div v-if="description_error != ''"> <span style="color:red;"> {{ description_error }}</span></div><br>
        <label>Title</label> <input v-model="title" name="title"><br><br>
        <div v-if="title_error != ''"> <span style="color:red;"> {{ title_error }}</span></div><br>
        <label>Price</label> <input v-model="price" name="price"><br><br>
        <div v-if="price_error != ''"> <span style="color:red;"> {{ price_error }}</span></div><br>
        <input type="button" name="submit" :disabled='seen' value="submit" @click="submit"> &nbsp; &nbsp;
        <input type="button" name="logout" value="logout" @click="logout"> &nbsp; &nbsp;
        <input type="button" name="list" value="list" @click="list"> &nbsp; &nbsp;
        <input type="button" name="showcart" value="showcart" @click="showcart">
    </div>
</template>

<script>
import axios from 'axios'
import Router from 'vue-router'
import URL from '@/assets/js/constant.js'
export default {

    name: 'Dashboard',

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

        logout: function () {

            var app = this

            localStorage.clear();

            app.$router.push('/')

        },

        list: function () {

            var app = this

            app.$router.push('/list')

        },

        showcart: function () {

            var app = this

            app.$router.push('/showcart')

        },

        submit: function () {

            var app = this

            app.seen = true

            axios.post(URL+'/product/create',  {
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

                app.seen = false

                console.log(response)

                app.name_error = ''

                app.description_error = ''

                app.title_error = ''

                app.price_error = ''

                app.$router.push('/list')

            })

            .catch(function (error) {

                app.seen = false

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

                } else {

                    app.description_error  = ''

                }

                if("title" in obj ){

                    app.title_error  = obj['title'][0]

                } else {

                    app.title_error  = ''

                }

                if("price" in obj ){

                    app.price_error  = obj['price'][0]

                } else {

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
    padding-right:18px;
    display:inline-block;
    min-width:100px;
}
</style>
