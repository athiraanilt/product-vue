<template>
  <div >
	<span style="color:red;"  v-text="success"> {{ success }}</span>
  </div>
</template>

<script>
import axios from 'axios'
import Router from 'vue-router'
import URL from '@/assets/js/constant.js'
export default {

    name: 'Delete',

    mounted: function () {

        this.delete()

    },

    data : function(){
        return {
            success: '',
            description: '',
        }
    },

    methods: {

	    delete: function () {

            var id = this.$route.params.id

            console.log(id)

            var app = this

            axios.post(URL+'/product/'+id+'/delete', {id : id}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }

            })

            .then(function (response) {

                console.log('delete')

                app.$router.push('/list')

            })

            .catch(function (error) {

                console.log(error)

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
