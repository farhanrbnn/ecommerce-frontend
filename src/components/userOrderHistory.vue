<template>
	<div id="orderHistory">
		<headerWeb />	
		<b-container class="mt-5">
			<h3 class="no-items" v-if="orderData.length === 0">You're not order anything yet</h3>
			<b-card v-if="orderData" v-for="(data, idx) in orderData" :key="idx">
        <b-row>
        	<b-col md="4">
            <b-card-img id="product-image" :src="data" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
        </b-row>
			</b-card>			
		</b-container>
	</div>
</template>

<script>
import headerWeb from '@/components/headerWeb'
import DataService from '../urlApp/user'


export default {
	name: 'orderHistory',
	components: {
		headerWeb
	},
	data () {
		return {
			orderData: []
		}
	},
	created() {
		const jwt  = this.$cookies.get('jwt')
		const id = JSON.parse(atob(jwt.split('.')[1]))
		const url = '/user/order-history/'+id.id

		DataService.get(url)
		.then((res) => {
			this.orderData.push(res.data.data.item)
			console.log(res.data.data.item)
		})
		.catch((err) => {
			console.log(err)
		})
	}
}
	
</script>

<style scoped>
	
</style>