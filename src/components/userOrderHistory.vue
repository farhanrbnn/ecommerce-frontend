<template>
	<div id="orderHistory">
		<headerWeb />	
		<b-container class="mt-5">
      <h3 class="mb-5">Order History</h3>
      <b-img v-if="orderData.length === 0" id="img" v-bind:src="require('@/assets/order_history.svg')"></b-img>
			<h3 class="no-items mt-5" v-if="orderData.length === 0">You're not order anything yet</h3>
			<b-card v-if="orderData" v-for="(data, idx) in orderData" :key="idx">
				<b-row v-if="data.item.length === 1" v-for="(item, idx) in data.item" :key="idx">
					<b-col md="4">
						<b-card-img id="product-image" :src="item.picture" alt="Image" class="rounded-0"  style="max-width: 10rem; height: auto;"></b-card-img>
					</b-col>
					<b-col md="8">
            <p class="text-left">order ID: {{data._id}}</p>
            <h5>{{item.name}}</h5>
            <b-row class="mt-5">
              <p>Rp. {{data.total}}</p>
            </b-row>
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
			orderData: ''
		}
	},
	created() {
		const jwt  = this.$cookies.get('jwt')
		const id = JSON.parse(atob(jwt.split('.')[1]))
		const url = '/user/order-history/'+id.id

		DataService.get(url)
		.then((res) => {
			this.orderData = res.data.data
		})
		.catch((err) => {
			console.log(err)
		})
	}
}
	
</script>

<style scoped>
#img {
  margin-top: 20px;
  width: 500px;
}

	
</style>