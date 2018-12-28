<template>
  <div class="hello">
    <h1>login</h1>
    Username <input v-model="username" name="Username"><br><br>
    Password <input v-model="password" type="password" name="Password"><br><br>
    <input type="button"  name="submit" value="submit" @click="login_check">
    <br><br>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/modules/product/views/Dashboard'
import URL from '@/assets/js/constant.js'
Vue.use(Router)
Vue.use(Dashboard)
export default {

    name: 'login',

    data () {
        return {
          username: '',
          password: '',
          message: ' ',
          seen: false
        }
    },

    mounted: function () {

        this.checkuser()

    },

    methods: {

        checkuser:function(){

            if(localStorage.getItem('token')){

                var app = this

                console.log('already logged')

                app.$router.push('/dashboard')

            }

        },

        login_check: function () {

            var app = this

            axios.post(URL+'/oauth/token', {
                grant_type: 'password',
                client_id: 2,
                client_secret: 'w7UcPPIzb4HkaGOfutp5q9nZf9b6UdmunMpQQzL9',
                username: app.username,
                password: app.password,
                scope: '*'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            .then(function (response) {

                if (response.status === 200) {

                    app.message = 'Successfully logged in'

                    app.seen = true

                    var route = response.data.route_list

                    var routes = JSON.stringify(route)

                    localStorage.setItem('route_list', routes)

                    app.$router.push('/dashboard')

                }

                var accessToken = response.data.access_token

                localStorage.setItem('token', accessToken)// console.log(access_token);

            })

            .catch(function (error) {

                console.log(app.username)

                console.log(error)

            })

        }

    }

}
</script>

<style scoped>
</style>
