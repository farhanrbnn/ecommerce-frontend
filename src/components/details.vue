<template>
  <div id="details">
    <headerWeb />
    <b-container  id="content" >
      <b-row v-if="datas" class="justify-content-md-center">
        <b-col cols="12">
          <b-card>
            <b-row>
              <b-col cols="6">
                <img id="product-image" :src="datas.picture">
              </b-col>
              <b-col cols="6">
                <h3>{{datas.name}}</h3>
                <b-row>
                   <h4 id="label" class="mr-3">price</h4>
                   <h4>Rp.{{datas.price}}</h4>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-button class="mt-3" @click="addToCart" variant="primary" >Add to Cart</b-button>
                <b-button class="mt-3" @click="buyNow"  variant="primary">Buy Now</b-button>       
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row style="margin-top: 100px;">
        <b-col cols=12>
          <h3>Related Products</h3>
        </b-col>
      </b-row>
      <b-row  class="d-flex justify-content-lg-center">
        <b-col v-for="(arr, index) in itemByCat" :key="index" v-if="itemByCat.length <= 4" cols="3">
          <b-card :img-src="arr.picture" :title="arr.name">
            <b-card-text>
              Rp. {{arr.price}}
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
     </b-container>
   </div>
</template>
<script>
import headerWeb from '@/components/headerWeb'
import DataService from '../urlApp/user'
import regex from '../utils/regex'
import toInteger from '../utils/toInteger'
import orderUpdate from '../utils/orderUpdate'

export default {
  name: 'details',
  props: ['userId'],
  components: {
    headerWeb
  },
  data () {
    return {
      datas: null,
      url: '/items/' + this.userId,
      relatedUrl: 'items/related/' + this.userId,
      value: 1,
      category: null,
      itemByCat: null,
      jwt: null,
      hide: true
    }
  },
  async created () {
    this.jwt = this.$cookies.get('jwt')
    await DataService.get(this.url)
      .then((res) => {
        let apiData = res.data.data
        apiData.price = regex(apiData.price)

        this.datas = apiData
        this.category = apiData.category
      })
      .catch((err) => {
        alert('error when fetching API' + err)
      })

    await DataService.get(this.relatedUrl)
      .then((res) => {
        const apiData = res.data.data

        for (let i = 0; i < apiData.length; i++) {
          const priceRegex = regex(apiData[i].price)
          apiData[i].price = priceRegex
        }

        this.itemByCat = apiData
      })
      .catch((err) => {
        alert('error when fetching API' + err)
      })
  },

  methods: {
    buyNow () {
      let priceInt = toInteger(this.datas.price)
      let total = this.value * priceInt

      let order = {
        picture: this.datas.picture,
        product: this.datas.name,
        price: this.datas.price,
        id: this.userId,
        quantity: this.value,
        subTotal: total
      }

      let orderData = JSON.parse(localStorage.getItem('order'))

      if (this.jwt) {
        if (orderData) {
          orderUpdate(order, orderData)

          const parse = JSON.stringify(orderData)
          localStorage.setItem('order', parse)
        }
        this.$store.commit('addOrder', order)
        this.$router.push('/cart')
      } else {
        this.$router.push('/login')
      }
    },
    addToCart () {
      let priceInt = toInteger(this.datas.price)
      let total = this.value * priceInt

      let order = {
        picture: this.datas.picture,
        product: this.datas.name,
        price: this.datas.price,
        id: this.userId,
        quantity: this.value,
        subTotal: total
      }

      let test = JSON.parse(localStorage.getItem('order'))

      if (test && this.jwt) {
        orderUpdate(order, test)
        const parse = JSON.stringify(test)
        localStorage.setItem('order', parse)

        try {
          this.$store.commit('addOrder', order)

          this.$notify({
            group: 'cart',
            text: 'Success add item to cart',
            type: 'success'
          })
        } catch (err) {
          this.$notify({
            group: 'cart',
            text: 'Failed add item to cart',
            type: 'warn'
          })
        }
      } else {
        this.$router.push('/login')
      }
    },
    authLogout () {
      this.$cookies.remove('jwt')
      this.$router.push('/login')
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

#description {
  text-align: justify;
}

#router {
  font-size: 20px;
  margin-bottom: 0;
  color: white;
}

#brand {
  font-family: 'Krona One', sans-serif;

}

#product-image {
  width: 300px;
  height: 300px;
}

#content {
  margin-top: 100px;

}

#label {
  color: #bbbfca;
}
</style>
