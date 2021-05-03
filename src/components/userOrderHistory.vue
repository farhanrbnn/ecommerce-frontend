<template>
	<div id="orderHistory">
		<headerWeb />	
		<b-container class="mt-5">
			<h3 class="no-items" v-if="orderData.length === 0">You're not order anything yet</h3>
			<b-card v-if="orderData" v-for="(data, idx) in orderData" :key="idx">
        <b-row>
        	<b-col md="4">
            <b-card-img id="product-image" :src="data.picture" alt="Image" class="rounded-0"  style="max-width: 10rem; height: auto;"></b-card-img>
          </b-col>
          <b-col md="8">
          	<b-card-body>
            	<b-card-text>
             		<div class="float-left">
                	<h5>{{data.name}}</h5>
                    <!-- <h5>{{data.quantity}} X Rp. {{data.price}}</h5> -->
                    <!-- <h5 class="mt-4">Subtotal: Rp. {{data.subTotal}}</h5> -->
                </div>
              </b-card-text>
            </b-card-body>
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
			// this.orderData.push(res.data.data.item)
			this.orderData = res.data.data.item
			console.log(this.orderData)
		})
		.catch((err) => {
			console.log(err)
		})
	}
}
	
</script>

<style scoped>
	
</style>