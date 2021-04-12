<template>
  <div class="shopCart">
    <headerWeb />
     <b-container>
      <h3 class="no-items" v-if="orders.length === 0">Your cart is empty</h3>
        <b-card v-if="orders" v-for="(data, idx) in orders" :key="idx">
          <b-row>
            <b-col md="4">
              <b-card-img id="product-image" :src="data.picture" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="8">
               <b-card-body>
                 <b-card-text>
                   <div class="float-left">
                     <h5>{{data.product}}</h5>
                     <h5>{{data.quantity}} X Rp. {{data.price}}</h5>
                     <h5 class="mt-4">Subtotal: Rp. {{data.subTotal}}</h5>
                    </div>
                  </b-card-text>
               </b-card-body>
              <b-button @click="deleteOrder(idx)" class="float-right mt-5 mr-3" variant="danger" >Delete</b-button>
           </b-col>
         </b-row>
        </b-card>
        <h5 v-if="orders.length" class="float-left mt-5">Grand Total: Rp. {{grandTotal}} </h5>
        <router-link to="/checkout">
          <b-button v-if="orders.length" class="float-right mt-5" variant="primary" >Checkout</b-button>
        </router-link>
     </b-container>
  </div>
</template>

<script>
import headerWeb from '@/components/headerWeb'
import regex from '../utils/regex'
import grandTotal from '../utils/grandTotal'
import toInteger from '../utils/toInteger'

export default {
  name: 'shopCart',
  components: {
    headerWeb
  },
  data () {
    return {
      orders: null,
      value: 0
    }
  },
  created () {
    let localData = this.$store.state.order
    let total = []

    for (let i = 0; i < localData.length; i++) {
      let priceRegex = regex(localData[i].subTotal)
      total.push(localData[i].subTotal)

      // change int to regexed subTotal
      localData[i].subTotal = priceRegex
    }

    this.grand = total
    this.orders = localData
  },
  methods: {
    deleteOrder (index) {
      let orderData = this.orders

      orderData.splice(index, 1)
      const parse = JSON.stringify(orderData)

      localStorage.setItem('order', parse)
    }
  },
  computed: {
    grandTotal () {
      let orderData = this.orders
      let arrSubtotal = []

      for (let i = 0; i < orderData.length; i++) {
        let subTotalInt = toInteger(orderData[i].subTotal)
        arrSubtotal.push(subTotalInt)
      }

      let sumTotal = regex(grandTotal(arrSubtotal, 'sum'))
      return sumTotal
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

.no-items {
  margin-top: 200px;
}

#brand {
  font-family: 'Krona One', sans-serif;

}
#router {
  font-size: 20px;
  margin-bottom: 0;
  color: white;
}

#product-image {
  width: 150px;
  height: 150px;
}
</style>
