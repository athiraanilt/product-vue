<template>
  <div>
	<span style="color:red;"  v-text="success"> {{ success }}</span>
  </div>
</template>


<script>
import axios from 'axios'
import Vue from 'vue'
import Router from 'vue-router'
import URL from '@/assets/js/constant.js'
export default {
    name: 'cart-list-row',

    mounted: function () {

        this.getproducts()

    },

    data: function () {
        return {
		    success:'',
		    seen: false
        }

    },

    methods: {

        getproducts: function () {

            var self = this

           	var id = this.$route.params.id

            axios.post(URL+'/removeproduct', {id : id},{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            })

            .then(function (response) {

                self.$router.push('/showcart')

            })

            .catch(function (error) {

                console.log(error)

            })

        }

    }

}
</script>
