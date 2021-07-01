<template>
  <div class="shopCart">
    <headerWeb />  
    <b-overlay :show="show" :opacity="opacity" rounded="sm">
     <b-container class="mt-5">
      <b-img id="img" v-if="showImg" v-bind:src="require('@/assets/cart.svg')"></b-img>
      <h3 class="no-items" v-if="orders.length === 0">Your cart is empty</h3>
        <b-card v-if="orders" v-for="(data, idx) in orders" :key="idx">
          <b-row>
            <b-col md="4">
              <b-card-img id="product-image" :src="data.item.picture" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="8">
               <b-card-body>
                 <b-card-text>
                   <div class="float-left">
                     <h5>{{data.item.name}}</h5>
                     <h5>{{data.quantity}} X Rp. {{data.item.price}}</h5>
                     <h5 class="mt-4">Subtotal: Rp. {{data.subtotal}}</h5>
                    </div>
                  </b-card-text>
               </b-card-body>
              <b-button @click="deleteCart(data._id)" class="float-right mt-5 mr-3" variant="danger" >Delete</b-button>
           </b-col>
         </b-row>
        </b-card>
        <h5 v-if="orders.length" class="float-left mt-5">Grand Total: Rp. {{grandTotal}} </h5>
        <router-link to="/checkout">
          <b-button v-if="orders.length" class="float-right mt-5" variant="primary" >Checkout</b-button>
        </router-link>
     </b-container>
      </b-overlay>
  </div>
</template>

<script>
/* eslint-disable */

import headerWeb from '@/components/headerWeb'
import regex from '../utils/regex'
import grandTotal from '../utils/grandTotal'
import toInteger from '../utils/toInteger'
import DataService from '../urlApp/user'

export default {
  name: 'shopCart',
  components: {
    headerWeb
  },
  data () {
    return {
      orders: [],
      jwt: null,
      showImg: null,
      show: true,
      value: 0
    }
  },
  created () {   
    let localData = this.$store.state.order
    let total = []

    DataService.get('user/cart/' + this.jwtDecode)
    .then((res) => {
      this.show = false
      const data = res.data.data

      for(let i = 0; i < data.length; i++){
        const priceRegex = regex(data[i].item.price)
        const subRegex  = regex(data[i].subtotal)

        data[i].item.price = priceRegex
        data[i].subtotal = subRegex
        this.orders = data
      }

      if (this.orders.length > 0) {
        this.showImg = false      
      }

      if (this.orders.length === 0) {
        this.showImg = true
      }

      console.log(this.orders)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  methods: {
    async deleteCart(id){
      const userId = {
        id: await this.jwtDecode,
        cartId: id
      }

      await DataService.post('user/cart/update', userId)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

      await DataService.get('user/cart/' + this.jwtDecode)
      .then((res) => {
        this.show = false
        const data = res.data.data

        for(let i = 0; i < data.length; i++){
          const priceRegex = regex(data[i].item.price)
          const subRegex  = regex(data[i].subtotal)

          data[i].item.price = priceRegex
          data[i].subtotal = subRegex
          this.orders = data

          if (this.orders.length > 0) {
            this.showImg = false      
          }

          if (this.orders.length === 0) {
            this.showImg = true
          }

          console.log(this.orders)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    }
  },
  computed: {
    grandTotal () {
      let orderData = this.orders
      let arrSubtotal = []

      for (let i = 0; i < orderData.length; i++) {
        let subTotalInt = toInteger(orderData[i].subtotal)
        arrSubtotal.push(subTotalInt)
      }

      let sumTotal = regex(grandTotal(arrSubtotal, 'sum'))
      return sumTotal
    },
     jwtDecode () {
      const jwt = this.$cookies.get('jwt')

      const decodedJwt = JSON.parse(atob(jwt.split('.')[1]))

      return decodedJwt.id
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

.no-items {
  margin-top: 100px;
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

#img {
  margin-top: 20px;
  width: 500px;
}

</style>
